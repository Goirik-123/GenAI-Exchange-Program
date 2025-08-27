import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'How does the document summarization work?',
    answer: 'Our app uses advanced AI models from Google Vertex AI. When you upload a document, we extract the text and send it to the AI, which is trained to understand legal language. It then identifies and categorizes the key information into Facts, Obligations, Rights, and Deadlines.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, security is our top priority. Your documents are uploaded directly to secure cloud storage. All data processing is done over encrypted connections. We do not share your data with any third parties.',
  },
  {
    question: 'What kind of documents can I upload?',
    answer: 'Currently, the app works best with text-based PDF documents. Scanned documents or images may not process correctly. We support contracts, agreements, legal notices, and other common legal document formats.',
  },
  {
    question: 'What is the "Risk Predictor"?',
    answer: 'The Risk Predictor is an AI-powered tool that analyzes your document for clauses or terms that could potentially be risky. It assigns a "High", "Medium", or "Low" risk level and generates "What if" scenarios to help you understand potential outcomes.',
  },
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Community & Support
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions and get in touch with our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Have a question that is not in the FAQ? Our support team is here to help.
                    </p>
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Email Us</h3>
                            <p className="text-sm text-muted-foreground">support@legallysimple.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle>Community Forum (Coming Soon)</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                    <MessageCircle className="h-16 w-16 text-primary mb-4" />
                    <p className="text-muted-foreground">
                        A place to connect with other users, share insights, and discuss legal tech trends is on its way. Stay tuned!
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
