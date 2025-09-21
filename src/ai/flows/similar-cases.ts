'use server';

/**
 * @fileOverview Finds similar legal cases based on a document's text.
 *
 * - similarCases - A function that handles finding similar cases.
 * - SimilarCasesInput - The input type for the similarCases function.
 * - SimilarCasesOutput - The return type for the similarCases function.
 */

import {ai} from '@/ai/genkit';
import {
  SimilarCasesInputSchema,
  type SimilarCasesInput,
  SimilarCasesOutputSchema,
  type SimilarCasesOutput,
} from '../schemas/similar-cases';

export type {SimilarCasesInput, SimilarCasesOutput};

export async function similarCases(
  input: SimilarCasesInput
): Promise<SimilarCasesOutput> {
  return similarCasesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'similarCasesPrompt',
  input: {schema: SimilarCasesInputSchema},
  output: {schema: SimilarCasesOutputSchema},
  prompt: `You are a legal research expert. Based on the following legal document, find 3-5 relevant or similar court cases from Indian law.

For each case, provide the case name, the court, the year it was decided, a brief summary, and an explanation of its relevance to the provided document.

Document Text:
{{{documentText}}}

Provide the output as a structured list of cases.
`,
});

const similarCasesFlow = ai.defineFlow(
  {
    name: 'similarCasesFlow',
    inputSchema: SimilarCasesInputSchema,
    outputSchema: SimilarCasesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
