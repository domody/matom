import React from "react";

// Maybe create button component for consistency
// Will need variations in padding, aspect-ratio, color, content
// Onclick: scale-90/95 for full buttons
// Need three colors: Default, Hover (lighter), Click (darker)
// Icon Button aswell ~ only needs hover state changes for bg and text clr

export const IconButton = ({ icon }) => {
  return (
    <button className="group aspect-square h-6 overflow-hidden rounded-lg text-dark-200 outline-none transition-all hover:bg-light-200 focus:outline-none dark:text-dark-100 dark:hover:bg-dark-700 dark:hover:text-light-100">
      <div className="flex h-full w-full items-center justify-center">
        {icon}
      </div>
    </button>
  );
};

