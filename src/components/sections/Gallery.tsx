import { useTranslations } from "next-intl";
import SearchInput from "./SearchInput";
import InfinitePhotos from "./InfinitePhotos";
import { Photo } from "@/types/photo";

interface GalleryProps {
  initialPhotos: Photo[];
  initialHasMore: boolean;
}

export default function Gallery({
  initialPhotos,
  initialHasMore,
}: GalleryProps) {
  const t = useTranslations("Gallery");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <SearchInput />
        <InfinitePhotos
          initialPhotos={initialPhotos}
          initialHasMore={initialHasMore}
        />
      </div>
    </section>
  );
}
