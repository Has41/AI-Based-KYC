import React, { useState } from "react";
import type { Step } from "../../types/KycFlowTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OTPVerification = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<Step>> }) => {
  const [otp, setOtp] = useState("");

  return (
    <section className="w-full mx-auto font-poppins flex flex-col gap-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-2">
        {/* Left chevron (back) */}
        <button onClick={() => setStep("personal")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 text-center flex-1">OTP Verification</h2>

        {/* Right chevron (optional) */}
        <button onClick={() => setStep("cnic")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* OTP Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="otp" className="text-sm font-medium text-gray-700">
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          placeholder="6-digit code"
        />

        {/* Resend OTP */}
        <div className="flex justify-end mt-1">
          <button type="button" className="text-sm font-medium text-green-600 hover:underline">
            Resend OTP
          </button>
        </div>
      </div>

      {/* Verify Button */}
      <button
        disabled={otp.length < 6}
        onClick={() => setStep("cnic")}
        className={`w-full py-3 rounded-lg font-semibold text-sm transition
          ${otp.length === 6 ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      >
        Verify
      </button>
    </section>
  );
};

export default OTPVerification;
