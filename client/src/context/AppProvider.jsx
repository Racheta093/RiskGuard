import { AuthProvider } from "./AuthContext";
import { DocumentProvider } from "./DocumentContext";
import { ConversationProvider } from "./ConversationContext";
import { ChatProvider } from "./ChatContext";
import { StudyProvider } from "./StudyContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <DocumentProvider>
        <ConversationProvider>
          <ChatProvider>
            <StudyProvider>{children}</StudyProvider>
          </ChatProvider>
        </ConversationProvider>
      </DocumentProvider>
    </AuthProvider>
  );
};

export default AppProvider;
