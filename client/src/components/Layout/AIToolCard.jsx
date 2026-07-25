import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";
import { useStudy } from "../../context/StudyContext";
import toast from "react-hot-toast";

const AIToolCard = ({ tool }) => {
  const { icon: Icon, title, action, prompt, count } = tool;

  const { conversation } = useConversation();
  const { sendMessage } = useChat();
  const { openQuiz, openFlashcards } = useStudy();

  const handleClick = async () => {
    if (!conversation) {
      toast.error("Select a document first.");
      return;
    }

    if (action === "quiz") {
      openQuiz(count);
      return;
    }

    if (action === "flashcards") {
      openFlashcards(count);
      return;
    }

    await sendMessage(prompt);
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex
        items-center
        gap-1.5
        shrink-0
        whitespace-nowrap
        rounded-full
        bg-zinc-900/70
        border
        border-zinc-800/60
        hover:bg-blue-600
        hover:border-blue-500
        transition
        px-3.5
        py-1.5
        text-xs
        font-medium
        text-zinc-300
        hover:text-white
      "
    >
      <Icon size={13} />
      <span>{title}</span>
    </button>
  );
};

export default AIToolCard;
