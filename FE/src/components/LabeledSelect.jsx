import React from "react";
import Select from "./Select";

export default function LabeledSelect({
  label,
  options,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-zinc-950 mb-1">
        {label}
      </label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
