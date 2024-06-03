// Import the necessary modules and models
import connectDatabase from "@/lib/database";
import News from "@/models/News"; // Assuming you have a News model
import { NextResponse } from "next/server";

// Define the POST route handler for creating news articles
export async function POST(request) {
  try {
    // Parse the request body to extract news data
    const { title, description, imageUrl,   folderId } = await request.json();

    // Ensure database connection
    await connectDatabase();

    // Create a new news article document
    const newNews = new News({
      title,
      description,
      imageUrl,
      folderId
    });

    await newNews.save();

    // Return a success response with a message
    return NextResponse.json({ message: "News Article Created" }, { status: 201 });
  } catch (error) {
    // Return an error response if something goes wrong
    console.error("Failed to create news article:", error);
    return NextResponse.json({ error: "Failed to create News Article", details: error.message }, { status: 500 });
  }
}

// Define the GET route handler for fetching news articles
export async function GET(request) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Retrieve news data
    const newsArticles = await News.find({}); // Retrieve all news articles, you can add conditions if needed

    // Return the news data as a JSON response
    return NextResponse.json({ newsArticles }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to fetch News Articles", details: error.message }, { status: 500 });
  }
}
