import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppFixed from "./AppFixed.jsx";
import { AuthProvider } from "./components/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppFixed />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

