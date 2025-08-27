import { Button } from '@/components/ui/button';
import { DocumentCard } from '@/components/document/DocumentCard';
import { FileUploadForm } from '@/components/document/FileUploadForm';
import { getNewDocuments } from '@/lib/actions';
import Link from 'next/link';
import { Lightbulb, Scale, ShieldCheck } from 'lucide-react';
import { mockDocuments } from '@/lib/mock-data';

const features = [
    {
        icon: <Scale className="h-8 w-8 text-primary" />,
        title: 'Document Summarization',
        description: 'Upload any legal document image and get a clear, categorized summary in seconds.',
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'Risk Prediction',
        description: 'Our AI analyzes potential risks and generates "what-if" scenarios to keep you informed.',
    },
    {
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        title: 'Negotiation Toolkit',
        description: 'Receive AI-driven suggestions for clause improvements to strengthen your position.',
    },
];

export default async function Home() {
  const exampleDocuments = mockDocuments;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
          Your AI-Powered Legal Co-Pilot
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Simplify complex legal documents, predict risks, and negotiate with confidence. Legally Simple is here to help.
        </p>
        <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
                <Link href="/documents">Explore Library</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="/form-fill">Try AI Form Fill</Link>
            </Button>
        </div>
      </section>

      <section className="my-12">
        <FileUploadForm />
      </section>

       <section className="my-16 py-16 bg-secondary/50 rounded-lg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline">How It Works</h2>
                    <p className="text-muted-foreground mt-2">A seamless experience from document to decision.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold font-headline mb-6">Example Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </section>
    </div>
  );
}
