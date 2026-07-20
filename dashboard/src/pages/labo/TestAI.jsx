import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Bot, Send, Loader2 } from 'lucide-react';
import { askAI } from '../utils/gemini';

export default function TestAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await askAI(question);
      setAnswer(response);
    } catch (error) {
      setAnswer("Oops! Lab AI Assistant is currently busy. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="admin" />
      <main className="flex-1 p-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Bot className="text-blue-600" size={32} /> Lab AI Assistant
          </h1>
          <p className="text-slate-500">Diagnostic support & predictive analysis at your fingertips.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <textarea
            rows="4"
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="E.g., Analyze recent CBC trends or suggest machine maintenance..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          
          <button
            onClick={handleAsk}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold mt-4 hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            {loading ? "Analyzing..." : "Ask AI"}
          </button>
        </div>

        {answer && (
          <div className="bg-white p-8 rounded-3xl mt-6 border border-blue-50 shadow-sm">
            <h3 className="font-bold text-blue-600 mb-2 uppercase text-xs tracking-widest">AI Insight</h3>
            <p className="text-slate-700 leading-relaxed">{answer}</p>
          </div>
        )}
      </main>
    </div>
  );
}