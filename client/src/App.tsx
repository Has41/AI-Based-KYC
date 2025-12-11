import { useState } from "react";
import Homepage from "./pages/Homepage";
import KycFlow from "./pages/KycFlow";

const App = () => {
  const [view, setView] = useState<"home" | "kyc">("home");

  return view === "home" ? <Homepage setView={setView} /> : <KycFlow />;
};

export default App;
