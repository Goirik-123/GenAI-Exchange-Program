
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { documentSummarization } from '@/ai/flows/document-summarization';
import { riskAssessment } from '@/ai/flows/risk-assessment';
import { relatedLawSuggestions } from '@/ai/flows/related-law-suggestions';
import { generateNegotiationPoints } from '@/ai/flows/negotiation-toolkit';
import { aiFormFill, type AiFormFillOutput } from '@/ai/flows/ai-form-fill';
import { extractTextFromImage } from '@/ai/flows/extract-text-from-image';
import { legalChatbot, type LegalChatbotInput } from '@/ai/flows/legal-chatbot';
import { similarCases } from '@/ai/flows/similar-cases';
import type { SimilarCasesInput } from '@/ai/schemas/similar-cases';
import { readDocuments, writeDocuments } from './storage';
import type { DocumentType, FormSegment } from './types';
import { mockDocuments } from './mock-data';

const fileUploadSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long."),
    files: z.array(z.instanceof(File))
        .min(1, "At least one file is required.")
        .max(10, "You can upload a maximum of 10 images.")
        .refine(files => files.every(file => file.size > 0), "Files are required.")
        .refine(files => files.every(file => file.type.startsWith('image/')), "All files must be images.")
});


export async function handleFileUpload(prevState: any, formData: FormData) {
    const rawFormData = {
        title: formData.get('title'),
        files: formData.getAll('files'),
    }
    
    const validation = fileUploadSchema.safeParse(rawFormData);

    if (!validation.success) {
        return { success: false, errors: validation.error.flatten().fieldErrors, message: 'Validation failed.' };
    }
    
    const { title, files } = validation.data;
    
    try {
        let combinedText = '';
        for(const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const imageDataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

            const ocrResult = await extractTextFromImage({ documentImage: imageDataUri });
            combinedText += ocrResult.extractedText + '\n\n'; // Add newlines to separate pages
        }

        const fullText = combinedText.trim();

        if (!fullText) {
             return { success: false, message: 'Could not extract any text from the uploaded images. Please ensure they are clear and legible.' };
        }

        const [summary, risks, relatedLaws, negotiationPoints] = await Promise.all([
            documentSummarization({ documentText: fullText }),
            riskAssessment({ documentText: fullText }),
            relatedLawSuggestions({ documentText: fullText }),
            generateNegotiationPoints({ contractText: fullText })
        ]);

        const newDoc: DocumentType = {
            id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            title: title,
            createdAt: new Date().toISOString(),
            riskLevel: risks.riskLevel,
            summary: {
                facts: summary.summary.facts,
                obligations: summary.summary.obligations,
                rights: summary.summary.rights,
                deadlines: summary.summary.deadlines,
            },
            risks: {
                whatIfScenarios: risks.whatIfScenarios,
            },
            relatedLaws: relatedLaws.laws,
            negotiationPoints: {
                points: negotiationPoints.negotiationPoints,
                improvements: negotiationPoints.suggestedImprovements,
            },
            fullText,
        };

        const existingDocs = await readDocuments();
        existingDocs.unshift(newDoc);
        await writeDocuments(existingDocs);

        revalidatePath('/');
        revalidatePath('/documents');
        
        return { success: true, message: `Document "${title}" analyzed successfully!`, shouldRedirect: true };

    } catch (error: any) {
        console.error("File processing or AI analysis failed:", error);
        return { success: false, message: error.message || 'Failed to analyze document. Please ensure it is a clear image file.' };
    }
}


export async function handleFormFillUpload(prevState: any, formData: FormData): Promise<{ success: boolean; message: string; filledForm: FormSegment[] }> {
    const file = formData.get('file');

    const initialState = {
        success: false,
        message: '',
        filledForm: [],
    };

    if (!file || !(file instanceof File) || file.size === 0 || !file.type.startsWith('image/')) {
        return { ...initialState, message: 'An image file is required.' };
    }
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageDataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

        const result: AiFormFillOutput = await aiFormFill({ formImage: imageDataUri });
        return { success: true, message: 'AI has filled the form with suggestions!', filledForm: result.filledFormSegments };

    } catch (error: any) {
        console.error("AI form fill failed:", error);
        if (error.message && error.message.includes("Schema validation failed")) {
            return { ...initialState, message: 'The AI could not process this image. Please ensure the document is a fillable form.' };
        }
        return { ...initialState, message: error.message || 'Failed to fill form with AI. Please ensure it is an image file.' };
    }
}


export async function getNewDocuments() {
    const uploadedDocuments = await readDocuments();
    // Combine user-uploaded documents with mock documents, ensuring no ID conflicts
    // This makes the mock documents available throughout the app just like real ones.
    const uploadedIds = new Set(uploadedDocuments.map(doc => doc.id));
    const uniqueMockDocuments = mockDocuments.filter(doc => !uploadedIds.has(doc.id));

    return [...uploadedDocuments, ...uniqueMockDocuments];
}

export async function getChatbotResponse(input: LegalChatbotInput) {
    try {
        const result = await legalChatbot(input);
        return { success: true, data: result.answer };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get response from chatbot.' };
    }
}

export async function findSimilarCases(input: SimilarCasesInput) {
    try {
        const result = await similarCases(input);
        return { success: true, data: result.cases };
    } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message || 'Failed to find similar cases.' };
    }
}

export async function deleteDocument(id: string) {
    try {
        // Prevent deletion of mock documents
        const isMock = mockDocuments.some(doc => doc.id === id);
        if (isMock) {
            return { success: false, message: 'Example documents cannot be deleted.' };
        }

        const existingDocs = await readDocuments();
        const updatedDocs = existingDocs.filter(doc => doc.id !== id);
        
        if (existingDocs.length === updatedDocs.length) {
            return { success: false, message: 'Document not found.' };
        }

        await writeDocuments(updatedDocs);
        revalidatePath('/documents');
        return { success: true, message: 'Document deleted successfully.' };
    } catch (error: any) {
        console.error("Failed to delete document:", error);
        return { success: false, message: error.message || 'Failed to delete document.' };
    }
}
