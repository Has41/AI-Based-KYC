import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { Step } from "../../types/KycFlowTypes";
import FileUploadLabel from "../common/FileUploadLabel";

type CnicUploadProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

const CnicUpload = ({ setStep }: CnicUploadProps) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [mode, setMode] = useState<"upload" | "camera" | null>(null);
  const [cameraSide, setCameraSide] = useState<"front" | "back">("front");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleBack = () => {
    if (mode) setMode(null);
    else setStep("otp");
  };

  const handleForward = () => {
    if (mode) setMode(null);
    else setStep("biometric");
  };

  /* CAMERA LOGIC */
  useEffect(() => {
    if (mode !== "camera") return;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: cameraSide === "front" ? "user" : "environment" } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(console.error);

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [mode, cameraSide]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");

    if (cameraSide === "front") {
      setFrontImage(dataUrl);
      setCameraSide("back"); // switch to back camera automatically
    } else {
      setBackImage(dataUrl);
      setMode(null); // finished capturing both sides
    }
  };

  const handleUpload = (file: File, side: "front" | "back") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      side === "front" ? setFrontImage(reader.result as string) : setBackImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* CAMERA VIEW */
  if (mode === "camera") {
    return (
      <section className="fixed inset-0 bg-black z-50">
        <button onClick={handleBack} className="absolute top-4 left-4 z-50 p-2 rounded-full bg-black/50 text-white">
          <ArrowLeft size={20} />
        </button>

        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-48 border-2 border-green-400 rounded-lg" />
        </div>

        <div className="absolute bottom-6 w-full flex justify-center">
          <button onClick={capturePhoto} className="px-6 py-3 bg-green-600 text-white rounded-full font-medium">
            Capture {cameraSide === "front" ? "Front" : "Back"}
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </section>
    );
  }

  return (
    <section className="mx-auto font-poppins w-full">
      {/* Header */}
      <div className="relative mb-6 flex items-center justify-between">
        {/* Left arrow */}
        <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={20} />
        </button>

        {/* Title centered */}
        <h2 className="text-lg font-semibold text-gray-900 text-center flex-1">Verify Your Identity</h2>

        {/* Right arrow (optional, can be disabled or hidden if not needed) */}
        <button onClick={handleForward} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="text-sm mb-6 text-gray-600">Upload or capture clear photos of your government-issued ID.</p>

      {/* Mode selection */}
      {!mode && (
        <div className="flex gap-3 mb-6">
          <button disabled={!!frontImage && !!backImage} onClick={() => setMode("upload")} className="flex-1 py-3 border rounded-lg font-medium">
            Upload Photos
          </button>
          <button
            disabled={!!frontImage && !!backImage}
            onClick={() => {
              setCameraSide("front");
              setMode("camera");
            }}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium"
          >
            Use Camera
          </button>
        </div>
      )}

      {/* Upload mode */}
      {mode === "upload" && (
        <div className="flex flex-col items-center gap-4">
          <FileUploadLabel
            image={frontImage}
            label="Front Side"
            subText="Upload front side of your ID"
            onUpload={(file) => handleUpload(file, "front")}
          />
          <FileUploadLabel
            image={backImage}
            label="Back Side"
            subText="Upload back side of your ID"
            onUpload={(file) => handleUpload(file, "back")}
          />
        </div>
      )}

      {/* Confirmation */}
      {frontImage && backImage && (
        <>
          <div className="flex items-center my-4">
            <input type="checkbox" checked={confirm} onChange={() => setConfirm(!confirm)} className="mr-2" />
            <label className="text-sm text-gray-700">I confirm that the uploaded document is a valid government-issued ID.</label>
          </div>

          <button
            disabled={!confirm}
            onClick={() => setStep("biometric")}
            className={`w-full py-3 rounded-lg font-medium ${
              confirm ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </>
      )}
    </section>
  );
};

export default CnicUpload;
