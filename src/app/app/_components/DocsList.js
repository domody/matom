"use client"

import React, { useState, useEffect } from "react";
import db from "@lib/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import DeletePage from "./DeletePage";
import { deleteDocument } from "./deleteDocument";

const DocsList = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // Define the reference to the collection
    const docsRef = collection(db, "docs");

    // Set up the onSnapshot listener
    const unsubscribe = onSnapshot(docsRef, (querySnapshot) => {
      const docData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setDocs(docData);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  return (
    <>
      {docs.map((doc) => (
        <a
          href={`/app/docs/${doc.id}`}
          className="flex w-full cursor-pointer items-center justify-between rounded px-2 py-1 text-light-700 hover:bg-dark-800"
          key={doc.id}
        >
          <p className="text-sm">{doc.title}</p>
          <DeletePage deleteDocument={deleteDocument} docId={doc.id} />
        </a>
      ))}
    </>
  );
};

export default DocsList;
