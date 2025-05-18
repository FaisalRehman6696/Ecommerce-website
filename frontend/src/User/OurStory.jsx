import React from "react";

const OurStory = () => {
  return (
    <>
    <section class="grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto gap-16 items-center px-4 sm:px-8 lg:px-20 py-16">
  
    <div class="relative w-full max-w-md mx-auto lg:mx-0">
      <div class="absolute -left-10 sm:-left-16 -bottom-10 sm:-bottom-16 bg-orange-300 w-full h-full z-0 rounded-md"></div>
      <img
        src="https://theshinecraft.store/images/tem_img/img2.jpg"
        alt="Rolex Watch"
        class="relative z-10 w-full shadow-md rounded-md"
      />
    </div>
  
    
    <div class="text-center lg:text-left">
      <div class="w-16 h-[1px] bg-orange-400 mx-auto lg:mx-0 mt-2 mb-4"></div>
      <h2 class="text-2xl font-semibold tracking-widest text-gray-800 mb-4">
        OUR STORY
      </h2>
      <h2 class="text-3xl md:text-4xl font-semibold mb-4">
        Inspirational Watch of this year
      </h2>
      <p class="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0">
        The latest and modern watches of this year are available in various
        presentations in this store — discover them now.
      </p>
      <button class="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
        Discover
      </button>
    </div>
  </section>
  
    </>
  );
};

export default OurStory;
