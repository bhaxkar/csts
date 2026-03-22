import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "./Context/ThemeContext.tsx";
import { TicketContextProvider } from "./Context/TicketContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TicketContextProvider>
      <ThemeContextProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
      </ThemeContextProvider>
    </TicketContextProvider>
  </StrictMode>
);