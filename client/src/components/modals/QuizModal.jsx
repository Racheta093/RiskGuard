import { useEffect, useState } from "react";
import { X, CircleHelp, Check, XCircle, RotateCcw } from "lucide-react";

import { useStudy } from "../../context/StudyContext";
import { useConversation } from "../../context/ConversationContext";
import { generateQuiz as fetchQuiz } from "../../services/ai.service";
import ModalShell from "./ModalShell";

const letters = ["A", "B", "C", "D"];

const QuizModal = () => {
  const { activeModal, requestedCount, closeModal } = useStudy();
  const { conversation } = useConversation();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOpen = activeModal === "quiz";

  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      setIndex(0);
      setFinished(false);

      try {
        const res = await fetchQuiz(conversation._id, requestedCount);
        const qs = res.quiz || [];
        setQuestions(qs);
        setAnswers(new Array(qs.length).fill(null));
      } catch (err) {
        console.error(err);
        setError("Couldn't generate a quiz from this document. Try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isOpen]);

  if (!isOpen) return null;

  const question = questions[index];
  const selected = answers[index];

  const selectOption = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  };

  const handleRetake = () => {
    setAnswers(new Array(questions.length).fill(null));
    setIndex(0);
    setFinished(false);
  };

  const score = answers.reduce(
    (total, ans, i) => (ans === questions[i]?.correctIndex ? total + 1 : total),
    0,
  );

  return (
    <ModalShell onClose={closeModal} widthClass="max-w-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <CircleHelp size={16} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold font-display text-white leading-tight">
              Quiz
            </p>
            {!finished && questions.length > 0 && (
              <p className="text-[11px] text-zinc-500">
                Question {index + 1} of {questions.length}
              </p>
            )}
            {finished && <p className="text-[11px] text-zinc-500">Results</p>}
          </div>
        </div>

        <button
          onClick={closeModal}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress bar */}
      {!finished && questions.length > 0 && (
        <div className="h-1 bg-zinc-900">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
      )}

      {/* Body */}
      <div className="px-6 py-7 min-h-[300px]">
        {loading && (
          <div className="flex items-center justify-center h-full gap-2 text-zinc-400 text-sm py-16">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
            <span className="ml-2">Generating quiz...</span>
          </div>
        )}

        {!loading && error && (
          <p className="text-sm text-red-400 text-center py-16">{error}</p>
        )}

        {!loading && !error && !finished && question && (
          <>
            <p className="text-lg font-medium font-display text-white leading-snug mb-5">
              {question.question}
            </p>

            <div className="space-y-2.5">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => selectOption(optionIndex)}
                  className={`w-full flex items-center gap-3 text-left rounded-xl border px-4 py-3 transition ${
                    selected === optionIndex
                      ? "bg-blue-600/15 border-blue-500 text-white"
                      : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-semibold shrink-0 ${
                      selected === optionIndex
                        ? "bg-blue-500 border-blue-500 text-zinc-950"
                        : "border-zinc-700 text-zinc-500"
                    }`}
                  >
                    {letters[optionIndex]}
                  </span>
                  <span className="text-sm">{option}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {!loading && !error && finished && (
          <div>
            <div className="text-center mb-6">
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                Score
              </p>
              <p className="text-4xl font-bold font-display text-white">
                {score}/{questions.length}
              </p>
            </div>

            <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-3">
              Review
            </p>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correctIndex;
                return (
                  <div
                    key={i}
                    className="rounded-lg bg-zinc-900/60 border border-zinc-800/60 px-3.5 py-3"
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <Check
                          size={15}
                          className="text-emerald-400 mt-0.5 shrink-0"
                        />
                      ) : (
                        <XCircle
                          size={15}
                          className="text-red-400 mt-0.5 shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm text-zinc-200 mb-1">
                          {q.question}
                        </p>
                        <p className="text-xs text-zinc-500">
                          Correct answer:{" "}
                          <span className="text-zinc-300">
                            {letters[q.correctIndex]}.{" "}
                            {q.options[q.correctIndex]}
                          </span>
                        </p>
                        {!isCorrect && answers[i] !== null && (
                          <p className="text-xs text-red-400/80 mt-0.5">
                            Your answer: {letters[answers[i]]}.{" "}
                            {q.options[answers[i]]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && !error && !finished && !question && (
          <p className="text-sm text-zinc-500 text-center py-16">
            No questions were generated. Try again.
          </p>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && questions.length > 0 && (
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          {finished ? (
            <>
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white transition"
              >
                <RotateCcw size={14} />
                Retake
              </button>
              <button
                onClick={closeModal}
                className="bg-blue-600 hover:bg-blue-500 transition rounded-full px-5 py-2 text-sm font-medium"
              >
                End
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              disabled={selected === null || selected === undefined}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition rounded-full px-5 py-2 text-sm font-medium"
            >
              {index === questions.length - 1 ? "Finish" : "Next"}
            </button>
          )}
        </div>
      )}
    </ModalShell>
  );
};

export default QuizModal;
