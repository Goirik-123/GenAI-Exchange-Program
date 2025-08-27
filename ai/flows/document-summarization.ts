'use server';

/**
 * @fileOverview Summarizes legal documents into key sections: Facts, Obligations, Rights, and Deadlines.
 *
 * - documentSummarization - A function that handles the document summarization process.
 * - DocumentSummarizationInput - The input type for the documentSummarization function.
 * - DocumentSummarizationOutput - The return type for the documentSummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentSummarizationInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document to be summarized.'),
});
export type DocumentSummarizationInput = z.infer<typeof DocumentSummarizationInputSchema>;

const DocumentSummarizationOutputSchema = z.object({
  summary: z.object({
    facts: z.string().describe('A summary of the key facts presented in the document.'),
    obligations: z.string().describe('A summary of the obligations outlined in the document.'),
    rights: z.string().describe('A summary of the rights conferred by the document.'),
    deadlines: z.string().describe('A summary of the critical deadlines mentioned in the document.'),
  }).describe('A summary of the legal document, categorized into facts, obligations, rights, and deadlines.'),
});
export type DocumentSummarizationOutput = z.infer<typeof DocumentSummarizationOutputSchema>;

export async function documentSummarization(input: DocumentSummarizationInput): Promise<DocumentSummarizationOutput> {
  return documentSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentSummarizationPrompt',
  input: {schema: DocumentSummarizationInputSchema},
  output: {schema: DocumentSummarizationOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing legal documents.

  Given the text of a legal document, your task is to provide a concise summary, extracting key information and organizing it into the following sections:

  - Facts: Briefly describe the essential facts and background information presented in the document.
  - Obligations: Summarize the key obligations and responsibilities of each party involved.
  - Rights: Outline the rights and entitlements granted to each party by the document.
  - Deadlines: List any critical deadlines or time-sensitive requirements mentioned in the document.

  Document Text:
  {{documentText}}
  `,
});

const documentSummarizationFlow = ai.defineFlow(
  {
    name: 'documentSummarizationFlow',
    inputSchema: DocumentSummarizationInputSchema,
    outputSchema: DocumentSummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
