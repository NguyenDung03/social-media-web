import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useAuthStore } from "./store/auth.store.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/loads/PageLoader.jsx";
import BackgroundEffect from "./components/BackgroundEffect.jsx";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GLOW SHAPES */}
      <div className="absolute top-10 left-10 size-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-10 right-10 size-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-pink-500/10 rounded-full blur-[150px]" />
      <div
        className="absolute top-1/3 right-1/4 size-[400px] bg-blue-500/15 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      {/* BACKGROUND EFFECT */}
      <BackgroundEffect type="particles" />
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
