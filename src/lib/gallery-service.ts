import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
  type Timestamp,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";

export interface GalleryImage {
  id: string;
  src: string;
  label: string;
  order: number;
}

const GALLERY_SEEDED_KEY = "gallery-static-seeded";

function timestampToOrder(value: Timestamp | number | undefined, fallback: number): number {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toMillis" in value) return value.toMillis();
  return fallback;
}

function storagePathFromUrl(url: string): string | null {
  if (!url.includes("firebasestorage.googleapis.com")) return null;

  try {
    const parsed = new URL(url);
    const objectMatch = parsed.pathname.match(/\/o\/(.+)$/);
    if (!objectMatch?.[1]) return null;
    return decodeURIComponent(objectMatch[1]);
  } catch {
    return null;
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "gallery"), orderBy("order", "asc")));

  return snapshot.docs
    .filter((entry) => entry.id !== "_meta")
    .map((entry, index) => {
      const data = entry.data();
      return {
        id: entry.id,
        src: data.src as string,
        label: data.label as string,
        order: timestampToOrder(data.order as Timestamp | number | undefined, index),
      };
    });
}

export async function saveGalleryImage(image: GalleryImage): Promise<void> {
  if (!db) throw new Error("Firestore is not configured.");

  await setDoc(
    doc(db, "gallery", image.id),
    {
      src: image.src,
      label: image.label.trim(),
      order: image.order,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function saveGalleryOrder(items: GalleryImage[]): Promise<void> {
  if (!db) throw new Error("Firestore is not configured.");
  if (!items.length) return;

  const firestore = db;
  const batch = writeBatch(firestore);
  items.forEach((item, index) => {
    batch.set(
      doc(firestore, "gallery", item.id),
      {
        src: item.src,
        label: item.label.trim(),
        order: index,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  });

  await batch.commit();
}

export async function deleteGalleryImage(id: string, src?: string): Promise<void> {
  if (!db) throw new Error("Firestore is not configured.");

  await deleteDoc(doc(db, "gallery", id));

  const storagePath = src ? storagePathFromUrl(src) : null;
  if (storage && storagePath?.startsWith("gallery/")) {
    try {
      await deleteObject(ref(storage, storagePath));
    } catch (error) {
      console.warn("Gallery storage object was already removed or could not be deleted.", error);
    }
  }
}

export async function seedGalleryIfEmpty(items: GalleryImage[]): Promise<GalleryImage[]> {
  const existing = await getGalleryImages();
  if (existing.length) return existing;

  if (typeof window !== "undefined" && window.localStorage.getItem(GALLERY_SEEDED_KEY) === "1") {
    return [];
  }

  if (!items.length) return [];

  await Promise.all(items.map((item, index) => saveGalleryImage({ ...item, order: index })));

  if (db) {
    await setDoc(
      doc(db, "gallery", "_meta"),
      {
        seeded: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(GALLERY_SEEDED_KEY, "1");
  }

  return getGalleryImages();
}

export async function uploadGalleryImage(file: File): Promise<string> {
  if (!storage) throw new Error("Firebase Storage is not configured.");

  const imageName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const imageRef = ref(storage, `gallery/${imageName}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

export async function galleryHasBeenInitialized(): Promise<boolean> {
  if (!db) return false;

  if (typeof window !== "undefined" && window.localStorage.getItem(GALLERY_SEEDED_KEY) === "1") {
    return true;
  }

  const metaSnap = await getDoc(doc(db, "gallery", "_meta"));
  return metaSnap.exists();
}
