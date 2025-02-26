import React from "react";

export default function Button({
  type = "button",
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full text-center cursor-pointer"
    >
      {children}
    </button>
  );
}
