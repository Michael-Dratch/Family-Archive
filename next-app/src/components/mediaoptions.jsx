import React from "react";

export default function MediaOptions({ isPhotos, setIsPhotos }) {
  return (
    <div className="fixed w-screen px-4 py-2 flex gap-4 font-black text-gray-500 bg-white bg-opacity-95">
      <div className="flex flex-col" onClick={() => setIsPhotos(true)}>
        <span
          className={`${
            isPhotos ? "text-gray-500" : "text-gray-400"
          } transition-all`}
        >
          Photos
        </span>
        <div
          className={`${
            isPhotos ? "w-full border-gray-500" : "w-0 border-gray-300"
          } border-b-2 transition-all `}
        ></div>
      </div>
      <div className="flex flex-col " onClick={() => setIsPhotos(false)}>
        <span
          className={`${
            isPhotos ? "text-gray-400" : "text-gray-500"
          } transition-all`}
        >
          Videos
        </span>
        <div
          className={`${
            isPhotos ? "w-0 border-gray-300" : "w-full border-gray-500"
          } border-b-2 transition-all`}
        ></div>
      </div>
    </div>
  );
}
