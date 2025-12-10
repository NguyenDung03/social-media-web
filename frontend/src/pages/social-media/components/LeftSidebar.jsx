import Home from "@/assets/home.svg?react"; //ko sai
import Search from "@/assets/search.svg?react"; //ko sai
import Heart from "@/assets/heart.svg?react"; //ko sai
import Create from "@/assets/create.svg?react"; //ko sai
import Explore from "@/assets/explore.svg?react"; //ko sai
import Messenger from "@/assets/messenger.svg?react"; //ko sai

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth.store.js";
import { useChatStore } from "@/store/chat.store.js";
import { useNavigate } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import { useState } from "react";

const LeftSidebar = () => {
  const { authUser } = useAuthStore();
  const { setLogoutModalOpen } = useChatStore();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      setLogoutModalOpen(true);
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${authUser?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat-page");
    }
  };

  const sidebarItems = [
    { icon: <Home width={24} height={24} />, text: "Home" },
    { icon: <Search width={24} height={24} />, text: "Search" }, //chua co logic
    { icon: <Explore width={24} height={24} />, text: "Explore" }, //chua co logic
    { icon: <Messenger width={24} height={24} />, text: "Messages" },
    { icon: <Heart width={24} height={24} />, text: "Notifications" },
    { icon: <Create width={24} height={24} />, text: "Create" },
    {
      icon: (
        <Avatar width={24} height={24} className="w-6 h-6">
          <AvatarImage
            src={authUser?.profilePic || "/avatar.png"}
            alt="@shadcn"
          />
          <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut width={24} height={24} />, text: "Logout" },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="w-64  border-gray-800 p-4 flex flex-col">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-auto object-contain object-center mb-5 mt-6"
            style={{ aspectRatio: "auto" }}
          />
        </h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
