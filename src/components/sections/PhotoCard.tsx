import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Heart } from "lucide-react";
import { Photo } from "@/types/photo";

interface PhotoCardProps {
  photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  // Create a base64 blur data URL using the photo's color
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${
      photo.color || "#e2e8f0"
    }"/></svg>`
  ).toString("base64")}`;

  return (
    <Card className="group overflow-hidden rounded-xl">
      <CardContent className="p-0 relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800">
          <Image
            src={photo.urls.regular}
            alt={photo.alt_description || "Street photography"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4" />
                <span className="text-sm">{photo.user.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="text-xs">{photo.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
