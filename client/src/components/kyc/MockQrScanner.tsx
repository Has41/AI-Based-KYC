import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";

const MockQrScanner = ({ onBack }: { onBack: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  // Start back camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Torch check
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) setTorchSupported(true);
      } catch (err) {
        console.error("Error accessing back camera:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Toggle flash
  const toggleFlash = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (track && torchSupported) {
      try {
        await track.applyConstraints({ advanced: [{ torch: !flashOn } as any] });
        setFlashOn(!flashOn);
      } catch (err) {
        console.error("Failed to toggle flash:", err);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* BACK BUTTON */}
      <button onClick={onBack} className="absolute top-5 left-5 z-20 bg-black/50 p-2 rounded-full">
        <ArrowLeft size={24} />
      </button>

      {/* FLASHLIGHT */}
      {torchSupported && (
        <button onClick={toggleFlash} className="absolute top-5 right-5 z-20 bg-black/50 p-2 rounded-full">
          <Zap size={24} className={flashOn ? "text-yellow-400" : "text-white"} />
        </button>
      )}

      {/* CAMERA FEED */}
      <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* SCAN FRAME */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 border-2 border-green-400 rounded-xl" />
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-xl" />
        </div>
      </div>

      {/* TEXT */}
      <div className="absolute bottom-40 w-full text-center text-lg font-medium text-white">Align the QR code inside the box</div>

      {/* BOTTOM CARD */}
      <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-lg py-5 px-6 text-white">
        <p className="font-semibold text-lg">Scan to Earn / Redeem Points</p>
        <p className="text-gray-300 text-sm">Point system will automatically detect the shop’s QR code.</p>
      </div>
    </div>
  );
};

export default MockQrScanner;
