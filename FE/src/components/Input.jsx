import React from "react";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}
