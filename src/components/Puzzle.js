import React, { useRef } from "react";

export default function Puzzle({ data,moveTile }) {
  const ref = useRef(null)
  return (
    <div className="puzzle">
      {data.flat().map((item) => {
        "";
        if (item === 0) {
          item = " ";
        }
        return (
          <div onClick={moveTile} ref={ref} key={item.toString()} className={`piece _${item.toString()}`}>
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
}
