import { useChat } from "../../context/ChatContext";

const PromptCard = ({ title, icon, prompt }) => {
  const { setInput } = useChat();

  return (
    <button
      onClick={() => setInput(prompt)}
      className="
        p-5
        rounded-xl
        bg-zinc-900/60
        hover:bg-blue-600
        transition-all
        duration-300
        text-left
        border
        border-zinc-800/60
        hover:border-blue-500
      "
    >
      <p className="text-2xl mb-2">{icon}</p>

      <p className="font-medium text-white">{title}</p>
    </button>
  );
};

export default PromptCard;