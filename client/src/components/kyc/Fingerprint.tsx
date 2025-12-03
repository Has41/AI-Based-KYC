import { useState } from "react";
import type { Step, Tab } from "../../types/KycFlowTypes";

type FingerprintProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Fingerprint = ({ setStep, setTab }: FingerprintProps) => {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"left" | "right">("left");
  const [leftHandImg, setLeftHandImg] = useState<string | null>(null);
  const [rightHandImg, setRightHandImg] = useState<string | null>(null);
  const [_, setLeftMatch] = useState<number | null>(null);
  const [, setRightMatch] = useState<number | null>(null);

  // Mock image URLs for demo
  const mockLeftHand = "https://via.placeholder.com/400x300?text=Left+Hand";
  const mockRightHand = "https://via.placeholder.com/400x300?text=Right+Hand";

  const captureLeftHand = () => {
    setLeftHandImg(mockLeftHand);
    setLeftMatch(90 + Math.floor(Math.random() * 5));
    setPhase("right");
  };

  const captureRightHand = () => {
    setRightHandImg(mockRightHand);
    setRightMatch(88 + Math.floor(Math.random() * 5));
  };

  if (!ready) {
    return (
      <section className="p-4 text-center font-poppins">
        <h2 className="text-xl font-semibold mb-2">Fingerprint Capture</h2>
        <p className="text-sm text-neutral-600 mb-4">We will now capture your fingerprints using your phone’s back camera.</p>
        <button onClick={() => setReady(true)} className="px-6 py-3 bg-purple-600 text-white rounded-lg">
          I'm Ready
        </button>
      </section>
    );
  }

  return (
    <section className="font-poppins">
      <h2 className="text-xl font-semibold mb-2">Fingerprint Capture ({phase === "left" ? "Left Hand" : "Right Hand"})</h2>
      <p className="text-sm text-neutral-600 mb-3">Show your full hand with all fingers clearly visible.</p>

      {!leftHandImg || !rightHandImg ? (
        <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center mb-3 text-gray-500 font-medium">Webcam Placeholder</div>

          {phase === "left" && !leftHandImg && (
            <button onClick={captureLeftHand} className="w-full mt-3 py-3 bg-purple-600 text-white rounded-lg">
              Capture Left Hand
            </button>
          )}

          {phase === "right" && !rightHandImg && (
            <button onClick={captureRightHand} className="w-full mt-3 py-3 bg-purple-600 text-white rounded-lg">
              Capture Right Hand
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-3">
            {/* {leftHandImg ? (
              <>
                <img src={leftHandImg} className="w-full rounded border mb-1" />
                <div className="text-green-600 text-sm">Left Match Score: {leftMatch}%</div>
              </>
            ) : ( */}
            <div className="w-full h-48 rounded border bg-gray-200 flex items-center justify-center mb-1 text-gray-500">Left Hand Placeholder</div>
            {/* )} */}
          </div>

          <div className="mb-3">
            {/* {rightHandImg ? (
              <>
                <img src={rightHandImg} className="w-full rounded border mb-1" />
                <div className="text-green-600 text-sm">Right Match Score: {rightMatch}%</div>
              </> */}
            {/* ) : ( */}
            <div className="w-full h-48 rounded border bg-gray-200 flex items-center justify-center mb-1 text-gray-500">Right Hand Placeholder</div>
            {/* )} */}
          </div>
        </>
      )}

      {leftHandImg && rightHandImg && (
        <button onClick={() => setStep("face")} className="w-full mt-3 py-3 bg-purple-600 text-white rounded-lg">
          Continue to Face (Optional)
        </button>
      )}

      {leftHandImg && rightHandImg && (
        <button onClick={() => setTab("home")} className="w-full mt-3 py-3 bg-purple-600 text-white rounded-lg">
          Go to Wallet
        </button>
      )}
    </section>
  );
};

export default Fingerprint;
