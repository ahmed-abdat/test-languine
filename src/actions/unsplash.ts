"use server";

import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

// Check if the access key is available
const accessKey = process.env.UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  console.error("Missing UNSPLASH_ACCESS_KEY in environment variables");
  throw new Error(
    "UNSPLASH_ACCESS_KEY is not defined in environment variables"
  );
}

const unsplash = createApi({
  accessKey,
  fetch: nodeFetch as any,
});

interface GetPhotosParams {
  query: string;
  page?: number;
  perPage?: number;
}

export async function getPhotos({
  query = "street photography",
  page = 1,
  perPage = 9,
}: GetPhotosParams) {
  try {
    if (!query.trim()) {
      console.error("Empty search query provided");
      throw new Error("Search query cannot be empty");
    }

    // First try with the provided query
    let result = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation: "landscape",
    });

    // If we get too few results (less than perPage/2) and it's the first page, try with a more general query
    if (page === 1 && result.response?.results.length < perPage / 2) {
      console.log(
        `Got only ${result.response?.results.length} results for "${query}", trying with "street photography"`
      );
      result = await unsplash.search.getPhotos({
        query: "street photography",
        page,
        perPage,
        orientation: "landscape",
      });
    }

    if (result.errors) {
      console.error("Unsplash API errors:", result.errors);
      throw new Error(result.errors[0]);
    }

    if (!result.response?.results) {
      console.error("No results in API response");
      throw new Error("No results found");
    }

    // Transform and optimize the response to include only the data we need
    const photos = result.response.results.map((photo) => ({
      id: photo.id,
      urls: {
        // Only include the regular size for optimal loading
        regular: photo.urls.regular,
        // Add blur_hash for loading placeholder
        blur_hash: photo.blur_hash,
      },
      alt_description: photo.alt_description || "Street photography image",
      user: {
        name: photo.user.name,
      },
      likes: photo.likes,
      // Add color for better loading experience
      color: photo.color,
    }));

    return {
      photos,
      total: result.response.total || 0,
      totalPages: result.response.total_pages || 0,
      hasMore: page < (result.response.total_pages || 0),
    };
  } catch (error) {
    console.error("Error in getPhotos:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      photos: [],
      total: 0,
      totalPages: 0,
      hasMore: false,
      error: error instanceof Error ? error.message : "Failed to fetch photos",
    };
  }
}
