import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Loader2 } from "lucide-react";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { sendMessage, isMessageSending } = useChatStore();

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
  };

  const HandleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedImage) return;
    
    try {
      const formData = new FormData();
      text && formData.append("text", text);
      selectedImage && formData.append("image", selectedImage);

      await sendMessage(formData);

      setText("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-2 md:p-4 w-full">
      {/* Selected image preview & cancel section */}
      {selectedImage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={HandleRemoveImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center cursor-pointer"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message send input section */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          {/* text imput */}
          <input
            type="text"
            className="w-full outline-none border border-zinc-200 px-2 md:px-4 rounded-lg"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* file input */}
          <label
            htmlFor="send-image"
            type="button"
            className={`bg-base-200 p-2 rounded-full cursor-pointer hover:scale-105 transition-all ${
              selectedImage ? "text-emerald-500" : "text-zinc-400"
            }`}
          >
            <Image size={22} />

            <input
              type="file"
              id="send-image"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-base-200 p-2 rounded-full text-zinc-400 cursor-pointer hover:scale-105 transition-all"
          disabled={!text.trim() && !selectedImage}
        >
          {isMessageSending ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} />}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
