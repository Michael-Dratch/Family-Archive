"use client";
import MediaOptions from "@/components/mediaoptions";
import { useState } from "react";
import CreateCollectionModal from "@/components/createcollectionmodal";
import ImageView from "@/components/imageview";

const firstImages = [
  { imgUrl: "/images/pexels-1.jpg", title: "title" },
  { imgUrl: "/images/pexels-2.jpg", title: "title" },
  { imgUrl: "/images/pexels-3.jpg", title: "title" },
  { imgUrl: "/images/pexels-4.jpg", title: "title" },
  { imgUrl: "/images/pexels-5.jpg", title: "title" },
  { imgUrl: "/images/pexels-6.jpg", title: "title" },
  { imgUrl: "/images/pexels-7.jpg", title: "title" },
  { imgUrl: "/images/pexels-8.jpg", title: "title" },
  { imgUrl: "/images/pexels-9.jpg", title: "title" },
  { imgUrl: "/images/pexels-10.jpg", title: "title" },
  { imgUrl: "/images/pexels-11.jpg", title: "title" },
  { imgUrl: "/images/pexels-12.jpg", title: "title" },
];
export default function Gallery() {
  const [isPhotos, setIsPhotos] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState(firstImages);
  const [selectedImage, setSelectedImage] = useState();
  const pageSize = 12;

  return (
    <div>
      <div className="mt-navbar bg-gray-50">
        <MediaOptions
          isPhotos={isPhotos}
          setIsPhotos={setIsPhotos}
        ></MediaOptions>
        <div className="p-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {firstImages.map((item) => {
            return (
              <img
                className="aspect-square object-cover"
                src={item.imgUrl}
                onClick={() => setSelectedImage(item)}
              ></img>
            );
          })}
        </div>
      </div>
      <div
        className={`flex justify-center items-center transition-all w-full z-10 fixed bottom-0 inset-0 sm:flex sm:items-center sm:justify-center ${
          selectedImage ? "bg-black bg-opacity-50" : "pointer-events-none"
        }`}
        onClick={() => setSelectedImage(undefined)}
      >
        <div
          className={`w-10/12 sm:max-w-[400px] transition-all ${
            selectedImage ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ImageView
            imgUrl={selectedImage ? selectedImage.imgUrl : ""}
            title={selectedImage ? selectedImage.title : ""}
            closeModal={() => setSelectedImage(undefined)}
          ></ImageView>
        </div>
      </div>
    </div>
  );
}
