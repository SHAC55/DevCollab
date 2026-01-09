import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProblemProvider } from "./context/problemContext.jsx";
import { SolutionProvider } from "./context/solutionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SolutionProvider>
        <ProblemProvider>
          <App />
        </ProblemProvider>
      </SolutionProvider>
    </AuthProvider>
  </BrowserRouter>
);
