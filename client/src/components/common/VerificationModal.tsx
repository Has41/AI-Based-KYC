import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Loader2, User } from "lucide-react";

type VerificationModalProps = {
  open: boolean;
  onClose: () => void;
  personalInfo: {
    fullName: string;
    age: number;
    cnic: string;
  };
  faceImage?: string | null;
};

const VerificationModal = ({ open, onClose, personalInfo, faceImage }: VerificationModalProps) => {
  const [stage, setStage] = useState<"summary" | "pending" | "success">("summary");

  useEffect(() => {
    if (!open) return;
    setStage("summary");
  }, [open]);

  const startVerification = () => {
    setStage("pending");
    setTimeout(() => {
      setStage("success");
    }, 3000);
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-fadeIn">
        {/* SUMMARY */}
        {stage === "summary" && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold text-center mb-4">Review Your Information</h2>
            {/* FACE IMAGE CARD */}
            <div className="p-4 flex flex-col items-center">
              {faceImage ? (
                <img src={faceImage} alt="Face" className="size-40 rounded-full object-cover border shadow-md" />
              ) : (
                <div className="size-40 rounded-full bg-gray-200 border shadow-md flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {/* PERSONAL DETAILS CARD */}
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm border">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Details</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Full Name:</span>
                    <span className="text-gray-900">{personalInfo.fullName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Age:</span>
                    <span className="text-gray-900">{personalInfo.age}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">CNIC:</span>
                    <span className="text-gray-900">{personalInfo.cnic}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startVerification}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow transition"
            >
              Submit for Verification
            </button>
          </div>
        )}

        {/* PENDING */}
        {stage === "pending" && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <h2 className="text-lg font-semibold mb-2">Verifying your biometric information</h2>
            <p className="text-sm text-gray-500">Please wait while we process your identity verification...</p>
          </div>
        )}

        {/* SUCCESS */}
        {stage === "success" && (
          <div className="animate-fadeIn">
            <div className="flex flex-col items-center mb-3">
              <CheckCircle className="w-14 h-14 text-green-500 mb-3" />
              <h2 className="text-xl font-bold text-center mb-1">Verification Successful</h2>
              <p className="text-sm text-gray-500 text-center">Your identity has been verified successfully.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 flex flex-col items-center">
                {faceImage ? (
                  <img src={faceImage} alt="Face" className="size-40 rounded-full object-cover border shadow-md" />
                ) : (
                  <div className="size-40 rounded-full bg-gray-200 border shadow-md flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>

              {/* PERSONAL INFO */}
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm border">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Details</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Full Name:</span>
                    <span className="text-gray-900">{personalInfo.fullName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Age:</span>
                    <span className="text-gray-900">{personalInfo.age}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">CNIC:</span>
                    <span className="text-gray-900">{personalInfo.cnic}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow transition">
              Create Wallet
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default VerificationModal;
