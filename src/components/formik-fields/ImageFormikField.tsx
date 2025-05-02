import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";
import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ImageFormikFieldProps<TData> = {
  label?: string;
  name: keyof TData & string;
  required?: boolean;
  className?: string;
  maxFileSize?: number;
  formikProps: FormikProps<TData>;
  size?: number | string;
  hint?: boolean;
  hintDirection?: "right" | "bottom";
  type?: "avatar" | "normal";
  editing?: boolean;
};

export function ImageFormikField<TData>({
  label,
  name,
  required,
  maxFileSize = 1024 * 1024 * 1,
  formikProps,
  size = 80,
  className,
  hint = true,
  hintDirection = "right",
  type = "normal",
  editing = true,
}: ImageFormikFieldProps<TData>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { setFieldError, errors, setFieldValue, values } = formikProps;
  const currentValue: File | string = values[name] as File | string;
  const error: string = errors[name] as string;

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: maxFileSize,
    accept: {
      "image/webp": [".webpg"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        const code = fileRejections[0].errors[0].code;
        if (code === "file-too-large") {
          setFieldError(name, `${name} file too large`);
        } else if (code === "too-many-files") {
          setFieldError(name, `${name} too many files`);
        } else {
          setFieldError(name, `${name} invalid file type`);
        }
        return;
      }

      setFieldError(name, undefined);
      setFieldValue(name, acceptedFiles[0]);
    },
  });

  const handleRemoveImage = () => {
    setFieldValue(name, null);
  };

  useEffect(() => {
    if (!currentValue) {
      setPreviewUrl(null);
      return;
    }

    if (currentValue instanceof File) {
      const url = URL.createObjectURL(currentValue);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setPreviewUrl(currentValue);
  }, [currentValue]);

  return (
    <section className={cn("w-full", `w-[${size}px]`, className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", error && "text-red-500")} htmlFor={name}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div className="w-full flex items-center gap-4">
        <div
          {...getRootProps({ className: "dropzone" })}
          className={cn(
            "dropzone border-2 relative border-gray-300 rounded flex items-center flex-col max-h-40 justify-center group basis-full",
            type === "avatar" ? "rounded-full" : "",
            error ? "border-red-300" : "border-gray-300",
            currentValue ? "border" : "border-dashed",
            editing ? "cursor-pointer" : "cursor-default"
          )}
          style={{ width: size, height: size, maxWidth: size, maxHeight: size }}
        >
          <Skeleton className={cn("h-full w-full", type === "avatar" ? "rounded-full" : "")} />

          {previewUrl ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <img
                src={previewUrl}
                alt="Category preview"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover rounded",
                  type === "avatar" ? "rounded-full" : ""
                )}
              />

              {editing && (
                <div
                  className={cn(
                    "hidden group-hover:flex absolute inset-0 items-center justify-center bg-black/40 cursor-pointer rounded",
                    type === "avatar" ? "rounded-full" : ""
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <span className="text-white font-medium">
                    <X />
                  </span>
                </div>
              )}
            </div>
          ) : (
            editing && (
              <div className="flex flex-col items-center justify-center">
                <ImagePlus className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
            )
          )}

          {editing && <input {...getInputProps()} />}
        </div>

        {hint && hintDirection === "right" && (
          <ul className="ml-3 text-sm list-disc text-gray-500">
            <li>Upload 1:1 image</li>
            <li>Size: Max {maxFileSize / (1024 * 1024)}MB</li>
            <li>Format: JPG, JPNG, PNG</li>
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}

      {hint && hintDirection === "bottom" && (
        <ul className="ml-5 mt-3 text-sm list-disc text-gray-500">
          <li>Upload 1:1 image</li>
          <li>Size: Max {maxFileSize / (1024 * 1024)}MB</li>
          <li>Format: JPG, JPNG, PNG, WEBP</li>
        </ul>
      )}
    </section>
  );
}
