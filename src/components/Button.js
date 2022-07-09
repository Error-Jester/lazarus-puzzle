import React from "react";

export default function Button({ name, func }) {
  return (
    // <div className="options">
    <button
      className="bg-slate-700 hover:bg-cyan-800 active:bg-slate-600 rounded-lg p-4 text-base px-5 "
      type="button"
      onClick={func}
    >
      {name}
    </button>

    // </div>
  );
}
