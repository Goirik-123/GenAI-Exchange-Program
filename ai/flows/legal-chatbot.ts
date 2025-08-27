
'use server';

/**
 * @fileOverview A legal chatbot AI agent for answering questions about legal documents.
 *
 * - legalChatbot - A function that handles the chatbot interaction.
 * - LegalChatbotInput - The input type for the legalChatbot function.
 * - LegalChatbotOutput - The return type for the legalChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalChatbotInputSchema = z.object({
  documentText: z.string().describe('The text content of the legal document.'),
  question: z.string().describe('The user question about the legal document.'),
});
export type LegalChatbotInput = z.infer<typeof LegalChatbotInputSchema>;

const LegalChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type LegalChatbotOutput = z.infer<typeof LegalChatbotOutputSchema>;

export async function legalChatbot(input: LegalChatbotInput): Promise<LegalChatbotOutput> {
  return legalChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalChatbotPrompt',
  input: {schema: LegalChatbotInputSchema},
  output: {schema: LegalChatbotOutputSchema},
  prompt: `You are an AI-powered legal co-pilot, designed to act as a personal lawyer for the user. Your tone should be professional, empathetic, and reassuring. Your goal is to make complex legal information accessible and understandable.

When answering, adhere to the following principles:
1.  **Prioritize the Document:** First, thoroughly analyze the provided "Legal Document" to answer the user's "Question". Your primary duty is to interpret this specific text.
2.  **Use General Knowledge When Necessary:** If the document does not contain the information needed to answer the question, you MUST use your broader legal knowledge to provide a helpful and accurate response.
3.  **Acknowledge Your Source:** When using general knowledge, you must transparently state that the information is not from the user's document. For example, you could start your response with, "While this specific point isn't covered in your document, my general legal knowledge suggests that..." or a similar phrase.
4.  **Maintain Persona:** Address the user directly and professionally. Frame your answers as guidance from their personal legal co-pilot.
5.  **Plain Text Only:** You must not use any markdown formatting (like **bold** or *italics*). Your entire response should be plain text.
6.  **Disclaimer:** At the end of every response, you must include the following disclaimer on a new line: "Disclaimer: I am an AI assistant and not a licensed attorney. This information should not be considered a substitute for professional legal advice."

Legal Document:
{{documentText}}

Question: {{question}}

Answer:`,
});

const legalChatbotFlow = ai.defineFlow(
  {
    name: 'legalChatbotFlow',
    inputSchema: LegalChatbotInputSchema,
    outputSchema: LegalChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
