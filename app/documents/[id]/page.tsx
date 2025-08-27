
import { DocumentClientPage } from '@/components/document/DocumentClientPage';
import { getNewDocuments } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DocumentType } from '@/lib/types';

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const documents = await getNewDocuments();

  const document = documents.find((doc) => doc.id === params.id);

  if (!document) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
            <Button asChild variant="ghost">
                <Link href="/documents">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Library
                </Link>
            </Button>
        </div>
      <DocumentClientPage document={document} />
    </div>
  );
}
