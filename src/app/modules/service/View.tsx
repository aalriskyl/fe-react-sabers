import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import CardService from "../../../components/organisms/CardService";
import CardModal from "../../../components/molecules/CardModal";
import LoadingSpinner from "../../../components/organisms/LoadingSpinner";

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
const ServiceView = () => {
  // Projects section state
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 264;
  const gap = 16;

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
    <main className="m-0 w-full min-h-screen">
      <article className="flex flex-col lg:mx-auto mt-10">
        <div className="flex max-h-screen flex-col items-center justify-center w-full mx-auto font-space">
          <span className="lg:tracking-normal tracking-widest text-[16px] lg:text-[24px] text-primary font-medium mb-3.5">
            SERVICES
          </span>
          <span className="font-bold text-4xl text-secondary text-center lg:text-[64px] lg:opacity-80">
            Expert Solutions Services
          </span>
          <button className="button-primary font-bold mx-auto py-4 text-sm px-10 mt-6 mb-10 lg:text-2xl lg:px-14 lg:py-2">
            <a href="/contact-us" className="!font-medium">
              Contact Us
            </a>
          </button>
          <div className="overflow-hidden rounded-[70px] w-full">
            <img
              src="/service-md.jpg"
              alt="About Us"
              className="lg:block hidden w-full rounded-[40px] object-cover object-center lg:rounded-[70px]"
            />
            <img
              src="/service-sm.jpg"
              alt="About Us"
              className="lg:hidden block w-full h-[50vh] min-h-[300px] rounded-[40px] object-cover object-center"
            />
          </div>
        </div>
        <div className="flex flex-col justify-items-normal items-start my-[5rem] mx-4 lg:justify-center lg:items-center">
          <h1 className="font-space text-[16px] tracking-wider font-medium text-primary">
            OUR SCOPE OF WORKS
          </h1>
          <h1 className="font-space leading-9 lg:mt-2 mt-4 mb-6 lg:mb-10 text-[32px] text-[#121212] font-bold tracking-normal lg:text-[36px]">
            Civil, Electrical & Telecommunication Solutions
          </h1>
          <p className="font-epilogue lg:text-center text-sm text-[#808080] leading-5 lg:mx-[9.5rem] lg:text-[18px] lg:leading-9 mb-12">
            Our scope of projects cover a wide range of essential infrastructure
            developments, ensuring strong, reliable, and future-ready solutions.
          </p>

          {/* 2x2 Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 lg:px-[9.5rem]">
            {/* Card 1 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-center items-center justify-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="#FE0000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    color="#FE0000"
                  >
                    <circle cx="17" cy="18" r="2" />
                    <circle cx="7" cy="18" r="2" />
                    <path d="M11 17h4M13.5 7h.943c1.31 0 1.966 0 2.521.315c.556.314.926.895 1.667 2.056c.52.814 1.064 1.406 1.831 1.931c.772.53 1.14.789 1.343 1.204c.195.398.195.869.195 1.811c0 1.243 0 1.864-.349 2.259l-.046.049c-.367.375-.946.375-2.102.375H19" />
                    <path d="m13 7l.994 2.486c.487 1.217.73 1.826 1.239 2.17c.508.344 1.163.344 2.475.344H21M4.87 17c-1.353 0-2.03 0-2.45-.44C2 16.122 2 15.415 2 14V7c0-1.414 0-2.121.42-2.56S3.517 4 4.87 4h5.26c1.353 0 2.03 0 2.45.44C13 4.878 13 5.585 13 7v10H8.696" />
                  </g>
                </svg>
              </div>
              <h3 className="font-space text-lg font-medium text-[#0F1534]">
                Civil Construction
              </h3>
              <p className="font-space text-lg font-medium text-[#0F1534]">
                {"(Infrastructure)"}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-center items-center justify-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#FE0000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11z"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-medium text-[#0F1534]">
                Electrical Power Systems
              </h3>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-center items-center justify-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FE0000"
                    d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19M12 3C6.48 3 2 7.48 2 13c0 3.7 2.01 6.92 4.99 8.65l1-1.73C5.61 18.53 4 15.96 4 13c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.96-1.61 5.53-4 6.92l1 1.73c2.99-1.73 5-4.95 5-8.65c0-5.52-4.48-10-10-10"
                  />
                </svg>
              </div>
              <h3 className="font-space text-lg font-medium text-[#0F1534]">
                Telecommunication Network
              </h3>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-center items-center justify-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="#FE0000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M21 10H3m18-4H3m18 8H3m18 4H3" />
                    <path d="M12 2v20" />
                  </g>
                </svg>
              </div>
              <h3 className="font-space text-lg font-medium text-[#0F1534]">
                Civil Construction
              </h3>
              <p className="font-space text-lg font-medium text-[#0F1534]">
                (Building, roads etc)
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:mt-24 mb-9"></div>

        {/* Projects Section */}
        <section
          id="milestone"
          className="flex py-4  max-w-7xl md:mx-auto mb-12 lg:mb-12"
          aria-labelledby="milestone-heading"
        >
          <div className="w-full gap-8 overflow-hidden">
            <header className="flex flex-col mx-8 lg:mx-26 md:flex-row">
              <div className="flex-col md:mr-auto mb-[1rem] md:mb-0">
                <h2
                  id="milestone-heading"
                  className="md:hidden text-[#121212] font-bold text-2xl font-space"
                >
                  Recent Project
                </h2>
                <h2 className="hidden md:flex text-[#121212] font-bold text-2xl font-space">
                  Recent Project
                </h2>
              </div>
              <div className="flex md:items-end flex-col lg:ml-auto">
                <nav
                  aria-label="Project navigation"
                  className="hidden md:flex flex-row justify-start lg:justify-start gap-8 font-space"
                >
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous project"
                    className={`rounded-full border-2 w-8 h-8 cursor-pointer ${
                      currentIndex === 0
                        ? "border-gray-400"
                        : "border-red-600 bg-red-600 text-white"
                    }`}
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNext}
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
            </header>
            <div className="mt-8 relative w-full">
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
                      currentIndex * (cardWidth + gap)
                    }px))`,
                  }}
                  aria-live="polite"
                >
                  {projectData.map((project, index) => {
                    const isActive = index === currentIndex;
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
                        <CardService
                          backgroundImage={`https://api.sabers.web.id/uploads/projects/${project.images?.[0].image_path}`}
                          id={project.id}
                          title={project.title}
                          text={project.description}
                          category={project.description || "Uncategorized"}
                          isActive={isActive}
                          location={
                            project.location || "Location not specified"
                          }
                          onClick={(id) => setSelectedProjectId(id)}
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
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous project"
                  className={`rounded-full border-2 w-8 h-8 cursor-pointer ${
                    currentIndex === 0
                      ? "border-gray-400"
                      : "border-red-600 bg-red-600 text-white"
                  }`}
                >
                  &lt;
                </button>
                <button
                  onClick={handleNext}
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

        <section
          className="flex py-4 mt-12 max-w-full mx-6 md:mx-[9.5rem] mb-12 lg:mb-24"
          aria-labelledby="expert-service-heading"
        >
          <div className="w-full gap-8">
            <article className="flex flex-col lg:flex-row">
              <div className="flex-col mx-auto md:mr-auto mb-[1rem] md:mb-0 w-full">
                <div className="relative flex items-center justify-center mx-4">
                  {/* Large screen image */}
                  <img
                    src="/expert-picture.png"
                    alt="Construction experts at work"
                    className="w-full md:flex hidden rounded-4xl h-auto object-cover"
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
                        href="/contact-us"
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
      </article>
      <CardModal
        isOpen={!!selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        projectId={selectedProjectId}
      />
    </main>
  );
};

export default ServiceView;
