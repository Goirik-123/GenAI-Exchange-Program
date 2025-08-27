'use server';

/**
 * @fileOverview Generates potential negotiation points for a contract and offers AI-driven suggestions for clause improvements.
 *
 * - generateNegotiationPoints - A function that handles the generation of negotiation points.
 * - NegotiationPointsInput - The input type for the generateNegotiationPoints function.
 * - NegotiationPointsOutput - The return type for the generateNegotiationPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NegotiationPointsInputSchema = z.object({
  contractText: z
    .string()
    .describe('The text of the contract for which to generate negotiation points.'),
  clauseToNegotiate: z
    .string()
    .optional()
    .describe('Specific clause to focus negotiation on, if any.'),
});
export type NegotiationPointsInput = z.infer<typeof NegotiationPointsInputSchema>;

const NegotiationPointsOutputSchema = z.object({
  negotiationPoints: z
    .array(z.string())
    .describe('A list of potential negotiation points for the contract.'),
  suggestedImprovements: z
    .array(z.string())
    .describe('AI-driven suggestions for improving the contract clauses.'),
});
export type NegotiationPointsOutput = z.infer<typeof NegotiationPointsOutputSchema>;

export async function generateNegotiationPoints(
  input: NegotiationPointsInput
): Promise<NegotiationPointsOutput> {
  return negotiationPointsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negotiationPointsPrompt',
  input: {schema: NegotiationPointsInputSchema},
  output: {schema: NegotiationPointsOutputSchema},
  prompt: `You are an expert legal contract negotiator.

  Given the following contract text, identify potential negotiation points and suggest improvements to the clauses.

  Contract Text:
  {{contractText}}

  {% if clauseToNegotiate %}
  Focus specifically on the following clause:
  {{clauseToNegotiate}}
  {% endif %}

  Provide a list of negotiation points and suggested improvements.
  `,
});

const negotiationPointsFlow = ai.defineFlow(
  {
    name: 'negotiationPointsFlow',
    inputSchema: NegotiationPointsInputSchema,
    outputSchema: NegotiationPointsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
