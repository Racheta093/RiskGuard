import { createContext, useContext, useState } from "react";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null); // "quiz" | "flashcards" | null
  const [requestedCount, setRequestedCount] = useState(10);

  const openQuiz = (count = 10) => {
    setRequestedCount(count);
    setActiveModal("quiz");
  };

  const openFlashcards = (count = 12) => {
    setRequestedCount(count);
    setActiveModal("flashcards");
  };

  const closeModal = () => setActiveModal(null);

  return (
    <StudyContext.Provider
      value={{
        activeModal,
        requestedCount,
        openQuiz,
        openFlashcards,
        closeModal,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
