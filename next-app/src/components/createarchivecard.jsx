import React from "react";
export default function CreateArchiveCard() {
  return (
    <a className="w-full" href="/create-archive">
      <div className="sm:hidden flex flex-col hover:outline hover:outline-teal-500 relative overflow-hidden rounded-lg border shadow w-full max-w-[500px] aspect-video bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-400 via-transparent h-[100%]"></div>
        <div className="flex gap-2 items-center text-2xl w-fit mx-auto my-auto text-teal-500 font-bold">
          Create New Archive
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
