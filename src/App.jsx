import "./App.css";
import PublicRoute from "./routes/PublicRoute";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/Layout/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
function App() {
  return (
    <HelmetProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          transition={Slide}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            backgroundColor: "white",
            color: "#1f2937",
            fontWeight: "500",
          }}
          progressStyle={{
            backgroundColor: "#f97316",
          }}
        />
        <ScrollToTop />
        <PublicRoute />
    </HelmetProvider>
  );
}

export default App;