"use client"
import React, { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

function NewsForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const generatedId = v4();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageUpload) return;

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

    if (!imageUpload || imageUrl === "" || title === "" || description === "") {
      console.error("Please fill out all fields and upload an image before submitting the form.");
      return;
    }

    setLoading(true);

    const formData = {
      title,
      description,
      imageUrl,
      folderId: generatedId,
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit news data: " + response.status);
      }

      const data = await response.json();
      console.log("News submitted successfully:", data.news);
    } catch (error) {
      console.error("Error submitting news data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full px-4">
      <Link href="/dashboard" className="text-center flex items-center">
        Back to home
      </Link>
      <h1 className="text-3xl font-medium mb-6 mt-10">Upload your news article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full"
          />
        </div>
        <div>
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer border border-gray-300 text-black px-4 py-3 rounded-md inline-block"
          >
            Choose news image
          </label>
          {imageUpload && (
            <button
              type="button"
              onClick={uploadImage}
              className="ml-4 bg-black text-white px-4 py-3 rounded-md"
            >
              Upload Image
            </button>
          )}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="News Image"
              className="mt-2 object-cover rounded-md"
              width={200}
              height={200}
            />
          )}
        </div>
        <div className="flex items-center justify-center w-full mt-10">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload News"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;
