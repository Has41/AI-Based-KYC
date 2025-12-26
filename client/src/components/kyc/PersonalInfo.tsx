import { useState } from "react";
import type { Step } from "../../types/KycFlowTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PersonalInfoProps = {
  personalInfo: {
    fullName: string;
    dob: string;
    cnic: string;
    phone: string;
  };
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      dob: string;
      cnic: string;
      phone: string;
    }>
  >;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

const PersonalInfo = ({ personalInfo, setPersonalInfo, setStep }: PersonalInfoProps) => {
  const [errors, setErrors] = useState<{
    fullName?: string;
    dob?: string;
    cnic?: string;
    phone?: string;
  }>({});

  const isAdult = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const handleNext = () => {
    const newErrors: typeof errors = {};

    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = "Please enter your full legal name.";
    }

    if (!personalInfo.dob) {
      newErrors.dob = "Date of birth is required.";
    } else if (!isAdult(personalInfo.dob)) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    if (!personalInfo.cnic.match(/^\d{5}-\d{7}-\d$/)) {
      newErrors.cnic = "Please enter a valid CNIC (e.g. 12345-1234567-1).";
    }

    if (!personalInfo.phone.match(/^\+92\d{10}$/)) {
      newErrors.phone = "Enter a valid mobile number (e.g. +923001234567).";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep("otp");
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-x-6 gap-y-4 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        {/* Left arrow */}
        <button onClick={() => setStep("consent")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft color="green" size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 text-center flex-1">Personal Details</h2>

        <button onClick={() => setStep("otp")} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight color="green" size={20} />
        </button>
      </div>
      <hr className="border-gray-200" />

      <p className="text-sm text-gray-600 mb-6 text-center">Provide accurate information as it appears on your government-issued ID.</p>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Full Legal Name</label>
        <input
          type="text"
          value={personalInfo.fullName}
          onChange={(e) => setPersonalInfo((prev) => ({ ...prev, fullName: e.target.value }))}
          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1
            ${errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"}`}
          placeholder="As shown on CNIC"
        />
        {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={personalInfo.dob}
          onChange={(e) => setPersonalInfo((prev) => ({ ...prev, dob: e.target.value }))}
          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1
            ${errors.dob ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"}`}
        />
        {errors.dob && <span className="text-red-500 text-xs">{errors.dob}</span>}
      </div>

      {/* CNIC */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">CNIC Number</label>
        <input
          type="text"
          value={personalInfo.cnic}
          onChange={(e) => setPersonalInfo((prev) => ({ ...prev, cnic: e.target.value }))}
          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1
            ${errors.cnic ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"}`}
          placeholder="12345-1234567-1"
        />
        {errors.cnic && <span className="text-red-500 text-xs">{errors.cnic}</span>}
      </div>

      {/* Mobile Number */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Mobile Phone Number</label>
        <input
          type="tel"
          value={personalInfo.phone}
          onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1
            ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-600"}`}
          placeholder="+923001234567"
        />
        {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
      </div>

      <hr className="border-gray-200" />

      {/* Action */}
      <button onClick={handleNext} className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition">
        Continue Verification
      </button>
    </div>
  );
};

export default PersonalInfo;
