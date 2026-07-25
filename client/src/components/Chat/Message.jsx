import { useState } from "react";
import { Copy, Check, Quote } from "lucide-react";
import toast from "react-hot-toast";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const Message = ({ message }) => {
  const isUser = message.role === "user";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success("Copied to clipboard!");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`mb-6 flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center text-[11px] font-semibold shrink-0 mb-1">
          U
        </div>
      )}

      <div
        className={`group relative rounded-2xl px-5 py-4 max-w-[85%] ${
          isUser
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
            : "bg-zinc-900/80 border border-zinc-800/60 text-zinc-100"
        }`}
      >
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-md opacity-0 group-hover:opacity-100 hover:bg-zinc-700 transition"
            title="Copy"
          >
            {copied ? (
              <Check size={16} className="text-emerald-400" />
            ) : (
              <Copy size={16} className="text-zinc-400" />
            )}
          </button>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-6 mb-3">{children}</h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-5 mb-2">{children}</h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
            ),

            p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,

            ul: ({ children }) => (
              <ul className="list-disc ml-6 mb-4">{children}</ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal ml-6 mb-4">{children}</ol>
            ),

            li: ({ children }) => <li className="mb-1">{children}</li>,

            strong: ({ children }) => (
              <strong className="font-bold text-white">{children}</strong>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>

        {message.sources?.length > 0 && (
          <div className="mt-5 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-1.5 mb-3">
              <Quote size={12} className="text-blue-500" />
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                Sources
              </p>
              <span className="text-[10px] text-zinc-600 bg-zinc-800/80 rounded-full px-1.5 py-0.5">
                {message.sources.length}
              </span>
            </div>

            <div className="space-y-2">
              {message.sources.map((source, index) => (
                <div
                  key={index}
                  className="flex gap-2.5 rounded-lg bg-zinc-950/50 border border-zinc-800/60 hover:border-blue-600/40 px-3 py-2.5 transition"
                >
                  <span className="text-[10px] font-semibold text-blue-500 bg-blue-500/10 rounded-md w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed italic">
                    "{source.content?.slice(0, 140)}..."
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
