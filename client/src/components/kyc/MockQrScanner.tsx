import { ArrowLeft, Zap } from "lucide-react";

const MockQrScanner = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="relative w-full h-screen bg-black/80 text-white overflow-hidden">
      {/* BACK BUTTON */}
      <button onClick={onBack} className="absolute top-5 left-5 z-20 bg-black/50 p-2 rounded-full">
        <ArrowLeft size={24} />
      </button>

      {/* FLASHLIGHT */}
      <button className="absolute top-5 right-5 z-20 bg-black/50 p-2 rounded-full">
        <Zap size={24} />
      </button>

      {/* CAMERA MOCK BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/mock-camera.jpg')] bg-cover bg-center opacity-40" />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* SCAN FRAME */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-64 h-64">
          {/* Center transparent box */}
          <div className="absolute inset-0 border-2 border-green-400 rounded-xl" />

          {/* Corner highlights */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-xl" />
        </div>
      </div>

      {/* TEXT */}
      <div className="absolute bottom-40 w-full text-center text-lg font-medium text-white">Align the QR code inside the box</div>

      {/* BOTTOM CARD */}
      <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-lg py-5 px-6 text-white">
        <p className="font-semibold text-lg">Scan to Earn / Redeem Points</p>
        <p className="text-gray-300 text-sm">Point system will automatically detect the shop’s QR code.</p>
      </div>
    </div>
  );
};

export default MockQrScanner;
