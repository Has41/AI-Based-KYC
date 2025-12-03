import { useState } from "react";

const FaceCapture = ({ finalizeVerification }: { finalizeVerification: () => void }) => {
  const [faceMockDone, setFaceMockDone] = useState<boolean>(false);
  const faceMatchScore = 92;

  return (
    <section className="font-poppins">
      <h2 className="text-xl font-semibold mb-2">Face Verification</h2>
      <p className="text-sm text-neutral-600 mb-3">Face is optional for the demo — we'll mark it completed with a placeholder avatar.</p>

      {!faceMockDone ? (
        <div>
          <div className="size-44 lg:size-64 mx-auto rounded-full bg-neutral-200 flex items-center justify-center mb-3">
            <span className="text-neutral-500">Avatar</span>
          </div>

          <div className="mb-3 text-sm text-green-600">Face Verification Completed (Mock) • Match Score: {faceMatchScore}%</div>

          <div className="flex flex-col gap-x-3 gap-y-3">
            <button
              onClick={() => {
                setFaceMockDone(true);
                finalizeVerification();
              }}
              className="py-3 rounded bg-purple-600 text-white"
            >
              Finish & Create Wallet
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-32 h-32 rounded-full bg-neutral-200 flex items-center justify-center mb-3">
            <span className="text-neutral-500">Avatar</span>
          </div>
          <div className="text-sm text-purple-600 mb-3">Face done — match {faceMatchScore}%</div>
          <button onClick={() => finalizeVerification()} className="py-3 rounded bg-black/80 text-white">
            Proceed to Wallet
          </button>
        </div>
      )}
    </section>
  );
};

export default FaceCapture;
