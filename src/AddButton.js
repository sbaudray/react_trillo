import React from "react";

export function AddButton({ onClick, innerRef }) {
  return (
    <button ref={innerRef} className="AddButton" onClick={onClick}>
      +
    </button>
  );
}

