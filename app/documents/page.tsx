
import { DocumentCard } from '@/components/document/DocumentCard';
import { getNewDocuments } from '@/lib/actions';
import { DocumentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function LibraryPage() {
  const newDocuments = await getNewDocuments();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
          Document Library
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
          Browse, search, and manage all your processed documents in one place.
        </p>
      </div>

      {newDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Library is Empty</h2>
            <p className="text-muted-foreground mb-6">You haven't analyzed any documents yet.</p>
            <Button asChild>
                <Link href="/">Analyze a New Document</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
