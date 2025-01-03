"use client";
import React, { useState, useEffect, useRef, use } from "react";
import db from "@lib/firestore";
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  Strikethrough,
  HorizontalRule,
} from "../_components/items";

export default function Page({ params }) {
  const { slug } = use(params);

  const textareaRef = useRef(null);
  const mdRef = useRef(null);

  const [htmlContent, setHtmlContent] = useState([]);
  const typingTimeout = useRef(null); // Use useRef for persisting the timeout value

  const [docData, setDocData] = useState([]);

  useEffect(() => {
    // Replace this with the correct doc reference using `doc()` method
    const fetchDocument = async () => {
      const docRef = doc(db, "docs", slug); // Use slug or your specific doc ID
      const docSnapshot = await getDoc(docRef); // Fetch the document

      if (docSnapshot.exists()) {
        setDocData(docSnapshot.data()); // Store document data
        console.log(docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchDocument();
  }, [slug]); // Only re-run effect when `slug` changes

  // useEffect(() => {
  //   // Add event listener on component mount
  //   const handleKeyDown = () => {
  //     if (typingTimeout.current != undefined)
  //       clearTimeout(typingTimeout.current);
  //     setTyping(true);
  //     typingTimeout.current = setTimeout(callServerScript, 500);
  //   };

  //   const textarea = textareaRef.current;
  //   textarea.addEventListener("keydown", handleKeyDown);

  //   // Cleanup event listener on unmount
  //   return () => {
  //     textarea.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []); // Empty dependency array ensures this effect runs only once on mount

  const callServerScript = async (newDocData) => {
    const docRef = doc(db, "docs", slug);
    try {
      // Save the updated document body to Firestore using the new data
      await setDoc(docRef, newDocData, { merge: true });
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      console.log(newDocData);
    }
  };

  const updateDocData = async (title, body) => {
    // if (typingTimeout.current != undefined) clearTimeout(typingTimeout.current);
    // typingTimeout.current = setTimeout(() => callServerScript(newDocData), 500);

    const newDocData = { body: body, title: title };
    setDocData(newDocData);
    const html = parseLines(body);
    // mdRef.innerHtml = html;
    setHtmlContent(html);
  };

  function parseLines(md) {
    const lines = md.split("\n");

    return lines.map((line, index) => {
      return parseMarkdown(line, index);
    });
  }

  function parseMarkdown(line, index) {
    // console.log(line, index)

    // Headings 1 -> 3
    if (line.match(/^# (.*)/)) {
      return <H1 key={index}>{line.replace(/^# /, "")}</H1>;
    }
    if (line.match(/^## (.*)/)) {
      return <H2 key={index}>{line.replace(/^## /, "")}</H2>; // Use your H2 component
    }
    if (line.match(/^### (.*)/)) {
      return <H3 key={index}>{line.replace(/^### /, "")}</H3>;
    }

    // Bold Text
    if (line.match(/\*\*(.*)\*\*/)) {
      const new_line = parseMarkdown(line.replace(/\*\*(.*?)\*\*/, "$1"), index)

      console.log(new_line)

      return <Bold key={index}>{final_line.replace(/\*\*(.*?)\*\*/, "$1")}</Bold>;
    }

    // Italic Text
    if (line.match(/\*(.*)\*/)) {
      return <Italic key={index}>{line.replace(/\*(.*?)\*/, "$1")}</Italic>;
    }

    if (line.match(/\_(.*)\_/)) {
      // console.log("italic" + index)
      return <Italic key={index}>{line.replace(/\_(.*?)\_/, "$1")}</Italic>;
    }

    // Strikethrough
    if (line.match(/\~\~(.*)\~\~/)) {
      return (
        <Strikethrough key={index}>
          {line.replace(/\~\~(.*?)\~\~/, "$1")}
        </Strikethrough>
      );
    }

    // Horizontal Rule
    if (line.match(/\-\-\-/)) {
      return <HorizontalRule key={index} />;
    }

    // Default for normal text
    return <p key={index}>{line}</p>;
  }

  return (
    <div className="mx-auto mt-8 flex h-full w-full flex-col px-16">
      <div className="hidden text-2xl font-semibold text-green-500"></div>
      <div className="mb-4 flex h-12 w-full items-center justify-start">
        <H2 className="text-3xl font-bold">{docData.title}</H2>
      </div>

      <div className="flex h-full w-full items-center justify-start">
        <div className="flex h-full w-1/3 items-start justify-start overflow-hidden border-r">
          <textarea
            className="h-full w-full resize-none bg-transparent pt-2 text-light-500 focus:outline-none"
            name=""
            id="textarea"
            ref={textareaRef}
            value={docData.body}
            onChange={(e) => updateDocData(docData.title, e.target.value)}
          ></textarea>
        </div>

        <div
          ref={mdRef}
          className="flex h-full w-1/2 flex-col items-start justify-start overflow-hidden pl-16"
        >
          {htmlContent}
        </div>
      </div>
    </div>
  );
}

// setDocData({
//   body: e.target.value,
//   title: docData.title,
// })
