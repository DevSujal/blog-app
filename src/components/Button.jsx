import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${className} px-4 py-2 rounded-lg ${bgColor} ${textColor}`}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
