import React from "react";

export default function PrimaryButton({ text, url }) {
  return (
    <a href={url}>
      <button className="text-sm hover:shadow hover:text-teal-600 hover:border-teal-600 transition-all border-2 border-teal-500 bg-white rounded-2xl px-2 text-teal-500 font-bold">
        {text}
      </button>
    </a>
  );
}
