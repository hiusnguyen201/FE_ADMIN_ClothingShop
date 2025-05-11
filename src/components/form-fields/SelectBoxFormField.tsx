import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type OptionItem = {
  label: string;
  value: string;
};

export type SelectBoxFormFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  type: "radio" | "checkbox";
  options: OptionItem[];
  className?: string;
  direction?: "column" | "row";
  editing?: boolean;
  value: string[];
  error?: string;
  onValueChange?: (value: string[]) => void;
};

export function SelectBoxFormField({
  editing = true,
  name,
  label,
  required = false,
  type,
  value = [],
  className,
  options,
  error,
  direction = "row",
  onValueChange,
}: SelectBoxFormFieldProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let newValues: string[];

    if (type === "checkbox") {
      newValues = selectedValues.includes(val) ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
    } else {
      newValues = [val];
    }

    setSelectedValues(newValues);
    onValueChange?.(newValues);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", editing && error && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div
        className={cn(
          "flex font-normal bg-transparent text-base md:text-sm w-full gap-1",
          direction === "column" ? "flex-col" : "flex-row"
        )}
      >
        {options.map((item) => (
          <Label
            className={cn(
              "inline-flex gap-2 items-center text-base -ml-1 p-1",
              editing ? "cursor-pointer" : "cursor-default"
            )}
            key={item.value}
            htmlFor={item.value}
          >
            {editing ? (
              <Input
                tabIndex={-1}
                id={item.value}
                type={type}
                name={name}
                value={item.value}
                checked={selectedValues.includes(item.value)}
                onChange={handleChange}
                className={cn(
                  "cursor-pointer w-auto h-auto transform scale-110",
                  error && "border-red-500 focus:border-red-500"
                )}
              />
            ) : (
              <Input
                tabIndex={-1}
                id={item.value}
                readOnly
                disabled={true}
                type={type}
                name={name}
                value={item.value}
                checked={selectedValues.includes(item.value)}
                className={cn("!cursor-default !opacity-100 w-auto h-auto transform scale-110")}
              />
            )}
            <span className="select-none font-normal capitalize">{item.label}</span>
          </Label>
        ))}
      </div>

      {editing && error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
    </div>
  );
}
