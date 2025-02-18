"use client";

import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { getPhotos } from "@/actions/unsplash";
import GallerySkeleton from "./GallerySkeleton";
import PhotoCard from "./PhotoCard";
import { useTranslations } from "next-intl";
import { Photo } from "@/types/photo";

interface InfinitePhotosProps {
  initialPhotos: Photo[];
  initialHasMore: boolean;
}

export default function InfinitePhotos({
  initialPhotos,
  initialHasMore,
}: InfinitePhotosProps) {
  const t = useTranslations("Gallery");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Reset state when search query changes
  useEffect(() => {
    startTransition(() => {
      setPhotos(initialPhotos);
      setPage(1);
      setHasMore(initialHasMore);
    });
  }, [searchQuery, initialPhotos, initialHasMore]);

  const loadMorePhotos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await getPhotos({
        query: searchQuery || undefined,
        page: nextPage,
        perPage: 9,
      });

      if ("error" in result) {
        throw new Error(result.error);
      }

      startTransition(() => {
        setPhotos((prev) => [...prev, ...result.photos]);
        setPage(nextPage);
        setHasMore(result.hasMore);
      });
    } catch (error) {
      console.error("Error loading more photos:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, searchQuery]);

  useEffect(() => {
    if (inView && !isPending) {
      loadMorePhotos();
    }
  }, [inView, loadMorePhotos, isPending]);

  if (photos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={ref} className="mt-8">
        {(loading || isPending) && <GallerySkeleton count={3} />}
        {!hasMore && photos.length > 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("noMorePhotos")}
          </p>
        )}
      </div>
    </div>
  );
}
