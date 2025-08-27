'use server';
/**
 * @fileOverview Predicts potential risks associated with a legal document and shows 'What if' scenarios.
 *
 * - riskAssessment - A function that handles the risk assessment process.
 * - RiskAssessmentInput - The input type for the riskAssessment function.
 * - RiskAssessmentOutput - The return type for the riskAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
});
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

const RiskAssessmentOutputSchema = z.object({
  riskLevel: z.enum(['High', 'Medium', 'Low']).describe('The predicted risk level of the document.'),
  whatIfScenarios: z.array(z.string()).describe('An array of possible "What if" scenarios and their potential impact.'),
});
export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

export async function riskAssessment(input: RiskAssessmentInput): Promise<RiskAssessmentOutput> {
  return riskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAssessmentPrompt',
  input: {schema: RiskAssessmentInputSchema},
  output: {schema: RiskAssessmentOutputSchema},
  prompt: `You are an AI legal assistant that predicts potential risks associated with a legal document and provides "What if" scenarios.

  Analyze the following legal document:
  {{documentText}}

  Based on your analysis, determine the risk level (High, Medium, or Low) and provide a list of "What if" scenarios and their potential impact.
`,
});

const riskAssessmentFlow = ai.defineFlow(
  {
    name: 'riskAssessmentFlow',
    inputSchema: RiskAssessmentInputSchema,
    outputSchema: RiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
