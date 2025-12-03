import { QRCodeCanvas } from "qrcode.react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ViewQrModalProps {
  walletId: string;
  fullName: string;
  tier: string;
  onClose: () => void;
}

const ViewQrModal = ({ walletId, fullName, tier, onClose }: ViewQrModalProps) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 relative shadow-xl animate-fadeIn">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-xl font-bold text-center mb-2">Your Wallet QR</h2>
        <p className="text-center text-gray-500 mb-4 text-sm">Show this QR at the store to earn loyalty points.</p>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-4 rounded-xl">
            <QRCodeCanvas value={walletId} size={200} />
          </div>
        </div>

        {/* User Info */}
        <div className="text-center">
          <p className="text-lg font-semibold">{fullName}</p>
          <p className="text-sm text-purple-600 font-medium mb-1">{tier} Tier</p>
          <p className="text-xs text-gray-500">Wallet ID: {walletId}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ViewQrModal;
