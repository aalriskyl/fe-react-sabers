import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import Card from "../../../components/organisms/Card";
import "../../styles/marquee.css";
import api from "../../api/axios";
import LoadingSpinner from "../../../components/organisms/LoadingSpinner";

interface Slider {
  id: string;
  title: string;
  description: string | null;
  image: string;
}
interface Client {
  id: string;
  title: string;
  company: string;
  image: string;
  website: string | null;
  description: string | null;
  industry: string | null;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: string;
  location: string | null;
  title: string;
  description: string;
  thumbnail: string;
  category: string | null;
  start_date: string;
  end_date: string | null;
  status: string;
  client_name: string | null;
  client_company: string | null;
  images: ProjectImage[] | null;
}

interface ProjectImage {
  id: string;
  project_id: string;
  image_path: string;
  created_at: string;
  updated_at: string;
}

const HomeView = () => {
  const [clients, setClients] = useState<Slider[]>([]);
  const [projects, setProjects] = useState(0);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientsCount, setClientsCount] = useState(0);

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get<Project[]>("/api/projects");
        setProjectData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get<Client[]>("/api/sliders");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Animation for numbers
  useEffect(() => {
    const animateNumbers = () => {
      setProjects(0);
      setClientsCount(0); // Reset clients count

      const projectInterval = setInterval(() => {
        setProjects((prev) => {
          if (prev < 10) return prev + 1;
          clearInterval(projectInterval);
          return prev;
        });
      }, 100);

      const clientsInterval = setInterval(() => {
        setClientsCount((prev) => {
          if (prev < 20) return prev + 1;
          clearInterval(clientsInterval);
          return prev;
        });
      }, 50); // Faster animation for clients count since it goes to 20
    };

    animateNumbers();
    const loopInterval = setInterval(animateNumbers, 1000);

    return () => clearInterval(loopInterval);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 264;
  const gap = 16;

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + projectData.length) % projectData.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectData.length);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  return (
    <main className="m-0 w-full">
      {/* Hero Section */}
      <article className="relative flex flex-col m-0">
        {/* Mobile Hero */}
        <section
          className="rounded-3xl bg-[#DFE2EC] lg:hidden"
          aria-label="Company introduction"
        >
          <div
            className="h-screen relative flex flex-col sm:m-0 w-full"
            style={{
              backgroundImage: "url('/sabers-landing-sm.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label="Construction site with workers"
          >
            <div className="absolute opacity-80 inset-0 top-0 flex flex-col px-2 py-6">
              <h1 className="text-3xl text-white font-bold font-space text-center text-secondary pb-[1rem]">
                Expert Construction Service for Every Project
              </h1>
              <p className="text-center font-epilogue text-tertiary px-2 rounded">
                General Contractor, Civil Electrical, Power Systems and
                Telecommunication Network
              </p>
              <div
                className="flex row items-center justify-center gap-2 mt-4"
                role="status"
              >
                <span className="px-3 border-2 rounded-3xl text-[16px] text-secondary font-space font-medium">
                  {clientsCount}+
                  <span className="font-epilogue font-normal text-sm">
                    {" "}
                    Clients
                  </span>
                </span>
                <span className="px-3 border-2 rounded-3xl text-[16px] text-secondary font-space font-medium ">
                  {projects}+
                  <span className="font-epilogue font-normal text-sm">
                    {" "}
                    Projects Completed
                  </span>
                </span>
              </div>
              <div className="button-primary mx-auto mt-4">
                <a
                  href="contact-us"
                  className="px-6 py-3 block"
                  aria-label="Contact us for construction services"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Hero */}
        <section
          className="hidden lg:flex h-screen max-h-screen overflow-hidden relative w-full bg-[#DFE2EC] rounded-[70px]"
          aria-label="Company introduction"
        >
          <div
            className="hidden lg:flex h-screen max-h-screen overflow-hidden relative w-full"
            style={{
              backgroundImage: "url('/sabers-landing-md.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label="Construction site overview"
          >
            <div className="absolute inset-0 flex flex-col h-full">
              <div className="w-6/12 text-left max-w-4xl pl-[9.5rem] my-[4rem]">
                <h1 className="text-4xl lg:text-[64px] text-white font-bold font-space text-secondary opacity-80 pb-[1rem]">
                  Expert Construction Service for Every Project
                </h1>
                <p className="block font-epilogue text-tertiary py-1 rounded max-w-2xl text-[20px]">
                  General Contractor, Civil Electrical, Power Systems and
                  Telecommunication Network
                </p>
                <div className="flex row gap-4 mt-6" role="status">
                  <span className="px-4 py-1 border-2 rounded-3xl text-lg text-secondary font-space font-medium">
                    {clientsCount}+
                    <span className="font-epilogue font-normal text-sm">
                      {" "}
                      Clients
                    </span>
                  </span>
                  <span className="px-4 py-1 border-2 rounded-3xl text-lg text-secondary font-space font-medium">
                    {projects}+
                    <span className="font-epilogue font-normal text-sm">
                      {" "}
                      Projects Completed
                    </span>
                  </span>
                </div>
                <button className="button-primary px-10 py-3 mt-12 w-auto hover:cursor-pointer font-epilogue text-xl">
                  <a href="contact-us">Contact Us</a>
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* About Section */}
      <section
        id="about"
        className="flex items-center justify-center py-8 mx-6 lg:mx-[9.5rem] mb-12 lg:mb-24"
        aria-labelledby="about-heading"
      >
        <div className="gap-8 lg:text-center lg:mx-auto lg:gap-0 max-w-6xl">
          <header className="text-primary font-space items-center font-medium text-[16px] tracking-widest">
            WHO ARE WE
          </header>
          <div>
            <h2
              id="about-heading"
              className="font-space font-bold text-3xl mb-3 text-secondary lg:text-4xl"
            >
              PT Sumber Arto Bersaudara
            </h2>
            <article className="font-epilogue text-sm text-[#808080] mb-6 lg:text-[18px] lg:leading-[36px]">
              <p>
                At PT Sumber Artha Bersaudara, we don’t just build structures–we
                are responsible to oversee and manage the construction process
                from planning, execution, to finalization. On top of that, we
                also prioritize HSE (Health, Safety, and Environment) practices
                to safeguard our employees and the work environment.
              </p>
            </article>
            <a
              href="/about"
              className="bg-white border-red-600 border-3 rounded-[30px] text-red-600 px-16 py-3 font-epilogue font-medium text-sm hover:cursor-pointer hover:bg-red-600 hover:border-white hover:text-white transition-all duration-300 ease-in-out lg:text-xl"
              aria-label="Learn more about our company lg:text-[20px]"
            >
              See Details
            </a>
          </div>
        </div>
      </section>

      {/* Project Footprints Section */}
      <section
        id="footprints"
        className="flex items-center justify-center py-8 mx-6 lg:mx-[4.5rem] lg:mb-24"
        aria-labelledby="footprints-heading"
      >
        <div className="gap-8 max-w-7xl">
          <div>
            <h2
              id="footprints-heading"
              className="font-space font-bold text-[28px] mb-3 text-secondary lg:mx-[5.5rem]"
            >
              Our Project Footprints
            </h2>
            <figure className="relative w-full h-screen max-h-[639px] overflow-hidden flex flex-col bg-[#EEEEEE] rounded-b-[3rem]">
              {/* Scrollable image area */}
              <div className="sm:hidden md:hidden flex-1 overflow-x-auto overflow-y-hidden lg:max-w-full">
                <img
                  src="/sabers-map-sm.png"
                  className="min-w-full h-full object-cover"
                  alt="Map showing our project locations on mobile"
                />
              </div>
              <div className="sm:flex hidden md:flex flex-1 overflow-x-auto overflow-y-hidden">
                <img
                  src="/sabers-map-lg.png"
                  className="min-w-full h-auto object-cover"
                  alt="Detailed map showing our project locations"
                />
              </div>
              {/* Absolute positioned header on top */}
              <figcaption className="absolute top-0 left-0 bg-secondary rounded-b-3xl w-full md:h-24 h-24 z-10 flex items-center justify-center lg:rounded-b-[70px] lg:h-[180px]">
                <div className="relative top-12 rounded-full lg:top-[90px]">
                  <button
                    className="inline-flex items-center bg-red-600 rounded-full text-white hover:bg-white hover:border-red-600 hover:text-red-600 border-white px-6 py-2 hover:cursor-pointer border-6 gap-2 transition-colors duration-200"
                    aria-label="View more project locations"
                  >
                    <a
                      href="/services"
                      className="whitespace-nowrap font-bold font-space"
                    >
                      SEE MORE
                    </a>
                    <span
                      className="text-inherit text-2xl items-center mt-0.5"
                      aria-hidden="true"
                    >
                      &gt;
                    </span>
                  </button>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Milestone Section */}
      <section
        id="milestone"
        className="flex py-4 mx-6 max-w-7xl md:mx-auto mb-12 lg:mb-12"
        aria-labelledby="milestone-heading"
      >
        <div className="w-full gap-8 overflow-hidden">
          <header className="flex flex-col mx-6 lg:mx-26 md:flex-row">
            <div className="flex-col md:mr-auto mb-[1rem] md:mb-0">
              <h2
                id="milestone-heading"
                className="md:hidden text-secondary font-bold text-2xl font-space"
              >
                Project Milestone
              </h2>
              <h2 className="hidden md:flex text-secondary font-bold text-2xl font-space">
                Project
              </h2>
              <h2 className="hidden md:flex text-secondary font-bold text-2xl font-space">
                Milestones
              </h2>
            </div>
            <div className="flex md:items-end flex-col lg:ml-auto">
              <p className="text-tertiary md:w-3/6 flex">
                General Civil Contractor, Electrical Power System and
                Telecommunication Network
              </p>
              <nav
                aria-label="Project navigation"
                className="hidden md:flex flex-row justify-start lg:justify-start gap-8 mt-4 font-space"
              >
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous project"
                  className={`rounded-full border-2 w-8 h-8 flex items-center justify-center cursor-pointer ${
                    currentIndex === 0
                      ? "border-gray-400 text-gray-400"
                      : "border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path
                      d="M5 12h14M5 12l6 6m-6-6l6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === projectData.length - 1}
                  aria-label="Next project"
                  className={`rounded-full border-2 w-8 h-8 flex items-center justify-center cursor-pointer ${
                    currentIndex === projectData.length - 1
                      ? "border-gray-400 text-gray-400"
                      : "border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path
                      d="M5 12h14m-6 6l6-6m-6-6l6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </header>
          <div className="mt-8 relative w-full">
            {/* Crane track line */}
            <div className="w-full bg-[#D6DBEA] h-1 mb-8 relative">
              <div className="absolute top-22 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <img
                  src="/crane.png"
                  alt="Construction crane icon"
                  className="w-16 h-auto"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Cards container with fade effects */}
            <div className="relative w-full overflow-hidden py-10">
              {/* Left fade overlay */}
              <div
                className="absolute left-0 top-0 h-full w-24 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
                }}
              ></div>

              {/* Right fade overlay */}
              <div
                className="absolute right-0 top-0 h-full w-24 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
                }}
              ></div>

              <div
                ref={containerRef}
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(calc(50% - ${cardWidth / 2}px - ${
                    (window.innerWidth < 1024
                      ? currentIndex === 0
                        ? 1
                        : currentIndex
                      : currentIndex) *
                    (cardWidth + gap)
                  }px))`,
                }}
                aria-live="polite"
              >
                {projectData.map((project, index) => {
                  const isActive =
                    index ===
                    (window.innerWidth < 1024
                      ? currentIndex === 0
                        ? 1
                        : currentIndex
                      : currentIndex);
                  return (
                    <article
                      key={project.id}
                      className="w-[264px] flex-shrink-0 transition-all duration-300"
                      style={{
                        transform: `scale(${isActive ? 1.05 : 1})`,
                        opacity: isActive ? 1 : 1,
                        zIndex: isActive ? 10 : 1,
                      }}
                      onClick={() => setCurrentIndex(index)}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <Card
                        backgroundImage={`https://api.sabers.web.id/uploads/projects/${project.images?.[0].image_path}`}
                        id={project.id}
                        title={project.title}
                        text={project.description}
                        category={project.description || "Uncategorized"}
                        isActive={isActive}
                        location={project.location || "Location not specified"}
                      />
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Mobile navigation buttons */}
            <nav
              aria-label="Project navigation"
              className="lg:hidden flex justify-center gap-8 mt-4"
            >
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? 1 : Math.max(1, prev - 1)
                  )
                }
                disabled={currentIndex === 1}
                aria-label="Previous project"
                className={`rounded-full border-2 w-8 h-8 cursor-pointer ${
                  currentIndex === 1
                    ? "border-gray-400"
                    : "border-red-600 bg-red-600 text-white"
                }`}
              >
                &lt;
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(projectData.length - 1, prev + 1)
                  )
                }
                disabled={currentIndex === projectData.length - 1}
                aria-label="Next project"
                className={`rounded-full border-2 w-8 h-8 cursor-pointer ${
                  currentIndex === projectData.length - 1
                    ? "border-gray-400"
                    : "border-red-600 bg-red-600 text-white"
                }`}
              >
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Expert Service Section */}
      <section
        className="flex py-4 mx-6 max-w-7xl md:mx-auto mb-12 lg:mb-24"
        aria-labelledby="expert-service-heading"
      >
        <div className="w-full gap-8 lg:mx-[8.5rem]">
          <article className="flex flex-col lg:flex-row">
            <div className="flex-col mx-auto md:mr-auto mb-[1rem] md:mb-0 w-full">
              <div className="relative flex items-center justify-center mx-4">
                {/* Large screen image */}
                <img
                  src="/expert-picture.png"
                  alt="Construction experts at work"
                  className="w-full md:flex md:mx-[9.5rem] hidden rounded-4xl h-auto object-cover"
                />
                {/* Mobile image */}
                <img
                  src="/expert-picture-sm.png"
                  alt="Construction team working on site"
                  className="w-full h-auto mx-16 rounded-4xl md:hidden flex"
                />

                {/* Text overlay */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-center md:items-center md:p-16">
                  <div className="flex flex-col mx-auto px-4 w-full max-w-[90%]">
                    <h2
                      id="expert-service-heading"
                      className="text-white text-lg sm:text-xl md:text-4xl font-space font-bold p-4 rounded-lg text-center mx-auto w-full lg:max-w-[620px]"
                    >
                      Expert Construction Service For Every Project
                    </h2>
                    <a
                      href="contact-us"
                      className="bg-primary text-white font-medium text-sm sm:text-base px-4 sm:px-6 py-1 sm:py-2 rounded-full hover:cursor-pointer mt-4 mx-auto whitespace-nowrap text-center font-space lg:text-sm lg:font-medium lg:px-8 hover:text-primary hover:bg-white transition-colors duration-300 ease-in-out"
                      role="button"
                      aria-label="Contact our expert team"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section
        className="flex py-4 mx-2 max-w-7xl md:mx-auto mb-12 lg:mb-24"
        aria-labelledby="trusted-companies-heading"
      >
        <div className="w-full gap-8 lg:mx-auto">
          <article className="flex flex-col lg:flex-row">
            <div className="flex-col mx-auto md:mr-auto mb-[1rem] md:mb-0 w-full">
              <div className="relative flex items-center justify-center mx-4">
                <div className="flex flex-col text-secondary">
                  <h2 className="md:hidden font-bold font-space text-3xl">
                    Trusted by The 10+ Companies
                  </h2>
                  <h2 className="hidden text-center mx-auto mb-6 md:flex font-bold font-space text-3xl">
                    Trusted by The 10+ Companies
                  </h2>

                  {/* Large screen marquee */}
                  <figure className="logo-marquee hidden lg:block">
                    <div className="logo-marquee__container">
                      {loading ? (
                        // Loading skeleton
                        [...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className="logo-marquee__item bg-gray-200 animate-pulse"
                            style={{ width: "160px" }}
                          ></div>
                        ))
                      ) : (
                        // Actual logos (duplicated for seamless loop)
                        <>
                          {[...clients, ...clients].map((slider, i) => (
                            <div
                              key={`${slider.id}-${i}`}
                              className="logo-marquee__item"
                            >
                              <img
                                src={`https://api.sabers.web.id/uploads/sliders/${slider.image}`}
                                alt={i < clients.length ? slider.title : ""}
                                className="h-12 object-contain"
                                loading="lazy"
                                aria-hidden={i >= clients.length}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </figure>

                  {/* Mobile fallback */}
                  {/* Mobile fallback - 2x2 grid */}
                  <div className="grid grid-cols-2 gap-2 lg:hidden px-4">
                    {clients.map((client) => (
                      <div
                        key={client.id}
                        className="aspect-square bg-white rounded-4xl p-2 flex items-center justify-center"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          {" "}
                          {/* New container */}
                          <img
                            src={`https://api.sabers.web.id/uploads/sliders/${client.image}`}
                            alt={client.title || "Client logo"}
                            className="max-h-[80px] w-auto object-contain" // Changed from min-h to max-h
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default HomeView;
