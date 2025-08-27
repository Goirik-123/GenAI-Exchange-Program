import {z} from 'genkit';

export const CaseSchema = z.object({
  caseName: z
    .string()
    .describe("The name of the court case, e.g., 'Smith v. Jones'."),
  court: z
    .string()
    .describe(
      "The court where the case was heard, e.g., 'Supreme Court of California'."
    ),
  year: z.number().describe('The year the case was decided.'),
  summary: z
    .string()
    .describe(
      'A brief summary of the case, its key arguments, and its outcome.'
    ),
  relevance: z
    .string()
    .describe(
      "A brief explanation of why this case is relevant to the user's document."
    ),
});

export const SimilarCasesInputSchema = z.object({
  documentText: z
    .string()
    .describe(
      'The text content of the legal document to find similar cases for.'
    ),
});
export type SimilarCasesInput = z.infer<typeof SimilarCasesInputSchema>;

export const SimilarCasesOutputSchema = z.object({
  cases: z.array(CaseSchema).describe('An array of similar legal cases.'),
});
export type SimilarCasesOutput = z.infer<typeof SimilarCasesOutputSchema>;
