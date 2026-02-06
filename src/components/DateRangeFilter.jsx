import { useState } from "react";

export default function DateRangeFilter({ onApply }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="flex gap-3">
      <input type="date" onChange={(e) => setStart(e.target.value)} />
      <input type="date" onChange={(e) => setEnd(e.target.value)} />
      <button
        onClick={() => onApply(start, end)}
        className="bg-slate-800 text-white px-4 rounded"
      >
        Apply
      </button>
    </div>
  );
}
