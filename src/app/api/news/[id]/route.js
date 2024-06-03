// Import necessary modules
import connectDatabase from "@/lib/database";
import News from "@/models/News"; // Assuming you have a News model
import { NextResponse } from "next/server";

// Define the GET route handler to get a news article by ID
export async function GET(request, { params }) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract news article ID from the request parameters
    const { id } = params;

    // Retrieve the news article by ID
    const newsArticle = await News.findById(id);

    // Check if the news article exists
    if (!newsArticle) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    // Return the news article data as a JSON response
    return NextResponse.json({ newsArticle }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to fetch news article", details: error.message }, { status: 500 });
  }
}

// Define the PUT route handler to update a news article by ID
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const requestData = await request.json();
    const { title, description, imageUrl } = requestData;

    // Ensure database connection
    await connectDatabase();

    // Find the news article by ID and update its properties
    const updatedNewsArticle = await News.findByIdAndUpdate(
      id,
      {
        title,
        description,
        imageUrl
      },
      { new: true }
    );

    // Check if the news article exists
    if (!updatedNewsArticle) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    // Return a success response with the updated news article data
    return NextResponse.json({ success: true, newsArticle: updatedNewsArticle }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    console.error("Error updating news article:", error);
    return NextResponse.json({ error: "Failed to update news article", details: error.message }, { status: 500 });
  }
}

// Define the DELETE route handler to delete a news article by ID
export async function DELETE(request, { params }) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract news article ID from the request parameters
    const { id } = params;

    // Delete the news article by ID
    const deletedNewsArticle = await News.findByIdAndDelete(id);

    // Check if the news article exists
    if (!deletedNewsArticle) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    // Return a success response with the deleted news article data
    return NextResponse.json({ success: true, newsArticle: deletedNewsArticle }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to delete news article", details: error.message }, { status: 500 });
  }
}
