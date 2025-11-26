import { useAuthStore } from "./store/auth.store.js";
import { useEffect } from "react";
import PageLoader from "./components/loads/PageLoader.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import LogoutModal from "./components/modals/LogoutModal.jsx";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <RouterProvider router={routes} />
      <LogoutModal />
    </>
  );
}
export default App;
