// CnicUpload.tsx (changed handleUpload signature)
import { useState } from "react";
import type { Step } from "../../types/KycFlowTypes";
import FileUploadLabel from "../common/FileUploadLabel";

type CnicUploadProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

const CnicUpload = ({ setStep }: CnicUploadProps) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [_, setForm] = useState({
    name: "",
    cnic: "",
    dob: "",
    address: ""
  });
  const [confirm, setConfirm] = useState(false);

  // Accept a File and side, then produce dataURL
  const handleUpload = (file: File, side: "front" | "back") => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (side === "front") {
        setFrontImage(dataUrl);
        // Mock OCR auto-fill
        setForm({
          name: "Ali Khan",
          cnic: "61101-1234567-1",
          dob: "1997-12-12",
          address: "G-10/4 Islamabad"
        });
      } else {
        setBackImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="mx-auto font-poppins w-full">
      <h2 className="text-xl font-bold mb-6 text-center text-black/80">Upload a proof of your identity</h2>
      <p className="text-sm mb-4 text-center text-gray-600">We require a valid government-issued ID national ID</p>

      <div className="flex flex-col items-center justify-center gap-4 my-4">
        <FileUploadLabel
          image={frontImage}
          label="Front Side"
          subText="Upload front side of your ID"
          onUpload={(file) => handleUpload(file, "front")}
        />

        <FileUploadLabel image={backImage} label="Back Side" subText="Upload back side of your ID" onUpload={(file) => handleUpload(file, "back")} />
      </div>

      {frontImage && backImage && (
        <>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="confirm" checked={confirm} onChange={() => setConfirm(!confirm)} className="mr-2" />
            <label htmlFor="confirm" className="text-sm text-gray-700">
              I confirm that I uploaded valid government-issued photo ID.
            </label>
          </div>

          <button
            onClick={() => confirm && setStep("fingerprint")}
            disabled={!confirm}
            className={`w-full py-3 rounded-lg font-medium ${
              confirm ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
