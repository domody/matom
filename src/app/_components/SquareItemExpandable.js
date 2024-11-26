import React from "react";

const SquareItemExpandable = () => {
  return (
    <div className="flex aspect-[10/7] w-full cursor-pointer flex-col items-start justify-start rounded-lg border border-gray-100 p-1 transition-all hover:border-gray-100">
      <div className="h-full w-full rounded-md border border-gray-100"></div>
      <div className="mt-auto flex flex-col items-start justify-start px-1 pt-2">
        <h1 className="text-xl">Larger title goes here</h1>
      </div>
    </div>
  );
};

export default SquareItemExpandable;
