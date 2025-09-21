export type DocumentType = {
  id: string;
  title: string;
  createdAt: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  summary: {
    facts: string;
    obligations: string;
    rights: string;
    deadlines: string;
  };
  risks: {
    whatIfScenarios: string[];
  };
  relatedLaws: string[];
  negotiationPoints: {
    points: string[];
    improvements: string[];
  };
  fullText: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type FormSegment = {
    type: 'original' | 'answer';
    text: string;
};
