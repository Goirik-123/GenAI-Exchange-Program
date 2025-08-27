
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, UploadCloud } from 'lucide-react';
import { handleFormFillUpload } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { FormSegment } from '@/lib/types';

const initialState: {
    success: boolean;
    message: string;
    filledForm: FormSegment[];
} = {
    success: false,
    message: '',
    filledForm: [],
};

export default function FormFillPage() {
    const [state, formAction, isPending] = useActionState(handleFormFillUpload, initialState);
    const [filledForm, setFilledForm] = useState<FormSegment[]>([]);
    const [fileName, setFileName] = useState('');
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!state) return;

        if (state.message) {
            toast({
                title: state.success ? 'Success' : 'Error',
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
            });
        }
        
        if (state.success && state.filledForm) {
            setFilledForm(state.filledForm);
            formRef.current?.reset();
            setFileName('');
        } else if (!state.success) {
            // Keep the form state on error so the user can retry
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setFileName('');
        }

    }, [state, toast]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
    };


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Intelligent Form Fill</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload an image of a document with blanks. The AI will analyze it and suggest example content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Document Image</CardTitle>
            <CardDescription>Upload an image of a form you want the AI to fill.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="file-form-fill">Document Image</Label>
                    <div>
                      <Input id="file-form-fill" name="file" type="file" required onChange={handleFileChange} className="hidden" accept="image/*" ref={fileInputRef} />
                      <Label htmlFor="file-form-fill" className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/50 hover:bg-muted/75 transition-colors">
                        <div className="text-center">
                            {fileName ? (
                                <p>{fileName}</p>
                            ) : (
                                <>
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">Click to browse or drag and drop</p>
                                    <p className="mt-1 text-xs text-muted-foreground/80">PNG, JPG, GIF, etc.</p>
                                </>
                            )}
                        </div>
                      </Label>
                    </div>
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Suggest Content
                </Button>
              </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Suggestions</CardTitle>
            <CardDescription>The AI-filled document will appear here, with answers highlighted.</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="whitespace-pre-wrap break-words bg-muted p-4 rounded-lg text-sm text-muted-foreground font-sans h-full min-h-[400px]">
                {filledForm.length > 0 ? (
                    <div>
                        {filledForm.map((segment, segIndex) => (
                            <span key={segIndex} className={segment.type === 'answer' ? 'bg-accent/50 text-accent-foreground font-semibold rounded p-0.5' : ''}>
                                {segment.text}
                            </span>
                        ))}
                    </div>
                ) : (
                    'AI suggestions will be shown here...'
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
