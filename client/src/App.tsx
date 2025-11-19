import { useState, useRef } from "react";
import Webcam from "react-webcam";

const App = () => {
  const [step, setStep] = useState(1);

  // Step 1 – CNIC Upload + Mock OCR
  const [cnicImage, setCnicImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    cnic: "",
    dob: "",
    address: ""
  });

  // Step 2 – Selfie Capture
  const webcamRef = useRef<Webcam>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const matchScore = 92; // mock score

  const handleCnicUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setCnicImage(reader.result as string);
    reader.readAsDataURL(file);

    // Mock OCR auto-fill
    setForm({
      name: "Ali Khan",
      cnic: "61101-1234567-1",
      dob: "1997-12-12",
      address: "G-10/4 Islamabad"
    });
  };

  const captureSelfie = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setSelfie(imageSrc);
  };

  return (
    <div className="min-h-screen font-poppins bg-white/20 flex flex-col gap-y-14 justify-center items-center p-4">
      <h1 className="font-bold lg:text-3xl text-xl tracking-wide text-black/80">KYC Verification Demo</h1>
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-xl border border-gray-400">
        {/* Step Header */}
        <div className="flex justify-between mb-8 text-sm font-medium">
          <span className={`${step === 1 ? "text-black/80 font-bold" : "text-neutral-500"}`}>1. CNIC Upload</span>
          <span className={`${step === 2 ? "text-black/80 font-bold" : "text-neutral-500"}`}>2. Selfie</span>
          <span className={`${step === 3 ? "text-black/80 font-bold" : "text-neutral-500"}`}>3. Result</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="lg:text-xl text-black/80 font-semibold mb-4">Upload Your CNIC</h2>

            <label className="block w-full cursor-pointer">
              <div className="w-full p-3 mb-4 rounded-lg bg-black/80 text-white text-center">Click to upload CNIC image</div>
              <input type="file" onChange={handleCnicUpload} accept="image/*" className="hidden" />
            </label>

            {cnicImage && <img src={cnicImage} alt="CNIC Preview" className="w-full h-auto rounded-lg mb-4 border border-neutral-700" />}

            {cnicImage && (
              <div className="space-y-3">
                {Object.keys(form).map((key) => (
                  <input
                    key={key}
                    type="text"
                    value={(form as any)[key]}
                    readOnly
                    className="w-full bg-neutral-800/60 p-3 rounded-lg border border-neutral-700 text-neutral-300"
                  />
                ))}
              </div>
            )}

            {cnicImage && (
              <button onClick={() => setStep(2)} className="mt-6 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Continue
              </button>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="lg:text-xl font-semibold mb-4">Selfie Verification</h2>

            {!selfie ? (
              <>
                <Webcam ref={webcamRef} mirrored={false} screenshotFormat="image/jpeg" className="rounded-xl w-full border border-neutral-700" />
                <button onClick={captureSelfie} className="mt-4 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  Capture Selfie
                </button>
              </>
            ) : (
              <>
                <img src={selfie} alt="Selfie" className="rounded-xl w-full border border-neutral-700 mb-4" />

                <p className="text-center text-green-400 text-base mb-4 font-medium">Face Match Successful — {matchScore}%</p>

                <button onClick={() => setStep(3)} className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="lg:text-xl font-semibold mb-6">Verification Complete</h2>

            <div className="bg-green-600/20 border border-green-500 p-6 rounded-xl mb-4 space-y-2 text-green-300">
              <p>Identity Verified ✔️</p>
              <p>Selfie Match ✔️</p>
              <p>OCR Extracted ✔️</p>
              <p>Match Score: {matchScore}%</p>
            </div>

            <button onClick={() => setStep(1)} className="mt-4 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 font-medium">
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
