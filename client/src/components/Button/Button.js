import React from "react";
import "./Button.css";

export default function Button({ style, handleOnClick, children }) {
  return (
    <button style={style} onClick={handleOnClick}>
      {children}
    </button>
  );
}
