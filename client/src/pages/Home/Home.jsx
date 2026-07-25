import MainLayout from "../../components/Layout/MainLayout";
import ChatWindow from "../../components/Chat/ChatWindow";
import MessageInput from "../../components/Chat/MessageInput";
import FlashcardModal from "../../components/modals/FlashcardModal";
import QuizModal from "../../components/modals/QuizModal";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <ChatWindow />

        <MessageInput />
      </div>

      <FlashcardModal />
      <QuizModal />
    </MainLayout>
  );
};

export default Home;
