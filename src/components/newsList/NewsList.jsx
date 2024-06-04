"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditNewsForm from "../editNewsForm/EditNewsForm";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // State to track the ID of the news article being edited

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data.newsArticles)) {
          setNews(data.newsArticles);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit news item with ID:", id);
    setEditingItemId(id); // Set the ID of the news article being edited
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the backend API endpoint
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        // Remove the deleted news article from the news state
        setNews((prevNews) => prevNews.filter((item) => item._id !== id));
        console.log("News item deleted successfully");
      } else {
        // Handle the case where the request was not successful
        // You can display an error message or perform other actions
        console.error("Failed to delete news item");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error deleting news item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-start items-center gap-4 w-full">
      {Array.isArray(news) && news.length > 0 ? (
        news.map((item) => (
          <div key={item.id} className="mb-4">
            <h3 className="text-lg font-semibold py-4">{item.title}</h3>
            <Image src={item.imageUrl} alt="News Image" width={400} height={200} className="object-fit"/>
            <div className="flex mt-2 gap-4">
              <button
                onClick={() => handleEdit(item._id)} 
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)} 
                className=" text-black border border-black font-semibold py-3 px-8 rounded-tl-lg rounded-br-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No news available</div>
      )}

      {/* Render EditNewsForm if editingItemId is set */}
      {editingItemId && <EditNewsForm itemId={editingItemId} setEditingItemId={setEditingItemId} />}
    </div>
  );
};

export default NewsList;
