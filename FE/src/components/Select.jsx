import React from "react";

export default function Select({
  options,
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.value === ""}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
