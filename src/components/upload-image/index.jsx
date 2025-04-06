import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

export default function UploadImage({ onValueChange, limitFile, files: oldFiles }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState(oldFiles || []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: limitFile,
    disabled: files.length >= limitFile,
    accept: {
      "image/svg+xml": [".svg"],
      "image/vnd.microsoft.icon": [".ico"],
      "image/x-icon": [".ico"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setErrorMessage("Invalid file type. Please upload an image.");
        return;
      }
      setErrorMessage("");

      const updatedFiles = [...files, ...acceptedFiles].slice(0, limitFile);
      setFiles(updatedFiles);

      onValueChange && onValueChange(updatedFiles);
    },
  });

  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    onValueChange && onValueChange(updatedFiles);
  };

  return (
    <section>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`dropzone border-2 border-dashed border-gray-300 rounded-lg p-8 ${
          files.length >= limitFile ? "cursor-normal opacity-50" : "cursor-pointer"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center">
          <Upload />
        </div>
        <p className="text-center text-gray-600">
          Drag 'n' drop images here, or click to select images (up to {limitFile})
        </p>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      <aside className="mt-4 flex flex-col gap-4 overflow-auto max-h-56">
        {files.map((item, index) => (
          <div key={index} className="flex justify-between border p-2 rounded items-center">
            <img src={URL.createObjectURL(item)} className="w-20 h-auto object-cover" />
            <div>
              <p className="text-center text-sm mt-2">{item.name}</p>
              <p className="text-center text-xs text-gray-500">{(item.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              onClick={() => handleRemoveImage(index)}
              className=" bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
          </div>
        ))}
      </aside>
    </section>
  );
}
