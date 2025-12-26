import { CircleCheck } from "lucide-react";

const VerificationComplete = ({ finalizeVerification }: { finalizeVerification: () => void }) => {
  return (
    <section className="min-h-screen flex flex-col font-poppins px-4">
      {/* Top Content */}
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Verification Complete</h1>
        {/* Divider */}
        <div className="w-full max-w-sm h-px bg-gray-200 my-2" />
        <p className="text-gray-600 text-sm">Your identity has been verified successfully</p>

        <CircleCheck fill="green" className="text-white" size={140} strokeWidth={1.5} />

        <p className="text-gray-700 text-sm mt-4">Your digital wallet has been created.</p>
      </div>

      {/* Bottom Button */}
      <div className="mt-auto mb-32">
        {/* Divider above button */}
        <div className="w-full h-px bg-gray-200 mb-4" />

        <button onClick={finalizeVerification} className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
          Go To Wallet
        </button>
      </div>
    </section>
  );
};

export default VerificationComplete;
