import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

interface ViewQrModalProps {
  walletId: string;
  fullName: string;
  tier: string;
  onClose: () => void;
  showCamera?: boolean; // optional prop to show camera
}

const ViewQrModal = ({ walletId, fullName, tier, onClose, showCamera = false }: ViewQrModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  useEffect(() => {
    if (!showCamera) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" } // back camera
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Check torch support
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) setTorchSupported(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [showCamera]);

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

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative shadow-xl animate-fadeIn flex flex-col items-center gap-4">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {showCamera ? (
          <>
            {/* Video Feed */}
            <div className="w-full rounded-xl overflow-hidden bg-gray-200 relative">
              <video ref={videoRef} autoPlay playsInline className="w-full h-60 object-cover" />
              {torchSupported && (
                <button onClick={toggleFlash} className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white">
                  {flashOn ? "💡 Off" : "💡 On"}
                </button>
              )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-1">Back Camera Active</p>
          </>
        ) : (
          <>
            {/* QR Code */}
            <h2 className="text-xl font-bold text-center mb-2">Your Wallet QR</h2>
            <p className="text-center text-gray-500 mb-4 text-sm">Show this QR at the store to earn loyalty points.</p>

            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-xl">
                {/* You can swap this with QRCodeCanvas if needed */}
                <div className="w-48 h-48 bg-white flex items-center justify-center text-gray-400">QR Placeholder</div>
              </div>
            </div>
          </>
        )}

        {/* User Info */}
        <div className="text-center">
          <p className="text-lg font-semibold">{fullName}</p>
          <p className="text-sm text-purple-600 font-medium mb-1">{tier} Tier</p>
          <p className="text-xs text-gray-500">Wallet ID: {walletId}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ViewQrModal;
