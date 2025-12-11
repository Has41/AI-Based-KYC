import { useState } from "react";
import type { Step } from "../../types/KycFlowTypes";

type PersonalInfoProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

const PersonalInfo = ({ setStep }: PersonalInfoProps) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [cnic, setCnic] = useState("");

  const [errors, setErrors] = useState<{ fullName?: string; age?: string; cnic?: string }>({});

  const handleNext = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!age || isNaN(Number(age)) || Number(age) < 18) newErrors.age = "Valid age (18+) required";
    if (!cnic.match(/^\d{5}-\d{7}-\d$/)) newErrors.cnic = "CNIC must be in 12345-1234567-1 format";
    setStep("cnic");
    setErrors(newErrors);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col gap-4 font-poppins">
      <h2 className="text-xl font-bold text-center mb-2">Personal Information</h2>
      <p className="text-sm text-gray-600 text-center mb-4">Please fill in your details for verification.</p>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
          placeholder="John Doe"
        />
        {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
      </div>

      {/* Age */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${errors.age ? "border-red-500" : "border-gray-300"}`}
          placeholder="18"
        />
        {errors.age && <span className="text-red-500 text-xs">{errors.age}</span>}
      </div>

      {/* CNIC */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">CNIC</label>
        <input
          type="text"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border ${errors.cnic ? "border-red-500" : "border-gray-300"}`}
          placeholder="12345-1234567-1"
        />
        {errors.cnic && <span className="text-red-500 text-xs">{errors.cnic}</span>}
      </div>

      <button onClick={handleNext} className="w-full py-3 mt-2 bg-purple-600 text-white rounded-lg font-semibold">
        Next
      </button>

      <p className="text-xs text-gray-400 text-center mt-2">⚠️ This is a demo. No data will be saved.</p>
    </div>
  );
};

export default PersonalInfo;
