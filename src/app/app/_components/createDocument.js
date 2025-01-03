"use server";
import { collection, addDoc } from "firebase/firestore";
import db from "@lib/firestore";
import { revalidatePath } from "next/cache";

export async function createDocument() {
  const docRef = await addDoc(collection(db, "docs"), {
    title: "New Page",
    body: "",
  });
  revalidatePath("/app/docs");
  return docRef.id;
}
