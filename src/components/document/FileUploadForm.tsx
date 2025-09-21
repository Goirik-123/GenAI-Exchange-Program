
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { handleFileUpload } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, FileImage, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialState = {
    success: false,
    errors: null,
    message: '',
    shouldRedirect: false,
};

export function FileUploadForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(handleFileUpload, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (!state) return;
        if(state.message) {
            toast({
                title: state.success ? "Success!" : "Error",
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
            });
        }
        
        if (state.success) {
            formRef.current?.reset();
            setFiles([]);
            if (state.shouldRedirect) {
                // A full page reload is the most reliable way to bust the cache
                // and ensure the new document appears in the library.
                window.location.href = '/documents';
            }
        }
    }, [state, toast, router]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList);
            const combinedFiles = [...files, ...newFiles];
            if (combinedFiles.length > 10) {
                toast({
                    title: "Too many files",
                    description: "You can upload a maximum of 10 images.",
                    variant: "destructive",
                });
                return;
            }
            setFiles(combinedFiles);
        }
    };
    
    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <UploadCloud className="h-6 w-6 text-primary" />
                    Analyze a New Document
                </CardTitle>
                <CardDescription>
                    Upload up to 10 images of a document to get an AI-powered summary, risk analysis, and more.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Document Title</Label>
                        <Input id="title" name="title" placeholder="e.g., Commercial Lease Agreement" required />
                        {state?.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="files">Document Images (up to 10)</Label>
                        <div>
                            <Input 
                                id="files" 
                                name="files" 
                                type="file" 
                                required={files.length === 0} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/*" 
                                multiple
                                ref={fileInputRef}
                                // Reset the input value to allow re-uploading the same file
                                onClick={(e) => (e.currentTarget.value = '')}
                            />
                             <Label htmlFor="files" className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/50 hover:bg-muted/75 transition-colors">
                                <div className="text-center">
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">Click to browse or drag and drop</p>
                                    <p className="mt-1 text-xs text-muted-foreground/80">You can upload multiple pages</p>
                                </div>
                            </Label>
                        </div>
                        {files.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="font-medium text-sm">Selected Files:</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {files.map((file, index) => (
                                        <div key={index} className="relative group p-2 border rounded-md bg-secondary/50 flex items-center gap-2 text-sm">
                                            <FileImage className="h-5 w-5 text-secondary-foreground" />
                                            <span className="truncate">{file.name}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                <X className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {state?.errors?.files && <p className="text-sm text-destructive">{state.errors.files[0]}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 animate-spin" /> : null}
                        Analyze Document
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
