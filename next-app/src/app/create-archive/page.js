"use client";
import { useState } from "react";

const CreateArchivePage = () => {
  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArchive = {
      coverImage,
      title,
      description,
    };

    // TODO: Add functionality to send newArchive to your server or API
    console.log("New Archive:", newArchive);

    // Reset form fields
    setCoverImage("");
    setTitle("");
    setDescription("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create a New Archive</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="coverImage">Cover Image URL:</label>
          <input
            type="text"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            cols="40"
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </div>

        <button type="submit">Create Archive</button>
      </form>
    </div>
  );
};

export default CreateArchivePage;
