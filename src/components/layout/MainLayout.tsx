import { ReactNode, useState, useEffect } from "react";
import Navbar from "../template/Navbar";
import { Footer } from "../template/Footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="m-0 p-0 relative">
      <Navbar />
      <main className="m-0 p-0">{children}</main>
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`
            fixed bottom-8 right-8 z-50 p-3 
            bg-primary rounded-full shadow-lg 
            border-2 border-primary
            transition-all duration-300 ease-in-out
            hover:bg-white hover:text-primary hover:border-primary
            transform hover:scale-110
            animate-[bounce_2s_infinite]
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white transition-colors duration-300 hover:text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MainLayout;
