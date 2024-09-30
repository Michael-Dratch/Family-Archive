"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import XIcon from "./xicon";
import CollectionService from "@/services/collections/collections";

const CreateCollectionModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const handleClearFiles = () => {
    setFiles([]);
  };

  // Use the Dropzone hook
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: handleDrop,
    // You can add other options here, such as accepted file types
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await CollectionService.createCollection({
        title: title,
        description: description,
      });
    } catch (e) {
      switch (e.message) {
        case "MAX_COLLECTIONS":
          alert("You've reached the maximum collections limit.");
          break;
        default:
          console.log(e.message);
          alert(
            "There was an error creating the collection. Please try again later."
          );
          break;
      }
    }
  };

  return (
    <div className="bg-white border-2 rounded-t-xl sm:rounded-xl border-gray-200">
      <h1 className="p-4 font-semibold border-b border-gray-200">
        Create a New Collection
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <div className="flex flex-col ">
          <label className="font-semibold text-sm" htmlFor="title">
            Title
          </label>
          <input
            className="border border-gray-300 rounded p-2 bg-gray-50 h-10 focus:outline-teal-500"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-sm" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            cols="40"
            className="border border-gray-300 rounded bg-gray-50 p-2 focus:outline-teal-500"
          />
        </div>
        <div>
          <label className="font-semibold text-sm" htmlFor="imageUpload">
            Cover Image:
          </label>

          <section>
            <div
              className="p-8 text-gray-500 flex flex-col justify-center items-center border border-dashed border-gray-300 bg-gray-50 rounded p-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>

              <p className="pt-2 font-semibold">Upload a File</p>
              <p className="hidden sm:block text-sm">
                Drag and drop files here
              </p>
            </div>
            <aside>
              <ul className="mt-2">
                {files.map((file) => (
                  <li key={file.path} className="flex justify-between">
                    <span>
                      {file.path} - {(file.size / 1000).toFixed(0)} KB
                    </span>
                    <span
                      onClick={handleClearFiles}
                      className="text-gray-600 hover:outline hover:text-gray-500 outline-gray-300 rounded"
                    >
                      <XIcon size={6} strokeWidth={2}></XIcon>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </div>

        <button
          className="mx-auto text-gray-50 font-semibold rounded-3xl my-4 bg-teal-500 hover:bg-teal-600 w-fit px-8 py-2"
          type="submit"
        >
          Create Collection
        </button>
      </form>
    </div>
  );
};

export default CreateCollectionModal;
