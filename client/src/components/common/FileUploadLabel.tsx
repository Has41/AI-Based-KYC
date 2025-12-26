// FileUploadLabel.tsx
import React, { useRef } from "react";
import { Download } from "lucide-react";

interface FileUploadLabelProps {
  image: string | null;
  label: string;
  subText?: string;
  onUpload: (file: File) => void;
}

const FileUploadLabel: React.FC<FileUploadLabelProps> = ({ image, label, subText, onUpload }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
  };

  return (
    <div className="border-2 border-dashed border-green-400 rounded-lg px-16 flex flex-col items-center justify-center gap-y-5 h-64 w-full overflow-hidden">
      {image ? (
        <img src={image} alt={label} className="w-full h-32 object-contain mb-2" />
      ) : (
        <>
          <Download size={40} className="text-green-500" />
          {subText && <p className="text-green-600 text-sm text-center">{subText}</p>}
        </>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      {!image && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-green-600 rounded-full border-2 border-green-500 px-4 py-2 font-bold text-sm"
        >
          Choose a file
        </button>
      )}
    </div>
  );
};

export default FileUploadLabel;
