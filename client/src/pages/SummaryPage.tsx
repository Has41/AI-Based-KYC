import { useState } from "react";
import VerificationModal from "../components/common/VerificationModal";

type SummaryPageProps = {
  personalInfo: {
    name: string;
    age: string;
    cnic: string;
  };
  leftHandImg: string | null;
  rightHandImg: string | null;
  capturedFace: string | null;
  faceMatchScore?: number;
  onBack: () => void;
  onComplete: () => void;
};

const SummaryPage = ({ personalInfo, leftHandImg, rightHandImg, capturedFace, faceMatchScore, onBack, onComplete }: SummaryPageProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 font-poppins">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Review Your Information</h2>

      <div className="w-full max-w-md bg-white rounded-xl p-4 shadow-md flex flex-col gap-4">
        <div>
          <h3 className="font-semibold mb-1">Personal Information</h3>
          <p>Name: {personalInfo.name}</p>
          <p>Age: {personalInfo.age}</p>
          <p>CNIC: {personalInfo.cnic}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Fingerprints</h3>
          <div className="flex gap-2">
            {leftHandImg && <img src={leftHandImg} alt="Left Hand" className="w-24 h-24 object-contain border rounded-lg" />}
            {rightHandImg && <img src={rightHandImg} alt="Right Hand" className="w-24 h-24 object-contain border rounded-lg" />}
          </div>
        </div>

        {capturedFace && (
          <div>
            <h3 className="font-semibold mb-1">Face Capture</h3>
            <img src={capturedFace} alt="Captured Face" className="w-32 h-32 object-cover rounded-full border" />
            {faceMatchScore !== undefined && <p className="text-green-600 mt-1">Match Score: {faceMatchScore}%</p>}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded-lg font-medium">
            Back
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium">
            Submit & Verify
          </button>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default SummaryPage;
