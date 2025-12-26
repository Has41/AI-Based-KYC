import React, { useState, useRef, useEffect } from "react";

type FaceCaptureProps = {
  capturedFace: string | null;
  setCapturedFace: React.Dispatch<React.SetStateAction<string | null>>;
  finalizeVerification: () => void;
};

const FaceCapture = ({ finalizeVerification, capturedFace, setCapturedFace }: FaceCaptureProps) => {
  const [ready, setReady] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ================= CAMERA SETUP ================= */
  useEffect(() => {
    if (!ready) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });

        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        if (capabilities.torch) setTorchSupported(true);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [ready]);

  /* ================= CAPTURE ================= */
  const captureFace = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const img = canvas.toDataURL("image/png");
    setCapturedFace(img);

    streamRef.current?.getTracks().forEach((t) => t.stop());
    finalizeVerification();
  };

  const toggleFlash = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track || !torchSupported) return;

    try {
      await track.applyConstraints({
        advanced: [{ torch: !flashOn } as any]
      });
      setFlashOn(!flashOn);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      {/* ---------- INTRO SCREEN ---------- */}
      {!ready && (
        <div className="flex flex-col items-center justify-center p-6 text-center font-poppins">
          <h2 className="text-xl font-semibold mb-2">Face Verification</h2>
          <p className="text-sm text-neutral-600 mb-6">Capture your face using your phone’s front camera.</p>

          <button onClick={() => setReady(true)} className="w-full max-w-sm py-3 bg-green-600 text-white rounded-lg">
            Start Face Capture
          </button>
        </div>
      )}

      {/* ---------- CAMERA OVERLAY ---------- */}
      {ready && !capturedFace && (
        <section className="fixed inset-0 z-50 bg-black">
          {/* Camera */}
          <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" />

          {/* Flash */}
          {torchSupported && (
            <button onClick={toggleFlash} className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full">
              {flashOn ? "💡 Off" : "💡 On"}
            </button>
          )}

          {/* Face Marker */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-96 rounded-full border-4 border-white/70" />
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 w-full px-4 z-50">
            <h2 className="text-white text-lg text-center mb-1">Face Verification</h2>
            <p className="text-white text-sm text-center mb-3">Align your face inside the circle</p>
            <button onClick={captureFace} className="w-full py-3 bg-green-600 text-white rounded-lg">
              Capture Face
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </section>
      )}
    </>
  );
};

export default FaceCapture;
