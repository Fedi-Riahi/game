"use client"
import React, { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditNewsForm = ({ itemId, setEditingItemId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the news article data based on the itemId
    const fetchNewsItem = async () => {
      try {
        const response = await fetch(`/api/news/${itemId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { title, description, imageUrl } = data.newsArticle;
        setTitle(title);
        setDescription(description);
        setImageUrl(imageUrl);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching news article:", error);
      }
    };

    fetchNewsItem();
  }, [itemId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageUpload) return;

    const generatedId = itemId; // Assuming itemId is the folderId
    const imageRef = ref(storage, `news_images/${generatedId}/${imageUpload.name}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      alert("Image Uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = {
      title,
      description,
      imageUrl,
    };

    try {
      const response = await fetch(`/api/news/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update news article: " + response.status);
      }

      // Reset form state
      setTitle("");
      setDescription("");
      setImageUpload(null);
      setImageUrl("");
      setLoading(false);
      setEditingItemId(null); // Close the EditNewsForm
      console.log("News article updated successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error updating news article:", error);
    }
  };

  return (
    <div>
      <h2>Edit News Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="edit-title">Title</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="edit-fileInput"
          />
          <label
            htmlFor="edit-fileInput"
            className="cursor-pointer border border-gray-300 text-black px-4 py-3 rounded-md inline-block"
          >
            Choose news image
          </label>
          <button
            type="button"
            onClick={uploadImage}
            className="ml-4 bg-black text-white px-4 py-3 rounded-md"
          >
            Upload Image
          </button>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="News Image"
              className="mt-2 object-cover rounded-md"
              width={200}
              height={200}
            />
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditNewsForm;
