import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary h-auto w-full" role="contentinfo">
      <section className="w-full md:mx-auto">
        <div className="flex flex-col mx-auto md:mx-[9.75em]">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-center font-poppins font-medium text-4xl md:justify-between md:items-start text-white my-8">
            {/* Project CTA Section */}
            <div className="flex md:items-center md:justify-center lg:justify-end flex-col mb-6 md:w-3/6 w-full">
              <h2 className="text-center md:text-right md:text-8xl mb-7 md:mr-0 lg:mr-auto">
                Want to start a project?
              </h2>
              <a
                href="/contact-us"
                className="mx-auto md:mx-0 md:ml-auto text-sm font-space font-medium border border-white px-3 bg-white text-secondary py-1 rounded-4xl flex justify-center relative items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Contact us to start a project"
              >
                <span className="relative">Let's Talk</span>
                <span className="bg-primary text-white relative left-1 p-2 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </div>

            {/* Contact Info Section */}
            <address className="flex items-center flex-col md:justify-center md:my-auto md:items-end not-italic">
              <div className="flex flex-row gap-2 md:justify-end">
                {[
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com",
                    icon: "/linked-in.png",
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com",
                    icon: "/facebook.png",
                  },
                  {
                    name: "Twitter",
                    url: "https://www.twitter.com",
                    icon: "/twitter.png",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-10 h-auto min-w-10"
                      width="40"
                      height="40"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
              <a
                href="tel:+622182436541"
                className="font-epilogue text-sm font-normal mt-6 text-center md:text-right md:justify-end hover:text-gray-300 transition-colors duration-200"
              >
                (+62) 21 8243 6541
              </a>
              <a
                href="mailto:support@sabers.co.id"
                className="font-epilogue text-sm font-normal mt-2 text-center md:text-right hover:text-gray-300 transition-colors duration-200"
              >
                tsupport@sabers.co.id
              </a>
              <h2 className="md:hidden text-3xl font-black text-white text-center mt-8">
                SABERs
              </h2>
            </address>
          </div>

          {/* Navigation Section */}
          <nav aria-label="Footer navigation">
            <div className="hidden md:flex md:my-4 justify-between">
              <a
                href="/"
                className="text-3xl font-epilogue font-black text-white"
              >
                SABERs
              </a>
              <div className="flex gap-8 font-space text-lg">
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/services", label: "Services" },
                  { path: "/contact-us", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-white hover:text-gray-400 transition-colors duration-200"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Copyright Section */}
          <hr
            className="hidden md:block border-0 bg-white opacity-20 w-full h-[3px] mt-7 mb-6"
            aria-hidden="true"
          />
          <p className="hidden md:flex items-center justify-center text-center font-epilogue text-white text-[15px] mb-4">
            © {new Date().getFullYear()} Sumber Artho Bersaudara. All rights
            reserved
          </p>
        </div>
      </section>
    </footer>
  );
};

export { Footer };
