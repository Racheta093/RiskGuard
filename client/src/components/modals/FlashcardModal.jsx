import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, RotateCcw, Layers3 } from "lucide-react";

import { useStudy } from "../../context/StudyContext";
import { useConversation } from "../../context/ConversationContext";
import { generateFlashcards as fetchFlashcards } from "../../services/ai.service";
import ModalShell from "./ModalShell";

const FlashcardModal = () => {
  const { activeModal, requestedCount, closeModal } = useStudy();
  const { conversation } = useConversation();

  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOpen = activeModal === "flashcards";

  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      setIndex(0);
      setFlipped(false);

      try {
        const res = await fetchFlashcards(conversation._id, requestedCount);
        setCards(res.flashcards || []);
      } catch (err) {
        console.error(err);
        setError("Couldn't generate flashcards from this document. Try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isOpen]);

  if (!isOpen) return null;

  const card = cards[index];

  const handleNext = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, cards.length - 1));
  };

  const handlePrevious = () => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <ModalShell onClose={closeModal}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Layers3 size={16} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold font-display text-white leading-tight">
              Flashcards
            </p>
            {cards.length > 0 && (
              <p className="text-[11px] text-zinc-500">
                Card {index + 1} of {cards.length}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={closeModal}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-8 min-h-[260px] flex flex-col items-center justify-center text-center">
        {loading && (
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
            <span className="ml-2">Generating flashcards...</span>
          </div>
        )}

        {!loading && error && <p className="text-sm text-red-400">{error}</p>}
        {!loading && !error && !card && (
          <p className="text-sm text-zinc-500">
            No flashcards were generated. Try again.
          </p>
        )}

        {!loading && !error && card && (
          <>
            <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-3">
              Question
            </p>
            <p className="text-xl font-medium font-display text-white leading-snug mb-6">
              {card.question}
            </p>

            <div className="w-full border-t border-zinc-800 mb-6" />

            {flipped ? (
              <div className="w-full">
                <p className="text-[11px] uppercase tracking-widest text-blue-500 font-semibold mb-2">
                  Answer
                </p>
                <p className="text-zinc-200 leading-relaxed">{card.answer}</p>
              </div>
            ) : (
              <button
                onClick={() => setFlipped(true)}
                className="bg-blue-600 hover:bg-blue-500 transition rounded-full px-5 py-2 text-sm font-medium"
              >
                Show Answer
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && cards.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
          <button
            onClick={handlePrevious}
            disabled={index === 0}
            className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {index === cards.length - 1 ? (
            <button
              onClick={() => {
                setIndex(0);
                setFlipped(false);
              }}
              className="flex items-center gap-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 transition rounded-full px-4 py-1.5"
            >
              <RotateCcw size={14} />
              Restart
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition"
            >
              Next
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </ModalShell>
  );
};

export default FlashcardModal;
