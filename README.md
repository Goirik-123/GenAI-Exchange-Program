# Legally Simple: Your AI-Powered Legal Co-Pilot

![Legally Simple Demo](https://placehold.co/800x400/e2e8f0/64748b?text=App+Screenshot+Here&font=lexend)
*<p align="center">A modern, AI-native application designed to demystify complex legal documents.</p>*

---

Legally Simple is a web application built with Next.js and Google's Gemini AI that acts as a personal legal assistant. It empowers users to upload legal document images, receive in-depth analysis, predict potential risks, and even get help filling out complex forms. This project showcases the power of generative AI to make legal information more accessible and manageable for everyone.

## ✨ Key Features

- **📄 AI Document Analysis**: Upload up to 10 images of a legal document. The AI processes them as a single document and provides a comprehensive analysis, including:
  - **Categorized Summaries**: Key facts, obligations, rights, and deadlines.
  - **Risk Prediction**: Identifies potential risks with a "High," "Medium," or "Low" rating and generates "what-if" scenarios.
  - **Related Law Suggestions**: Finds relevant laws and statutes related to your document.
- **💡 Negotiation Toolkit**: Get AI-driven suggestions for improving contract clauses and identifying negotiation points to strengthen your position.
- **⚖️ Similar Case Finder**: Discover relevant, real-world legal cases from Indian law that are similar to your document's context.
- **🤖 Interactive Legal Chatbot**: Ask questions about your uploaded documents in plain English and get clear, context-aware answers from an AI assistant.
- **✒️ Intelligent Form Filling**: Upload an image of a form, and the AI will fill in the blanks with realistic, context-appropriate example data while preserving the original document's visual structure.
- **📚 Document Library**: All your analyzed documents are saved in a persistent library for easy access and management.

## 🚀 Tech Stack

This project is built with a modern, AI-first technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **AI & Generative AI**: [Google AI (Gemini 2.0 Flash)](https://ai.google.dev/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Hooks (`useState`, `useActionState`)
- **Backend Logic**: Next.js Server Actions

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or later)
- An API key for the Gemini API. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002).

## 📂 Project Structure

```
.
├── src
│   ├── app/                # Next.js App Router pages
│   ├── ai/                 # Genkit flows and AI logic
│   │   ├── flows/          # Specific AI agent/flow definitions
│   │   └── schemas/        # Zod schemas for AI input/output
│   ├── components/         # Reusable React components
│   │   ├── chatbot/
│   │   ├── document/
│   │   ├── layout/
│   │   └── ui/             # ShadCN UI components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Core application logic, actions, types
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind CSS configuration
```

This well-organized structure separates concerns, making the project easy to navigate and maintain.
