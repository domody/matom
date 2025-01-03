"use server";
import { doc, deleteDoc } from "firebase/firestore";
import db from "@lib/firestore";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId) {

  try {
    console.log(docId);
    const docRef = doc(db, "docs", docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error creating document:", error);
  }

  revalidatePath("/app/docs");
}
