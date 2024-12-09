import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadImage({ onValueChange }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {'image/png':['.png']},
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setErrorMessage("Invalid file type. Please upload an image.");
        return;
      }
      setErrorMessage("");

      const file = acceptedFiles[0];
      const previewURL = URL.createObjectURL(file);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(previewURL);
      onValueChange && onValueChange(file);
    },
  });

  return (
    <section className="container p-4 border">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {!errorMessage && <p>Drag 'n' drop an image here, or click to select an image (only 1) </p>}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
      {preview && (
        <aside className="mt-4">
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </aside>
      )}
    </section>
  );
}
