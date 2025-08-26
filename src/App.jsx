import { AuthProvider } from "./auth/AuthContext";
import AuthRoutes from "./auth/AuthRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => (
  <>
    <AuthRoutes />
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      closeOnClick
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
