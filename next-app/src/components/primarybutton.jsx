import React from "react";

export default function PrimaryButton({ text, url }) {
  return (
    <a href={url}>
      <button className="flex items-center gap-1 text-sm hover:shadow hover:text-teal-600 hover:border-teal-600 transition-all border-2 border-teal-500 bg-white rounded-2xl px-2 text-teal-500 font-bold">
        {text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </a>
  );
}
