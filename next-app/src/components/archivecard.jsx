import React from "react";
export default function ArchiveCard({ data }) {
  const { imgUrl, title } = data;
  return (
    <div className="hover:outline hover:outline-teal-500 relative overflow-hidden rounded-lg border shadow w-full max-w-[500px] aspect-video bg-gray-200">
      {imgUrl && (
        <img
          className="absolute w-full h-full object-cover"
          src={imgUrl}
          alt="archive cover image"
        ></img>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700 via-transparent h-[100%]"></div>
      <span className="absolute bottom-0 p-4 text-white font-semibold">
        {title}
      </span>
    </div>
  );
}
