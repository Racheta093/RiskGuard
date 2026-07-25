import { Send } from "lucide-react";

import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";
import { aiTools } from "../../constants/aiTools";
import AIToolCard from "../Layout/AIToolCard";

const MessageInput = () => {
  const { conversation } = useConversation();
  const { loading, input, setInput, sendMessage } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="border-t border-zinc-800/80 bg-zinc-950/40 backdrop-blur p-5 shrink-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
          {aiTools.map((tool) => (
            <AIToolCard key={tool.title} tool={tool} />
          ))}
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-full pl-5 pr-2 py-2 focus-within:ring-2 focus-within:ring-blue-500/60 focus-within:border-blue-500/60 transition">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder={
              conversation
                ? "Ask a question about your documents..."
                : "Select a document to start chatting..."
            }
          />

          <button
            disabled={loading}
            onClick={handleSend}
            className="bg-gradient-to-br from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 shrink-0 shadow-lg shadow-blue-900/30 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
