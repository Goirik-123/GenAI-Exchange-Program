'use server';

/**
 * @fileOverview Suggests relevant laws and clauses related to a legal document.
 *
 * - relatedLawSuggestions - A function that handles the related law suggestion process.
 * - RelatedLawSuggestionsInput - The input type for the relatedLawSuggestions function.
 * - RelatedLawSuggestionsOutput - The return type for the relatedLawSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelatedLawSuggestionsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document to analyze.'),
});
export type RelatedLawSuggestionsInput = z.infer<typeof RelatedLawSuggestionsInputSchema>;

const RelatedLawSuggestionsOutputSchema = z.object({
  laws: z
    .array(z.string())
    .describe('An array of relevant laws, acts, clauses, and bills.'),
});
export type RelatedLawSuggestionsOutput = z.infer<typeof RelatedLawSuggestionsOutputSchema>;

export async function relatedLawSuggestions(
  input: RelatedLawSuggestionsInput
): Promise<RelatedLawSuggestionsOutput> {
  return relatedLawSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'relatedLawSuggestionsPrompt',
  input: {schema: RelatedLawSuggestionsInputSchema},
  output: {schema: RelatedLawSuggestionsOutputSchema},
  prompt: `You are a legal expert. Given the following legal document text, suggest relevant laws, acts, clauses, and bills that may be related to the document.

Document Text:
{{{documentText}}}

Provide the suggestions as a list of strings.`,
});

const relatedLawSuggestionsFlow = ai.defineFlow(
  {
    name: 'relatedLawSuggestionsFlow',
    inputSchema: RelatedLawSuggestionsInputSchema,
    outputSchema: RelatedLawSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
