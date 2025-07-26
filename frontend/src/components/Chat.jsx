import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { avatar } from "../assets";
import { formatMessageTime } from "../lib/utils.js";

const Chat = () => {
  const { messages, selectedUser, isMessagesLoading, getMessages, subscribeMessages, unSubscribeMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    /**
     * Realtime messageing
     */
    subscribeMessages();

    return () => unSubscribeMessages();
  }, [selectedUser._id, getMessages, subscribeMessages, unSubscribeMessages]);

  useEffect(() => {
    if ( scrollRef.current && messages ) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="p-2 md:p-4 overflow-y-auto flex-1 space-y-4">
        {messages.length ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              {/* profile pic for sender or recvier */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || avatar
                        : selectedUser.profilePic || avatar
                    }
                    className="object-top"
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* message time */}
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* message content */}
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            Start conversation with {selectedUser.fullName}
          </p>
        )}

        <div ref={scrollRef} />
      </div>

      <ChatInput />
    </div>
  );
};

export default Chat;
