import {
  FileText,
  MessageSquare,
  Plus,
  Trash2,
  Search,
  LogOut,
} from "lucide-react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getDocuments } from "../../services/document.service";
import { useDocument } from "../../context/DocumentContext";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../document/UploadButton";
import {
  createConversation,
  getConversations,
  getMessages,
  renameConversation,
  deleteConversation,
} from "../../services/conversation.service";
import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";

const statusStyles = {
  COMPLETED: "bg-emerald-500/15 text-emerald-400",
  FAILED: "bg-red-500/15 text-red-400",
  PROCESSING: "bg-blue-500/15 text-blue-400 animate-pulse",
};

const statusLabel = {
  COMPLETED: "Indexed",
  FAILED: "Failed",
  PROCESSING: "Processing",
};

const Sidebar = () => {
  const { documents, setDocuments, selectedDocument, setSelectedDocument } =
    useDocument();

  const { conversation, setConversation, conversations, setConversations } =
    useConversation();
  const { setMessages } = useChat();
  const { user, logout } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const res = await getDocuments();

        setDocuments(res.documents);
      } catch (err) {
        console.error(err);
      }
    };

    loadDocuments();

    const interval = setInterval(loadDocuments, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectDocument = async (doc) => {
    if (doc.status !== "COMPLETED") {
      toast("📄 This document is still processing.", {
        icon: "⏳",
      });
      return;
    }

    try {
      setSelectedDocument(doc);

      const res = await getConversations(doc._id);

      setConversations(res.conversations);

      if (res.conversations.length > 0) {
        const firstConversation = res.conversations[0];

        setConversation(firstConversation);

        const history = await getMessages(firstConversation._id);

        setMessages(history.messages);
      } else {
        const created = await createConversation(doc._id, "New Chat");

        setConversation(created.conversation);

        setConversations([created.conversation]);
        toast.success("New chat created.");

        setMessages([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    if (!confirm("Delete this conversation?")) return;

    try {
      await deleteConversation(conversationId);

      toast.success("Conversation deleted.");
      const updated = conversations.filter(
        (conv) => conv._id !== conversationId,
      );

      setConversations(updated);

      if (conversation?._id === conversationId) {
        if (updated.length > 0) {
          setConversation(updated[0]);

          const history = await getMessages(updated[0]._id);
          setMessages(history.messages);
        } else {
          setConversation(null);
          setMessages([]);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete conversation.");
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside className="w-90 bg-zinc-950/40 backdrop-blur border-r border-zinc-800/80 flex flex-col">
      {/* Brand header */}
      <div className="h-16 border-b border-zinc-800/80 flex items-center px-5 gap-2.5 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold font-display shrink-0">
          D
        </div>
        <h1 className="text-base font-semibold font-display tracking-tight text-white">
          DocuMind
        </h1>
      </div>

      {/* User chip */}
      <div className="px-5 py-3 border-b border-zinc-800/80 flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-semibold shrink-0">
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-white truncate">{user?.name}</p>
          <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          title="Log out"
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-red-400 transition"
        >
          <LogOut size={15} />
        </button>
      </div>

      <div className="p-5 border-b border-zinc-800/80">
        <UploadButton />
      </div>

      <div className="flex-1 overflow-y-auto p-5 min-h-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
            Documents
          </h2>
          {documents.length > 0 && (
            <span className="text-[10px] text-zinc-600">
              {documents.length} file{documents.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition"
          />
        </div>

        <div className="space-y-2">
          {documents.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <FileText size={36} className="mx-auto mb-3 opacity-50" />

              <p className="font-medium">No documents yet</p>

              <p className="text-xs mt-1">
                Upload your first PDF to start chatting.
              </p>
            </div>
          ) : (
            documents.map((doc) => (
              <div key={doc._id} className="space-y-2">
                {/* Document */}
                <button
                  onClick={() => handleSelectDocument(doc)}
                  disabled={doc.status !== "COMPLETED"}
                  className={`w-full rounded-xl p-3 flex items-center gap-3 transition border ${
                    selectedDocument?._id === doc._id
                      ? "bg-gradient-to-r from-blue-500 to-violet-600 border-blue-400/30 shadow-lg shadow-blue-900/30"
                      : "bg-zinc-900/60 border-zinc-800/60 hover:bg-zinc-800/80 hover:border-zinc-700"
                  } ${
                    doc.status !== "COMPLETED"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                      selectedDocument?._id === doc._id
                        ? "bg-white/15"
                        : "bg-blue-500/10"
                    }`}
                  >
                    <FileText
                      size={15}
                      className={
                        selectedDocument?._id === doc._id
                          ? "text-white"
                          : "text-blue-400"
                      }
                    />
                  </span>

                  <span
                    className="truncate flex-1 text-left"
                    title={doc.originalName}
                  >
                    {doc.originalName}
                  </span>

                  <span
                    className={`status-pill ${
                      statusStyles[doc.status] ?? "bg-zinc-500/15 text-zinc-400"
                    }`}
                  >
                    {statusLabel[doc.status] ?? doc.status}
                  </span>
                </button>

                {/* Conversations */}
                {selectedDocument?._id === doc._id && (
                  <div className="ml-5 mt-2 border-l border-zinc-800 pl-4 py-1 space-y-1">
                    {filteredConversations.length === 0 &&
                    searchQuery.trim() !== "" ? (
                      <p className="text-sm text-zinc-500 px-3 py-2">
                        No conversations found.
                      </p>
                    ) : (
                      filteredConversations.map((conv) => (
                        <div
                          key={conv._id}
                          className={`group flex items-center justify-between rounded-lg px-3 py-2 transition ${
                            conversation?._id === conv._id
                              ? "bg-blue-600/90 text-white"
                              : "hover:bg-zinc-800/70 text-zinc-300"
                          }`}
                        >
                          <button
                            onClick={async () => {
                              setConversation(conv);

                              const history = await getMessages(conv._id);
                              setMessages(history.messages);
                            }}
                            className="flex items-center gap-2 flex-1 text-left"
                          >
                            <MessageSquare size={14} />
                            {editingId === conv._id ? (
                              <input
                                autoFocus
                                value={editingTitle}
                                onChange={(e) =>
                                  setEditingTitle(e.target.value)
                                }
                                onBlur={() => setEditingId(null)}
                                onKeyDown={async (e) => {
                                  if (e.key === "Enter") {
                                    try {
                                      const res = await renameConversation(
                                        conv._id,
                                        editingTitle,
                                      );

                                      setConversations((prev) =>
                                        prev.map((c) =>
                                          c._id === conv._id
                                            ? res.conversation
                                            : c,
                                        ),
                                      );

                                      if (conversation?._id === conv._id) {
                                        setConversation(res.conversation);
                                      }

                                      setEditingId(null);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }
                                }}
                                className="bg-transparent outline-none flex-1"
                              />
                            ) : (
                              <span
                                className="truncate flex-1"
                                onDoubleClick={() => {
                                  setEditingId(conv._id);
                                  setEditingTitle(conv.title);
                                }}
                              >
                                {conv.title}
                              </span>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteConversation(conv._id);
                            }}
                            className="ml-2 p-1 rounded hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))
                    )}
                    <button
                      onClick={async () => {
                        const created = await createConversation(
                          doc._id,
                          `Chat ${conversations.length + 1}`,
                        );

                        setConversations((prev) => [
                          created.conversation,
                          ...prev,
                        ]);

                        setConversation(created.conversation);
                        setMessages([]);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-blue-400 hover:bg-zinc-800/70 transition"
                    >
                      <Plus size={14} />
                      <span>New Chat</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800/80 p-4 text-center shrink-0">
        <p className="text-xs text-zinc-500 font-display font-medium">
          DocuMind v1.0
        </p>

        <p className="text-[10px] text-zinc-600 mt-1">
          AI-powered PDF Learning Assistant
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
