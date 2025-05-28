import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Effect to handle body scroll when navbar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="flex justify-between items-center lg:mx-[9.5rem] py-3 bg-white relative font-epilogue">
      {/* logo - added aria-label */}
      <Link to="/" aria-label="Home">
        <span className="flex w-[9rem] mx-4 lg:mx-0 text-secondary font-black text-3xl">
          SABER
          <span className="text-primary">s</span>
        </span>
      </Link>

      {/* menu desktop - added aria-current */}
      <div className="hidden lg:flex space-x-6 text-base font-poppins font-normal">
        <Link
          to="/"
          aria-current={window.location.pathname === "/" ? "page" : undefined}
        >
          Home
        </Link>
        <Link
          to="/about"
          aria-current={
            window.location.pathname === "/about" ? "page" : undefined
          }
        >
          About
        </Link>
        <Link
          to="/services"
          aria-current={
            window.location.pathname === "/services" ? "page" : undefined
          }
        >
          Services
        </Link>
      </div>
      <div className="hidden lg:flex mx-4 font-medium">
        <Link
          className="button-primary py-2 text-sm px-8 !font-medium"
          to="/contact-us"
          aria-label="Contact Us"
        >
          Contact Us
        </Link>
      </div>

      {/* hamburger button - improved accessibility */}
      <button
        onClick={toggle}
        className="lg:hidden mx-4 flex items-center z-[9999]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            className="w-12 h-12 text-white bg-primary rounded-3xl px-2 py-1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 6l12 12"></path>
            <path d="M6 18l12-12"></path>
          </svg>
        ) : (
          <svg
            className="w-10 h-10 text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M4 6h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 18h16"></path>
          </svg>
        )}
      </button>

      {/* menu mobile - added aria-hidden */}
      <div
        className={`lg:hidden m-0 absolute top-0 text-white -left-20 w-full bg-secondary h-[100dvh] flex flex-col items-center justify-center space-y-6 transition-transform duration-300 z-[9950] ${
          isOpen ? "translate-x-20" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header for mobile menu - kept original styling */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
          <span className="my-4 font-poppins font-black text-3xl">
            SABER
            <span>s</span>
          </span>
          <button
            onClick={toggle}
            className="text-white"
            aria-label="Close menu"
          >
            {/* Close icon would go here */}
          </button>
        </div>

        {/* Mobile menu links - added aria-current */}
        <div className="flex flex-col pt-64 items-center h-dvh space-y-6">
          <Link
            to="/"
            className="text-xl"
            onClick={toggle}
            aria-current={window.location.pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-xl"
            onClick={toggle}
            aria-current={
              window.location.pathname === "/about" ? "page" : undefined
            }
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-xl"
            onClick={toggle}
            aria-current={
              window.location.pathname === "/services" ? "page" : undefined
            }
          >
            Services
          </Link>
          <Link
            className="button-primary mx-auto py-3 text-sm px-4"
            to="/contact-us"
            onClick={toggle}
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
