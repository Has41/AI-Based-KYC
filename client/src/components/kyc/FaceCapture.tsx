import { useState, useRef, useEffect } from "react";
import VerificationModal from "../common/VerificationModal";

const FaceCapture = ({ finalizeVerification }: { finalizeVerification: () => void }) => {
  const [ready, setReady] = useState(false);
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const faceMatchScore = 94; // placeholder score

  // Start front camera
  useEffect(() => {
    if (!ready) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" } // front camera
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Torch support check
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) setTorchSupported(true);
      } catch (err) {
        console.error("Error accessing front camera:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [ready]);

  // Capture snapshot
  const captureFace = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1); // mirror correction
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const dataUrl = canvas.toDataURL("image/png");
    setCapturedFace(dataUrl);

    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

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

  const handleCompleteVerification = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    finalizeVerification(); // proceed to wallet/home
  };

  return (
    <>
      {/* MAIN SECTION */}
      <section className="fixed inset-0 z-50 flex flex-col items-center justify-center">
        {!ready ? (
          <div className="p-4 text-center font-poppins">
            <h2 className="text-xl font-semibold mb-2">Face Verification</h2>
            <p className="text-sm text-neutral-600 mb-4">Optional: capture your face using your phone’s front camera.</p>
            <div className="flex flex-col gap-y-4">
              <button onClick={() => setReady(true)} className="px-6 py-3 bg-purple-600 text-white rounded-lg">
                Start Face Capture
              </button>
              <button onClick={handleCompleteVerification} className="px-6 py-3 bg-purple-600 text-white rounded-lg">
                Complete Verification
              </button>
            </div>
          </div>
        ) : !capturedFace ? (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />

            {/* Torch */}
            {torchSupported && (
              <button onClick={() => toggleFlash(!flashOn)} className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full">
                {flashOn ? "💡 Off" : "💡 On"}
              </button>
            )}

            {/* Face Marker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-white/60 rounded-full w-88 h-110 backdrop-brightness-75" />
            </div>

            {/* Bottom UI */}
            <div className="absolute bottom-6 w-full px-4 flex flex-col gap-3 z-50">
              <h2 className="text-white text-lg text-center mb-2">Face Verification</h2>
              <p className="text-white text-center text-sm mb-2">Align your face inside the circle and tap capture.</p>
              <button onClick={captureFace} className="w-full py-3 bg-purple-600 text-white rounded-lg">
                Capture Face
              </button>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
            <img src={capturedFace} alt="Captured Face" className="w-2/3 max-w-sm rounded-full border" />
            <div className="text-green-500 text-center text-sm">Face Verification Completed • Match Score: {faceMatchScore}%</div>

            <button onClick={handleCompleteVerification} className="w-full py-3 bg-purple-600 text-white rounded-lg">
              Complete Verification
            </button>
          </div>
        )}
      </section>

      {/* VERIFICATION MODAL */}
      <VerificationModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
};

export default FaceCapture;
