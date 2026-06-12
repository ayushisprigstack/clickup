"use client";

import { useEffect, useState } from "react";

export default function EffectPage() {
  const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Page rendered");
//   });
//  useEffect(() => {
//   console.log("Runs only once");
// }, []);
useEffect(() => {
  console.log("Count changed");
}, [count]);
  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold">
        {count}
      </h1>

      <button
        onClick={() => setCount(count + 1)}
        className="btn btn-dark rounded-3 mt-3 px-4 py-2 custom-btn"
      >
        Increase
      </button>
    </div>
  );
}