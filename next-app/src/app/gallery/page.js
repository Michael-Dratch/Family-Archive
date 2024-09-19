"use client";
import MediaOptions from "@/components/mediaoptions";
import { useState } from "react";

const firstImages = [
  { imgUrl: "/images/pexels-1.jpg" },
  { imgUrl: "/images/pexels-2.jpg" },
  { imgUrl: "/images/pexels-3.jpg" },
  { imgUrl: "/images/pexels-4.jpg" },
  { imgUrl: "/images/pexels-5.jpg" },
  { imgUrl: "/images/pexels-6.jpg" },
  { imgUrl: "/images/pexels-7.jpg" },
  { imgUrl: "/images/pexels-8.jpg" },
  { imgUrl: "/images/pexels-9.jpg" },
  { imgUrl: "/images/pexels-10.jpg" },
  { imgUrl: "/images/pexels-11.jpg" },
  { imgUrl: "/images/pexels-12.jpg" },
];
export default function Gallery() {
  const [isPhotos, setIsPhotos] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState(firstImages);
  const pageSize = 12;

  return (
    <div className="mt-navbar bg-gray-50">
      <MediaOptions
        isPhotos={isPhotos}
        setIsPhotos={setIsPhotos}
      ></MediaOptions>
      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3">
        {firstImages.map((item) => {
          return <img src={item.imgUrl}></img>;
        })}
      </div>
    </div>
  );
}
