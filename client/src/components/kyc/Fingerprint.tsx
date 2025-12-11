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

  useEffect(() => {
    if (!ready) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" } // back cam
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Torch capability check
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) {
          setTorchSupported(true);
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [ready]);

  const toggleFlash = async (on: boolean) => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track || !torchSupported) return;

    try {
      await track.applyConstraints({
        advanced: [{ torch: on } as any]
      });
      setFlashOn(on);
    } catch (err) {
      console.error("Flash toggle error:", err);
    }
  };

  const refocusCamera = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;

    await track.applyConstraints({
      advanced: [{ focusMode: "continuous" } as any]
    });
  };

  useEffect(() => {
    setTimeout(() => {
      refocusCamera();
    }, 500);
  }, []);

  const captureLeftHand = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");

    setLeftHandImg(dataUrl);
    setLeftMatch(90 + Math.floor(Math.random() * 5));
    setPhase("right");
  };

  const captureRightHand = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");

    setRightHandImg(dataUrl);
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
      {!leftHandImg || !rightHandImg ? (
        <>
          {/* Camera Feed */}
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

          {/* Hand Placement Marker */}
          <div className={`absolute ${phase === "left" ? "left-0" : "right-0"}  mb-8 flex items-center justify-center pointer-events-none`}>
            <div
              className={`
                w-92 h-120 
                border-4 border-white/70
                ${phase === "left" ? "rounded-tr-[5rem] rounded-br-[5rem]" : "rounded-tl-[5rem] rounded-bl-[5rem]"} 
 
                border-dashed 
                bg-white/5 
                backdrop-blur-[1px]
                flex flex-col items-center justify-center
                animate-pulse
              `}
            >
              <span className="text-white text-sm opacity-90">Place your {phase === "left" ? "left" : "right"} hand here</span>
            </div>
          </div>

          {/* Distance Instruction */}
          <div className="absolute top-6 w-full text-center">
            <span className="text-yellow-300 text-sm drop-shadow">Move your hand closer to the frame</span>
          </div>

          {/* Flash Toggle */}
          {torchSupported && (
            <button onClick={() => toggleFlash(!flashOn)} className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full">
              {flashOn ? "💡 Off" : "💡 On"}
            </button>
          )}

          {/* Bottom UI */}
          <div className="absolute bottom-6 w-full px-4 flex flex-col gap-3">
            <p className="text-white text-center text-sm mb-2">Align your four fingers inside the frame.</p>

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
          {/* Display captured images */}
          <div className="w-full h-1/2 rounded-lg border bg-gray-200 flex items-center justify-center overflow-hidden">
            {leftHandImg && <img src={leftHandImg} alt="Left Hand" className="w-full h-full object-contain" />}
          </div>

          <div className="w-full h-1/2 rounded-lg border bg-gray-200 flex items-center justify-center overflow-hidden">
            {rightHandImg && <img src={rightHandImg} alt="Right Hand" className="w-full h-full object-contain" />}
          </div>

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
