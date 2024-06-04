"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news articles");
        }
        const data = await response.json();
        setNewsArticles(data.newsArticles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black p-8 rounded-tl-lg lg:px-20 px-5">
      <h1 className="text-4xl  pb-8 w-full font-bold text-white">
        {" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Latest News
        </span>{" "}
        
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {newsArticles.map((article) => (
          <div key={article._id} className="relative">
            <div className="h-60 bg-cover bg-center rounded-tl-lg relative">
              <Image
                src={article.imageUrl}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="rounded-tl-lg"
              />
            </div>
            <div className="bg-black p-4 rounded-b-lg">
              <h2 className="text-xl font-bold mb-2 text-white">
                {article.title}
              </h2>
              <button className="mt-4 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
