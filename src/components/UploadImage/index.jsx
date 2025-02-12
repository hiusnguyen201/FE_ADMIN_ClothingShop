import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

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
      onValueChange &&
        onValueChange(
          updatedPreviews.map((item) => item.previewURL).join(", ")
        ); // Join thành chuỗi
    },
  });

  const handleRemoveImage = (index) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);

    // Giải phóng URL của ảnh bị xóa
    URL.revokeObjectURL(previews[index].previewURL);

    setPreviews(updatedPreviews);
    onValueChange &&
      onValueChange(updatedPreviews.map((item) => item.previewURL).join(", ")); // Join thành chuỗi
  };

  return (
    <section>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="cursor-pointer container p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-muted/75"
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center">
          <Upload />
        </div>
        <p className="text-center text-gray-600">
          Drag 'n' drop images here, or click to select images (up to{" "}
          {limitFile})
        </p>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      <aside className="mt-4 flex flex-col gap-4 overflow-auto max-h-56">
        {previews.map((item, index) => (
          <div key={index} className="flex justify-between border p-2 rounded items-center">
            <img
              src={item.previewURL}
              alt={`Preview ${index + 1}`}
              className="w-20 h-auto object-cover"
            />
            <div>

            <p className="text-center text-sm mt-2">{item.file.name}</p>
            <p className="text-center text-xs text-gray-500">
              {(item.file.size / 1024).toFixed(2)} KB
            </p>
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
