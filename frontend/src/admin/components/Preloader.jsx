import React from "react";

const Preloader = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    
    </>
  );
};

export default Preloader;
