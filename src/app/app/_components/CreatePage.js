"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { PenBox } from "lucide-react";

const CreatePage = ({ createDocument }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const id = await createDocument();
      router.push(`/app/docs/${id}`);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group aspect-square h-6 overflow-hidden rounded-lg text-dark-200 outline-none transition-all hover:bg-light-200 focus:outline-none dark:text-dark-100 dark:hover:bg-dark-700 dark:hover:text-light-100"
    >
      <div className="flex h-full w-full items-center justify-center">
        <PenBox className="h-4 w-4" />
      </div>
    </button>
  );
};

export default CreatePage;
