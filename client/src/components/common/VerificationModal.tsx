import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Loader2 } from "lucide-react";

type VerificationModalProps = {
  open: boolean;
  onClose: () => void;
};

const VerificationModal = ({ open, onClose }: VerificationModalProps) => {
  const [status, setStatus] = useState<"pending" | "success">("pending");

  useEffect(() => {
    if (!open) return;

    setStatus("pending");
    const timer = setTimeout(() => setStatus("success"), 3000); // switch to success after 3s
    return () => clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 flex flex-col items-center shadow-lg animate-fadeIn">
        {status === "pending" ? (
          <>
            <Loader2 className="animate-spin w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-lg font-semibold text-center mb-2">Verifying your biometric information</h2>
            <p className="text-sm text-gray-500 text-center">Please wait while we send your details to the backend...</p>
          </>
        ) : (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-lg font-semibold text-center mb-2">Verification Successful!</h2>
            <p className="text-sm text-gray-500 text-center">Your data has been verified successfully.</p>
            <button onClick={onClose} className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg font-semibold">
              Close
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default VerificationModal;
