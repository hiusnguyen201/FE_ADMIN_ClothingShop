import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from 'lucide-react';

export default function UploadImage({ onValueChange, oldPicture, limitFile }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [previews, setPreviews] = useState([]); // Lưu danh sách các ảnh xem trước

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: limitFile,
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

      const newPreviews = acceptedFiles.map((file) => {
        const previewURL = URL.createObjectURL(file); // Tạo URL từ file
        return { file, previewURL }; // Lưu file và URL
      });

      // Giải phóng URL cũ khi cập nhật ảnh
      previews.forEach((preview) => URL.revokeObjectURL(preview.previewURL));

      const updatedPreviews = [...previews, ...newPreviews].slice(0, limitFile); // Giới hạn số lượng file
      setPreviews(updatedPreviews);

      // Trả về một chuỗi URL thay vì một mảng
      onValueChange && onValueChange(updatedPreviews.map((item) => item.previewURL).join(', ')); // Join thành chuỗi
    },
  });

  const handleRemoveImage = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);

    // Giải phóng URL của ảnh bị xóa
    URL.revokeObjectURL(previews[index].previewURL);

    setPreviews(updatedPreviews);
    onValueChange && onValueChange(updatedPreviews.map((item) => item.previewURL).join(', ')); // Join thành chuỗi
  };

  return (
    <section className="container p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-muted/75">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="flex items-center justify-center">
            <Upload/>
        </div>
        <p className="text-center text-gray-600">
          Drag 'n' drop images here, or click to select images (up to {limitFile})
        </p>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      <aside
        className={`mt-4 grid ${previews.length === 1 ? "place-items-center" : "grid-cols-3"} gap-4`}
      >
        {previews.map((item, index) => (
          <div
            key={index}
            className="relative border p-2 rounded w-20 max-w-xs"
          >
            <img
              src={item.previewURL}
              alt={`Preview ${index + 1}`}
              className="w-20 h-auto object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
            >
              X
            </button>
          </div>
        ))}
      </aside>

      {oldPicture && previews.length === 0 && (
        <aside className="mt-4 flex justify-center">
          <img
            src={oldPicture}
            alt="Preview"
            className="w-full max-w-xs h-auto object-cover"
          />
        </aside>
      )}
    </section>
  );
}
