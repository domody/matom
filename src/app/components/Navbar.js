import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-screen items-center justify-center pt-4">
      <div className="z-50 flex h-12 w-full container items-center justify-between overflow-hidden rounded-xl border border-gray-300 bg-white/50 backdrop-blur-md"></div>
    </nav>
  );
};

export default Navbar;
