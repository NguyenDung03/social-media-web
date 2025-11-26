import { LogOut } from "lucide-react";
import { useChatStore } from "../../store/chat.store";

const LogoutButton = () => {
  const { setLogoutModalOpen } = useChatStore();

  return (
    <button
      className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
      onClick={() => setLogoutModalOpen(true)}
    >
      <LogOut className="size-5" />
    </button>
  );
};

export default LogoutButton;
