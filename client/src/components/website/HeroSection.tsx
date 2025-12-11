import type { Dispatch, SetStateAction } from "react";
import heroBg from "../../assets/hero-bg.jpg";

type ViewType = "home" | "kyc";

type SetViewType = Dispatch<SetStateAction<ViewType>>;

interface HeroSectionProps {
  setView: SetViewType;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setView }) => {
  return (
    <section className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Navbar */}
      <nav className="w-full py-4 relative z-20 px-6 flex justify-between items-center top-0">
        <h1 className="text-2xl font-bold text-purple-600">KYC System</h1>
        <button onClick={() => setView("kyc")} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          Get Started
        </button>
      </nav>

      {/* Hero Content */}
      <section className="w-full h-screen gap-y-4 flex flex-col items-center justify-center text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Automated KYC Verification</h2>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow">
          Fast, secure and reliable Know Your Customer (KYC) system built for modern businesses.
        </p>
        <button
          onClick={() => setView("kyc")}
          className="mt-6 bg-purple-600 cursor-pointer text-white px-6 py-3 rounded-md text-lg shadow-md hover:opacity-90"
        >
          Start Verification
        </button>
      </section>
    </section>
  );
};

export default HeroSection;
