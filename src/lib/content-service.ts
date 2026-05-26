import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface MediumPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  coverImage?: string;
}

function timestampToIso(value: Timestamp | string | undefined, fallback = ""): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value.toDate().toISOString().split("T")[0];
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "guestbook"), orderBy("createdAt", "desc")));

  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      name: data.name as string,
      message: data.message as string,
      createdAt: timestampToIso(data.createdAt as Timestamp | string, "Recently"),
    };
  });
}

export async function submitGuestbookEntry(name: string, message: string, email?: string): Promise<boolean> {
  if (!db) return false;

  await addDoc(collection(db, "guestbook"), {
    name: name.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  });

  if (email?.trim()) {
    await subscribeMailingList(email.trim(), "guestbook");
  }

  return true;
}

export async function subscribeMailingList(email: string, source: string): Promise<boolean> {
  if (!db) return false;

  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return false;

  await setDoc(
    doc(db, "mailingList", normalized),
    {
      email: normalized,
      source,
      subscribedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return true;
}

export async function submitContactMessage(name: string, email: string, message: string): Promise<boolean> {
  if (!db) return false;

  await addDoc(collection(db, "contactMessages"), {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  });

  return true;
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, "mediumPosts"), orderBy("date", "desc")));

  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      slug: data.slug as string,
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      readTime: data.readTime as string,
      url: data.url as string,
      tags: (data.tags as string[]) ?? [],
      coverImage: data.coverImage as string | undefined,
    };
  });
}

export async function saveMediumPost(post: Omit<MediumPost, "id">): Promise<boolean> {
  if (!db) return false;

  const snapshot = await getDocs(query(collection(db, "mediumPosts"), where("slug", "==", post.slug)));
  if (snapshot.empty) {
    await addDoc(collection(db, "mediumPosts"), post);
  } else {
    await updateDoc(snapshot.docs[0].ref, post);
  }

  return true;
}

export async function deleteMediumPost(id: string): Promise<boolean> {
  if (!db) return false;
  await deleteDoc(doc(db, "mediumPosts", id));
  return true;
}
