import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function QuantitySelector({ value, onChange, min = 1 }) {
  const safeValue = Math.max(value, min);

  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-white p-1 shadow-sm">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100"
        onClick={() => onChange(Math.max(min, safeValue - 1))}
        aria-label="Disminuir cantidad"
      >
        <FiMinus />
      </button>
      <span className="min-w-[52px] text-center text-sm font-semibold text-slate-950">
        {safeValue}
      </span>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-100"
        onClick={() => onChange(safeValue + 1)}
        aria-label="Aumentar cantidad"
      >
        <FiPlus />
      </button>
    </div>
  );
}
