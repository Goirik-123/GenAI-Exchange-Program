
'use client';

import { findSimilarCases } from '@/lib/actions';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Loader2, AlertTriangle, Scale } from 'lucide-react';
import type { SimilarCasesOutput } from '@/ai/flows/similar-cases';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function SimilarCases({ documentText }: { documentText: string }) {
  const [result, setResult] = useState<SimilarCasesOutput['cases'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getCases() {
      setIsLoading(true);
      setError('');
      const response = await findSimilarCases({ documentText });
      if (response.success) {
        setResult(response.data!);
      } else {
        setError(response.error || 'An unknown error occurred.');
      }
      setIsLoading(false);
    }
    getCases();
  }, [documentText]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Scale className="text-primary"/>AI-Powered Case Finder</CardTitle>
        <CardDescription>Discover relevant legal precedents and similar cases.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Searching legal databases...</p>
          </div>
        )}
        {error && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-destructive">
                <AlertTriangle className="h-8 w-8" />
                <p className="font-semibold">Could not fetch similar cases</p>
                <p className="text-sm text-center">{error}</p>
          </div>
        )}
        {!isLoading && !error && result && (
            <Accordion type="single" collapsible className="w-full">
              {result.map((caseItem, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg">
                    <div className="flex flex-col text-left">
                        <span className="font-semibold">{caseItem.caseName}</span>
                        <span className="text-sm text-muted-foreground font-normal">{caseItem.court} ({caseItem.year})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 text-base">
                     <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Scale className="h-4 w-4" /> Relevance</h4>
                        <p className="text-muted-foreground">{caseItem.relevance}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <p className="text-muted-foreground">{caseItem.summary}</p>
                     </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
