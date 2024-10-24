// components/ScrollToTopButton.tsx
import React from "react";

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 p-3 flex justify-center items-center size-12 text-center shadow-xl bg-blue-500 text-white rounded-full  hover:bg-blue-700 transition-all text-3xl"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
