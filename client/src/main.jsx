import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProblemProvider } from "./context/problemContext.jsx";
import { SolutionProvider } from "./context/solutionContext.jsx";
import { LeaderboardProvider } from "./context/leaderboardContext.jsx";
import { DashProvider } from "./context/dashContext.jsx";
import { ChatProvider } from "./context/chatContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SolutionProvider>
        <ProblemProvider>
          <LeaderboardProvider>
            <DashProvider>
              <ChatProvider>
              <App />
              </ChatProvider>
            </DashProvider>
          </LeaderboardProvider>
        </ProblemProvider>
      </SolutionProvider>
    </AuthProvider>
  </BrowserRouter>,
);
