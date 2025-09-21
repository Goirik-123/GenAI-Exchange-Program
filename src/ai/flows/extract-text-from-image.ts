
'use server';

/**
 * @fileOverview Extracts text from an image using AI.
 *
 * - extractTextFromImage - A function that performs OCR on an image.
 * - ExtractTextFromImageInput - The input type for the function.
 * - ExtractTextFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTextFromImageInputSchema = z.object({
  documentImage: z.string().describe("An image of a document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ExtractTextFromImageInput = z.infer<typeof ExtractTextFromImageInputSchema>;


const ExtractTextFromImageOutputSchema = z.object({
  extractedText: z.string().describe('The full text content extracted from the document image.'),
});
export type ExtractTextFromImageOutput = z.infer<typeof ExtractTextFromImageOutputSchema>;

export async function extractTextFromImage(input: ExtractTextFromImageInput): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTextFromImagePrompt',
  input: {schema: ExtractTextFromImageInputSchema},
  output: {schema: ExtractTextFromImageOutputSchema},
  prompt: `You are an Optical Character Recognition (OCR) expert.
Your task is to accurately extract all text from the provided image of a document.
Preserve the original formatting, including line breaks and paragraphs, as best as possible.

Document Image:
{{media url=documentImage}}
  `,
});

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
