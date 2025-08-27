
'use client';

import type { DocumentType } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { AlertCircle, Calendar, CheckCircle, FileText, Gavel, Lightbulb, Scale, ShieldAlert, BookText, Landmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SimilarCases } from './SimilarCases';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

const riskVariantMap: { [key in DocumentType['riskLevel']]: 'default' | 'secondary' | 'destructive' } = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
};

const riskBadgeClass: { [key in DocumentType['riskLevel']]: string } = {
    Low: 'bg-green-500 hover:bg-green-600',
    Medium: 'bg-yellow-500 hover:bg-yellow-600',
    High: 'bg-red-500 hover:bg-red-600',
}

export function DocumentClientPage({ document }: { document: DocumentType }) {
  const variant = riskVariantMap[document.riskLevel];
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (document.createdAt) {
      setFormattedDate(new Date(document.createdAt).toLocaleDateString());
    }
  }, [document.createdAt]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline mb-2">{document.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate || 'Just now'}</span>
            </div>
            <Badge variant={variant} className={cn("text-sm text-white", riskBadgeClass[document.riskLevel])}>
                {document.riskLevel} Risk
            </Badge>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="analysis"><BookText className="mr-2"/> Analysis</TabsTrigger>
            <TabsTrigger value="negotiation"><Lightbulb className="mr-2"/> Negotiation</TabsTrigger>
            <TabsTrigger value="cases"><Scale className="mr-2"/> Similar Cases</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
                    <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-semibold">
                        <FileText className="mr-2 text-primary" /> AI Summary
                    </AccordionTrigger>
                    <AccordionContent className="text-base pl-2 space-y-4">
                        <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Landmark className="h-5 w-5 text-secondary-foreground/80"/>Facts</h4>
                        <p className="text-muted-foreground">{document.summary.facts}</p>
                        </div>
                        <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Gavel className="h-5 w-5 text-secondary-foreground/80"/>Obligations</h4>
                        <p className="text-muted-foreground">{document.summary.obligations}</p>
                        </div>
                        <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-secondary-foreground/80"/>Rights</h4>
                        <p className="text-muted-foreground">{document.summary.rights}</p>
                        </div>
                        <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><Calendar className="h-5 w-5 text-secondary-foreground/80"/>Deadlines</h4>
                        <p className="text-muted-foreground">{document.summary.deadlines}</p>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-semibold">
                        <ShieldAlert className="mr-2 text-primary" /> Risks & What-ifs
                    </AccordionTrigger>
                    <AccordionContent className="text-base pl-2">
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {document.risks.whatIfScenarios.map((scenario, i) => <li key={i}>{scenario}</li>)}
                        </ul>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-semibold">
                        <Scale className="mr-2 text-primary" /> Related Laws
                    </AccordionTrigger>
                    <AccordionContent className="text-base pl-2">
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {document.relatedLaws.map((law, i) => <li key={i}>{law}</li>)}
                        </ul>
                    </AccordionContent>
                    </AccordionItem>

                </Accordion>
                </div>

                <div className="lg:col-span-1">
                <Chatbot documentText={document.fullText} documentTitle={document.title} />
                </div>
            </div>
        </TabsContent>
        <TabsContent value="negotiation">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> Negotiation Toolkit</CardTitle>
                    <CardDescription>AI-driven suggestions for strengthening your position.</CardDescription>
                </CardHeader>
                <CardContent className="text-base pl-6 pr-6 pb-6 space-y-6">
                    <div>
                        <h4 className="font-semibold text-xl mb-3 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-destructive"/> Potential Negotiation Points</h4>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {document.negotiationPoints.points.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xl mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500"/> Suggested Clause Improvements</h4>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {document.negotiationPoints.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="cases">
             <SimilarCases documentText={document.fullText} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
