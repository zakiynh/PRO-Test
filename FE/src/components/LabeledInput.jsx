import React from "react";
import Input from "./Input";

export default function LabeledInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="block text-zinc-950 mb-1"
        htmlFor={type}
      >
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
