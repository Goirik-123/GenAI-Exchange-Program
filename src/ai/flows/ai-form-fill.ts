
'use server';

/**
 * @fileOverview AI-powered form fill from an image.
 *
 * - aiFormFill - A function that analyzes an image of a form and suggests example answers.
 * - AiFormFillInput - The input type for the aiFormFill function.
 * - AiFormFillOutput - The return type for the aiFormFill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiFormFillInputSchema = z.object({
  formImage: z.string().describe("An image of a form, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type AiFormFillInput = z.infer<typeof AiFormFillInputSchema>;

const FormSegmentSchema = z.object({
    type: z.enum(['original', 'answer']).describe("The type of segment: 'original' for the form's existing text, or 'answer' for the AI-generated fill."),
    text: z.string().describe('The text content of the segment.'),
});

const AiFormFillOutputSchema = z.object({
  filledFormSegments: z.array(FormSegmentSchema).describe('An array of segments representing the form, with original text and AI-filled answers separated.'),
});
export type AiFormFillOutput = z.infer<typeof AiFormFillOutputSchema>;

export async function aiFormFill(input: AiFormFillInput): Promise<AiFormFillOutput> {
  return aiFormFillFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiFormFillPrompt',
  input: {schema: AiFormFillInputSchema},
  output: {schema: AiFormFillOutputSchema},
  prompt: `You are an AI assistant that helps users by filling out forms from an image. Your primary goal is to maintain the exact visual structure of the original form.

Your task is to:
1.  **Analyze Structure First:** Look at the provided image and understand its spatial layout. Pay close attention to columns, tables, sections, and the relative positioning of text and blank fields.
2.  **Perform OCR:** Read all the text from the image.
3.  **Identify Blanks:** Locate all fillable areas. These might be underscores, empty boxes, bracketed text (e.g., [Client Name]), or just empty space next to a label.
4.  **Generate Realistic Data:** For each blank field, generate a realistic and context-appropriate example answer.
5.  **Reconstruct with Structure:** Break the entire document down into a sequence of segments. Each segment is either a piece of original text or an AI-generated answer. **Crucially, the sequence of these segments must perfectly mirror the original document's structure, including line breaks, spacing, and layout.** If the original form has two columns, your output text should reflect that structure.
6.  **Return JSON:** Return the result as a valid JSON object with an array of segments in the 'filledFormSegments' field.

Example: If the form is "Name: _____, Date: _____", the output should be:
[
    { "type": "original", "text": "Name: " },
    { "type": "answer", "text": "Jane Doe" },
    { "type": "original", "text": ", Date: " },
    { "type": "answer", "text": "25/08/2025" }
]

Form Image to Fill:
{{media url=formImage}}
  `,
});

const aiFormFillFlow = ai.defineFlow(
  {
    name: 'aiFormFillFlow',
    inputSchema: AiFormFillInputSchema,
    outputSchema: AiFormFillOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
