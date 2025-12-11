import { useState, useRef, useEffect } from "react";
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
  const [, setLeftMatch] = useState<number | null>(null);
  const [, setRightMatch] = useState<number | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera when ready
  useEffect(() => {
    if (!ready) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" } // back camera
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Check if torch is supported
        const track = streamRef.current?.getVideoTracks()[0];
        if (track) {
          const capabilities = track.getCapabilities() as any;
          if (capabilities.torch) {
            console.log("Torch is supported!");
            setTorchSupported(true);
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      // Stop camera when component unmounts
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [ready]);

  const toggleFlash = async (on: boolean) => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (track && torchSupported) {
      try {
        await track.applyConstraints({ advanced: [{ torch: on } as any] });
        setFlashOn(on);
      } catch (err) {
        console.error("Failed to toggle flash:", err);
      }
    }
  };

  const captureLeftHand = () => {
    setLeftHandImg("https://via.placeholder.com/400x300?text=Left+Hand");
    setLeftMatch(90 + Math.floor(Math.random() * 5));
    setPhase("right");
  };

  const captureRightHand = () => {
    setRightHandImg("https://via.placeholder.com/400x300?text=Right+Hand");
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
    <section className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Full-screen camera */}
      {!leftHandImg || !rightHandImg ? (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

          {/* Flash toggle button */}
          {torchSupported && (
            <button onClick={() => toggleFlash(!flashOn)} className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full">
              {flashOn ? "💡 Off" : "💡 On"}
            </button>
          )}

          {/* Overlay UI */}
          <div className="absolute bottom-6 w-full px-4 flex flex-col gap-3">
            <h2 className="text-white text-lg text-center mb-2">Fingerprint Capture ({phase === "left" ? "Left Hand" : "Right Hand"})</h2>
            <p className="text-white text-center text-sm mb-2">Show your full hand with all fingers clearly visible.</p>

            {phase === "left" && !leftHandImg && (
              <button onClick={captureLeftHand} className="w-full py-3 bg-purple-600 text-white rounded-lg">
                Capture Left Hand
              </button>
            )}

            {phase === "right" && !rightHandImg && (
              <button onClick={captureRightHand} className="w-full py-3 bg-purple-600 text-white rounded-lg">
                Capture Right Hand
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-black">
          <div className="w-full h-1/2 rounded-lg border bg-gray-200 flex items-center justify-center">Left Hand Placeholder</div>
          <div className="w-full h-1/2 rounded-lg border bg-gray-200 flex items-center justify-center">Right Hand Placeholder</div>

          <div className="w-full flex flex-col gap-2 mt-4">
            <button onClick={() => setStep("face")} className="w-full py-3 bg-purple-600 text-white rounded-lg">
              Continue to Face (Optional)
            </button>
            <button onClick={() => setTab("home")} className="w-full py-3 bg-purple-600 text-white rounded-lg">
              Go to Wallet
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Fingerprint;
