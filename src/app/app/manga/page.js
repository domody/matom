"use client";
import React, { useState, useRef, useEffect } from "react";
import "../../globals.css";

export default function Page({ params }) {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      {images.length === 0 ? (
        <>
          <a
            href="/app/manga/chapters"
            className="mb-16 border-gray-600 bg-gray-700/15 px-4 py-1.5 border rounded-md"
          >
            Go to chapters
          </a>
          <div className="flex h-48 w-96 items-center justify-center rounded-md border border-dashed border-gray-500 bg-gray-700/15">
            <label
              htmlFor="upload"
              className="cursor-pointer text-center text-gray-300"
            >
              Click to upload or drag and drop images
              <input
                id="upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-start justify-center overflow-y-scroll rounded-md">
          <div className="h-full w-1/2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Uploaded ${index}`}
                className="mb-2 w-full object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
