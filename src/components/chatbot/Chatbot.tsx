
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatbotResponse } from '@/lib/actions';
import type { ChatMessage } from '@/lib/types';
import { Send, Loader2, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Logo } from '../layout/Logo';

interface ChatbotProps {
  documentText: string;
  documentTitle: string;
}

export function Chatbot({ documentText, documentTitle }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const starterQuestions = [
    'What does this document mean for me?',
    'What are my key obligations?',
    'What if I terminate this agreement early?',
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = async (question: string = input) => {
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const res = await getChatbotResponse({ documentText, question });

    if (res.success && res.data) {
      const assistantMessage: ChatMessage = { role: 'assistant', content: res.data };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm sorry, I couldn't process that request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <Card className="flex flex-col h-[70vh]">
      <CardHeader>
        <CardTitle>Chatbot Assistant</CardTitle>
        <CardDescription>Ask questions about "{documentTitle}"</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback className='bg-primary text-primary-foreground'><Sparkles className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback className='bg-secondary text-secondary-foreground'><User className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <Avatar className="h-8 w-8">
                     <AvatarFallback className='bg-primary text-primary-foreground'><Sparkles className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
           {messages.length === 0 && !isLoading && (
              <div className="text-center text-muted-foreground text-sm">
                  <p className="mb-4">Or try one of these starter questions:</p>
                  <div className="grid grid-cols-1 gap-2">
                      {starterQuestions.map(q => (
                          <Button key={q} variant="outline" size="sm" onClick={() => handleSend(q)} className="text-left justify-start">{q}</Button>
                      ))}
                  </div>
              </div>
          )}
        </ScrollArea>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-4 border-t"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
