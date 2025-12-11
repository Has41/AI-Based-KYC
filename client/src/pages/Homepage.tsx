import React, { type Dispatch, type SetStateAction } from "react";
import FeaturesSection from "../components/website/FeaturesSection";
import TechStack from "../components/website/TechStack";
import Architecture from "../components/website/Architecture";
import Workflow from "../components/website/Workflow";
import Footer from "../components/website/Footer";
import HeroSection from "../components/website/HeroSection";

type ViewType = "home" | "kyc";

type SetViewType = Dispatch<SetStateAction<ViewType>>;

interface HomepageProps {
  setView: SetViewType;
}

const Homepage: React.FC<HomepageProps> = ({ setView }) => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-poppins">
      <HeroSection setView={setView} />
      <FeaturesSection />
      <Workflow />
      <TechStack />
      <Architecture />
      <Footer />
    </div>
  );
};

export default Homepage;
