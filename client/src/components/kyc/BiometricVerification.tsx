import { useState } from "react";
import FaceCapture from "./FaceCapture";
import Fingerprint from "./Fingerprint";
import { CheckCircle, ScanFace, Fingerprint as FingerprintIcon, ChevronLeft, ChevronRight } from "lucide-react";
import type { Step } from "../../types/KycFlowTypes";

type Props = {
  setMainStep: React.Dispatch<React.SetStateAction<Step>>;
};

type BiometricStep = "main" | "face" | "fingerprint";

const BiometricVerification = ({ setMainStep }: Props) => {
  const [step, setStep] = useState<BiometricStep>("main");

  const [faceCompleted, setFaceCompleted] = useState(false);
  const [fingerCompleted, setFingerCompleted] = useState(false);

  const [capturedFace, setCapturedFace] = useState<string | null>(null);

  // when both biometrics done
  const allDone = faceCompleted && fingerCompleted;

  if (step === "face") {
    return (
      <FaceCapture
        capturedFace={capturedFace}
        setCapturedFace={setCapturedFace}
        finalizeVerification={() => {
          setFaceCompleted(true);
          setStep("main");
        }}
      />
    );
  }

  if (step === "fingerprint") {
    return (
      <Fingerprint
        finalizeVerification={() => {
          setFingerCompleted(true);
          setStep("main");
        }}
      />
    );
  }

  // MAIN SCREEN
  return (
    <section className="font-poppins">
      <div className="relative mb-6 flex items-center justify-between">
        {/* Left chevron */}
        <button onClick={() => setMainStep("cnic")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={24} />
        </button>

        {/* Title and subtitle */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-center mb-1">Biometric Verification</h2>
          <p className="text-sm text-neutral-600 text-center">Please verify your identity</p>
        </div>

        {/* Right chevron placeholder (invisible for centering) */}
        <div onClick={() => setMainStep("complete")} className="p-2">
          <ChevronRight size={24} />
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        {/* FACE */}
        <button disabled={faceCompleted} onClick={() => setStep("face")} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <ScanFace className="w-6 h-6 text-green-600" />
            <span className="font-medium">Face Verification</span>
          </div>

          {faceCompleted ? <CheckCircle className="text-green-500" /> : <span className="text-sm text-neutral-500">Pending</span>}
        </button>

        {/* FINGERPRINT */}
        <button onClick={() => setStep("fingerprint")} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <FingerprintIcon className="w-6 h-6 text-green-600" />
            <span className="font-medium text-sm">Fingerprint Verification</span>
          </div>

          {fingerCompleted ? <CheckCircle className="text-green-500" /> : <span className="text-sm text-neutral-500">Pending</span>}
        </button>
      </div>

      {/* CONTINUE */}
      {allDone && (
        <button onClick={() => setMainStep("complete")} className="w-full mt-8 py-3 bg-green-600 text-white rounded-lg font-medium">
          Continue
        </button>
      )}
    </section>
  );
};

export default BiometricVerification;
