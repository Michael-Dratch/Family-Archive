"use client";

import { useState } from "react";
import ArchiveCard from "@/components/archivecard";
import CreateArchiveCard from "@/components/createarchivecard";
import CreateCollectionModal from "@/components/createcollectionmodal";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const archives = [
    { imgUrl: "/images/gettyimages1.jpg", title: "Dratch Family Archive" },
    { imgUrl: "/images/gettyimages2.jpg", title: "Sisenwine Family Archive" },
  ];
  return (
    <div
      className={`${modalVisible ? "h-screen overflow-y-hidden" : ""} relative`}
    >
      <div className="p-4 pt-20 bg-gray-50">
        <section>
          <div className="flex justify-between">
            <h1 className="text-lg font-black text-gray-800">My Collections</h1>
            <span
              onClick={() => setModalVisible(true)}
              className="hidden sm:block"
            >
              <button className="flex items-center gap-1 text-sm hover:shadow hover:text-teal-600 hover:border-teal-600 transition-all border-2 border-teal-500 bg-white rounded-2xl px-2 text-teal-500 font-bold">
                New Collection
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
            </span>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center pt-4">
            {archives.map((item, index) => {
              return <ArchiveCard key={index} data={item}></ArchiveCard>;
            })}
            <div className="w-full" onClick={() => setModalVisible(true)}>
              <CreateArchiveCard></CreateArchiveCard>
            </div>
          </div>
        </section>
      </div>

      <div
        className={`transition-all duration-300 w-full z-10 fixed bottom-0 inset-0 sm:flex sm:items-center sm:justify-center ${
          modalVisible ? "bg-black bg-opacity-50" : "pointer-events-none"
        }`}
        onClick={() => setModalVisible(false)}
      >
        <div
          className={`transition-all duration-300 w-full absolute bottom-0 transform ${
            modalVisible
              ? "translate-y-0"
              : "translate-y-full sm:translate-y-[150%]"
          } sm:w-fit sm:relative`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CreateCollectionModal></CreateCollectionModal>
        </div>
      </div>
    </div>
  );
}
