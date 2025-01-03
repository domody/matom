import React from "react";

// Headings
const H1 = ({ children }) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};

const H2 = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

const H3 = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

// Text
const Bold = ({ children }) => {
  return <strong>{children}</strong>;
};

const Italic = ({ children }) => {
  return <em>{children}</em>;
};

const Strikethrough = ({ children }) => {
  return <del>{children}</del>;
};

// Horizontal Rule
const HorizontalRule = ({}) => {
  return <div className="h-px w-full my-4 bg-dark-200" />;
};

// OL

export { H1, H2, H3, Bold, Italic, Strikethrough, HorizontalRule };
