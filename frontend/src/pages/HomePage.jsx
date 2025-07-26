import { useChatStore } from "../store/useChatStore.js";

import NoChatSelected from "../components/NoChatSelected";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-2 md:px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* users list */}
            <Sidebar />

            {/* show messages */}
            {!selectedUser ? <NoChatSelected /> : <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
