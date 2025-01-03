"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

const DeletePage = ({ deleteDocument, docId }) => {
  const router = useRouter();
  const docRef = docId;

  const handleClick = async () => {
    try {
      await deleteDocument(docRef);
      try {
        router.push(`/app`);
      } catch (error) {
        console.error("Error creating document:", error);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded transition-all hover:bg-red-500/75"
      onClick={handleClick}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};

export default DeletePage;
