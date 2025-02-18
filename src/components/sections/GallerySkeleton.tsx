import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface GallerySkeletonProps {
  count?: number;
}

export default function GallerySkeleton({ count = 9 }: GallerySkeletonProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Skeleton className="h-12 w-[250px] mx-auto" />
            <Skeleton className="h-6 w-[300px] mx-auto" />
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(count)].map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-xl">
              <div className="relative aspect-[4/3] bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
