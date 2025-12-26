import { useState } from "react";

const UserConsent: React.FC = () => {
  const [consent, setConsent] = useState(false);

  return (
    <section className="flex items-center justify-between px-4 font-poppins">
      <div className="w-full max-w-md flex flex-col justify-between">
        {/* Top Content */}
        <div>
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900">User Consent</h1>

          {/* Divider */}
          <hr className="my-4 border-gray-200" />

          {/* Description */}
          <p className="text-sm text-gray-600">Please accept the terms to proceed.</p>

          {/* Divider */}
          <hr className="my-4 border-gray-200" />

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I agree to the collection and verification of my information for KYC purposes.
            </label>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Divider above button */}
          <hr className="my-6 border-gray-200" />

          <button
            disabled={!consent}
            className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition
              ${consent ? "bg-green-600 hover:bg-green-700" : "cursor-not-allowed bg-green-300"}`}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserConsent;
