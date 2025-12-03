import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WalletProvider from "./providers/WalletProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </WalletProvider>
);
