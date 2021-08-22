import React from "react";
import "./Block.css";

export default function Block({ gameState, indexMap, handleOnClick }) {
  return <div className="block" onClick={(e) => handleOnClick(e, indexMap)}>{gameState}</div>;
}
