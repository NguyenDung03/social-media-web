import { useEffect } from "react";
import { useChatStore } from "../store/chat.store.js";
import NoChatsFound from "./NoChatsFound.jsx";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";

const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div>
      {chats.map((chat) => (
        <div
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/**logic online offline dua tren socketio */}
            <div
            // className={`avatar ${
            //   onlineUsers.includes(chat._id) ? "online" : "offline"
            // }`}
            >
              <div className="size-14 object-cover rounded-full overflow-hidden">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
