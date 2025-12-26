import { useState } from "react";
import CnicUpload from "../components/kyc/CnicUpload";
import type { Step, Tab } from "../types/KycFlowTypes";
import { useWallet } from "../hooks/useWallet";
import Wallet from "./Wallet";
import Rewards from "./Rewards";
import ReportDashboard from "./ReportDashboard";
import PersonalInfo from "../components/kyc/PersonalInfo";
import UserConsent from "../components/kyc/UserConsent";
import OTPVerification from "../components/kyc/OTPVerification";
import BiometricVerification from "../components/kyc/BiometricVerification";
import VerificationComplete from "../components/kyc/VerificationComplete";

const KycFlow = () => {
  const { createWallet, addPoints } = useWallet();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Ali Khan",
    dob: "",
    cnic: "33333-4444444-6",
    phone: ""
  });
  const [step, setStep] = useState<Step>("consent");
  const [tab, setTab] = useState<Tab>("not-active");

  const isMobile = window.innerWidth <= 600; // Mobile-only

  if (!isMobile) {
    return (
      <div className="h-screen w-full flex flex-col items-center font-poppins justify-center text-center p-6">
        <h1 className="text-2xl font-bold mb-3">Mobile View Required</h1>
        <p className="text-gray-600 max-w-sm">
          This demo is optimized for mobile devices only. Please open it on a phone or reduce your browser width.
        </p>
      </div>
    );
  }

  const finalizeVerification = () => {
    createWallet();
    addPoints(100, "Onboarding Bonus");
    // setStep("complete");
    setTab("home");
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center">
      {tab === "not-active" && step !== "consent" && step !== "complete" && (
        <div className="flex justify-between mb-8 gap-x-6 text-sm font-medium w-full max-w-xl">
          <span className={`${step === "personal" ? "text-green-600 font-bold" : "text-neutral-500"}`}>Step 1</span>
          <span className={`${step === "otp" ? "text-green-600 font-bold" : "text-neutral-500"}`}>Step 2</span>
          <span className={`${step === "cnic" ? "text-green-600 font-bold" : "text-neutral-500"}`}>Step 3</span>
          <span className={`${step === "biometric" ? "text-green-600 font-bold" : "text-neutral-500"}`}>Step 4</span>
        </div>
      )}

      {step === "consent" && <UserConsent setStep={setStep} />}

      {/* {tab === "not-active" && (
        <div className="mb-4 w-full flex items-center gap-x-2 max-w-xl px-4 py-2 bg-yellow-100 text-yellow-800 text-center text-sm rounded-lg">
          <Info className="text-yellow-600" />
          <p>Note: No data is saved during this demo.</p>
        </div>
      )} */}

      {tab === "not-active" && (
        <div className="py-8 w-full">
          {step === "personal" && <PersonalInfo setPersonalInfo={setPersonalInfo} personalInfo={personalInfo} setStep={setStep} />}
          {step === "otp" && <OTPVerification setStep={setStep} />}
          {step === "cnic" && <CnicUpload setStep={setStep} />}
          {step === "biometric" && <BiometricVerification setMainStep={setStep} />}
          {step === "complete" && <VerificationComplete finalizeVerification={finalizeVerification} />}
        </div>
      )}

      {tab === "home" && <Wallet setTab={setTab} />}
      {tab === "rewards" && <Rewards setTab={setTab} />}
      {tab === "dashboard" && <ReportDashboard />}
    </main>
  );
};

export default KycFlow;
