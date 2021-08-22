import React from "react";
import "./Input.css";

export default function Input({
  type,
  value,
  placeholder,
  style,
  handleOnChange,
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      style={style}
      onChange={handleOnChange}
    />
  );
}
