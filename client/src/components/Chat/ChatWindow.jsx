import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";

import { useChat } from "../../context/ChatContext";
import { useDocument } from "../../context/DocumentContext";
import { useConversation } from "../../context/ConversationContext";
import PromptCard from "./PromptCard";
import Message from "./Message";

const ChatWindow = () => {
  const { messages, loading } = useChat();
  const { selectedDocument } = useDocument();
  const { conversation } = useConversation();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const promptCards = [
    {
      icon: "📄",
      title: "Summarize",
      prompt: "Summarize this document in simple language.",
    },
    {
      icon: "📝",
      title: "Generate MCQs",
      prompt: "Generate 20 MCQs from this document.",
    },
    {
      icon: "🧠",
      title: "Explain Concepts",
      prompt: "Explain the difficult concepts from this document.",
    },
    {
      icon: "🎓",
      title: "Viva Questions",
      prompt: "Generate important viva questions from this document.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Assistant header */}
      <div className="h-16 border-b border-zinc-800/80 bg-zinc-950/40 backdrop-blur flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-900/30 shrink-0">
            <Mic size={16} className="text-white" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold font-display text-white leading-tight">
              AI Assistant
            </p>
            <p className="text-[11px] text-zinc-500 leading-tight flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  selectedDocument ? "bg-emerald-400" : "bg-zinc-600"
                }`}
              />
              {selectedDocument ? "RAG Active" : "No document selected"}
            </p>
          </div>
        </div>

        {conversation && (
          <span className="text-xs text-zinc-500 truncate max-w-[180px] shrink-0">
            {conversation.title}
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
          <div className="max-w-3xl w-full text-center">
            <div className="text-6xl mb-6">📚</div>

            <h1 className="text-4xl font-bold font-display text-white mb-3">
              Welcome to DocuMind
            </h1>

            <p className="text-zinc-400 text-lg mb-10">
              Upload your PDF and let AI summarize, explain, generate quizzes,
              flashcards, and answer questions instantly.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {promptCards.map((card) => (
                <PromptCard
                  key={card.title}
                  title={card.title}
                  icon={card.icon}
                  prompt={card.prompt}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <Message key={msg._id} message={msg} />
            ))}

            {loading && (
              <div className="flex justify-start mb-6">
                <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl px-5 py-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>

                  <div
                    className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  ></div>

                  <div
                    className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>

                  <span className="ml-2 text-zinc-400 text-sm">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
