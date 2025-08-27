
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DocumentType } from '@/lib/types';
import { FileText, Calendar, Shield, Trash2, Loader2, Info } from 'lucide-react';
import { useState, useEffect, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteDocument } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { mockDocuments } from '@/lib/mock-data';


const riskVariantMap = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
} as const;

export function DocumentCard({ document }: { document: DocumentType }) {
  const { id, title, createdAt, riskLevel } = document;
  const variant = riskVariantMap[riskLevel];
  const [formattedDate, setFormattedDate] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const isExample = mockDocuments.some(doc => doc.id === id);

  useEffect(() => {
    setFormattedDate(new Date(createdAt).toLocaleDateString());
  }, [createdAt]);
  
  const handleDelete = async () => {
    startTransition(async () => {
        const result = await deleteDocument(id);
        toast({
            title: result.success ? 'Success' : 'Error',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
    });
  }

  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
            {isExample ? (
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/80 px-2 py-1 rounded-full">
                    <Info className="h-3 w-3" />
                    <span>Example</span>
                </div>
            ) : <div />}
             <Badge variant={variant} className={cn(
                {'bg-green-500 hover:bg-green-600': riskLevel === 'Low'},
                {'bg-yellow-500 hover:bg-yellow-600': riskLevel === 'Medium'},
                {'bg-red-500 hover:bg-red-600': riskLevel === 'High'},
                'text-white shrink-0'
            )}>
                <Shield className="mr-1 h-3 w-3" />
                {riskLevel} Risk
            </Badge>
        </div>
        <FileText className="h-8 w-8 text-primary mb-2" />
        <CardTitle className="pt-2 font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formattedDate ? <span>Uploaded on {formattedDate}</span> : <span>Processing date...</span>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button asChild className="w-full">
          <Link href={`/documents/${id}`}>Open</Link>
        </Button>
         <AlertDialog>
            <AlertDialogTrigger asChild>
                 <Button variant="destructive" size="icon" disabled={isPending || isExample} aria-label={`Delete document: ${title}`}>
                    {isPending ? <Loader2 className="animate-spin"/> : <Trash2 />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the document "{title}" from the servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                        Yes, delete it
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
