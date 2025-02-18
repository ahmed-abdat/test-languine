import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Stats from "@/components/sections/Stats";
import Gallery from "@/components/sections/Gallery";
import GallerySkeleton from "@/components/sections/GallerySkeleton";
import { Suspense } from "react";
import { getPhotos } from "@/actions/unsplash";
import { useLocale } from "next-intl";

interface PageProps {
  searchParams: { q?: string };
}

export default async function Home({ searchParams }: PageProps) {
  const locale = useLocale();
  console.log("Current locale:", locale);

  // Define search queries for different languages
  const searchQueries = {
    en: "street photography",
    fr: "photographie de rue paris",
    ar: "تصوير الشارع العربي",
  };

  try {
    // Use search query if provided, otherwise use default language-based query
    const searchQuery =
      searchParams.q ||
      searchQueries[locale as keyof typeof searchQueries] ||
      "street photography";

    console.log("Using search query:", searchQuery);

    const result = await getPhotos({
      query: searchQuery,
      page: 1,
      perPage: 9,
    });

    console.log("API result received:", {
      hasPhotos: result.photos.length > 0,
      hasError: "error" in result,
    });

    // If there's an error in the result, throw it
    if ("error" in result) {
      console.error("Error from API:", result.error);
      throw new Error(result.error);
    }

    return (
      <main className="flex min-h-screen flex-col items-center">
        <Hero />
        <Suspense fallback={<GallerySkeleton count={9} />}>
          <Gallery
            initialPhotos={result.photos}
            initialHasMore={result.hasMore}
          />
        </Suspense>
        <Features />
        <Stats />
      </main>
    );
  } catch (error) {
    console.error("Error in page component:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return (
      <main className="flex min-h-screen flex-col items-center">
        <Hero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Unable to load photos
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {error instanceof Error
                  ? error.message
                  : "Please try again later"}
              </p>
            </div>
          </div>
        </section>
        <Features />
        <Stats />
      </main>
    );
  }
}
