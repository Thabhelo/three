import { useCallback, useEffect, useState } from "react";
import { galleryImages as staticGalleryImages } from "@/content/site";
import { getGalleryImages, type GalleryImage } from "@/lib/gallery-service";
import { isFirebaseConfigured } from "@/lib/firebase";

type UseGalleryOptions = {
  /** When true, never fall back to static seed images (admin editor mode). */
  firebaseOnly?: boolean;
};

export function useGallery(options?: UseGalleryOptions) {
  const firebaseOnly = options?.firebaseOnly ?? false;

  const [images, setImages] = useState<GalleryImage[]>(
    staticGalleryImages.map((item, index) => ({
      id: item.id,
      src: item.src,
      label: item.label,
      order: index,
    })),
  );
  const [loading, setLoading] = useState(isFirebaseConfigured());
  const [source, setSource] = useState<"firebase" | "static">("static");

  const refresh = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      setImages(
        staticGalleryImages.map((item, index) => ({
          id: item.id,
          src: item.src,
          label: item.label,
          order: index,
        })),
      );
      setSource("static");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const fetched = await getGalleryImages();
      if (fetched.length) {
        setImages(fetched);
        setSource("firebase");
      } else if (firebaseOnly) {
        setImages([]);
        setSource("firebase");
      } else {
        setImages(
          staticGalleryImages.map((item, index) => ({
            id: item.id,
            src: item.src,
            label: item.label,
            order: index,
          })),
        );
        setSource("static");
      }
    } catch (error) {
      console.error("Failed to load gallery:", error);
      if (firebaseOnly) {
        setImages([]);
        setSource("firebase");
      } else {
        setImages(
          staticGalleryImages.map((item, index) => ({
            id: item.id,
            src: item.src,
            label: item.label,
            order: index,
          })),
        );
        setSource("static");
      }
    } finally {
      setLoading(false);
    }
  }, [firebaseOnly]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { images, loading, source, refresh };
}
