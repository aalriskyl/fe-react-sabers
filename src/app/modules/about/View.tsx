import { BsFillFolderFill } from "react-icons/bs";
import { RiSettingsFill } from "react-icons/ri";
import { LiaSignalSolid } from "react-icons/lia";
import { HiBriefcase } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import LoadingSpinner from "../../../components/organisms/LoadingSpinner";

interface Certification {
  id: string;
  certification_name: string;
  description: string | null;
  type: string;
  issue_date: string;
  expiration_date: string | null;
}

const AboutView = () => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isHROpen, setIsHROpen] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await api.get("/api/certifications");
        setCertifications(response.data);
      } catch (err) {
        setError("Failed to load certifications");
        console.error("Error fetching certifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const toggleCompanyAccordion = () => {
    setIsCompanyOpen(!isCompanyOpen);
  };

  const toggleHRAccordion = () => {
    setIsHROpen(!isHROpen);
  };

  const getYearFromDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const companyCertifications = certifications.filter(
    (cert) => cert.type === "Company"
  );
  const hrCertifications = certifications.filter((cert) => cert.type === "HR");
  if (loading) return <LoadingSpinner />;

  return (
    <main className="m-0 w-full min-h-screen">
      <article className="flex flex-col lg:mx-auto mt-10">
        <div className="flex max-h-screen flex-col items-center justify-center w-full mx-auto font-space ">
          <span className="lg:tracking-normal tracking-widest text-[16px] lg:text-[24px] text-primary font-medium mb-3.5">
            ABOUT US
          </span>
          <span className="font-bold text-4xl text-secondary text-center lg:text-[64px] lg:opacity-80">
            PT Sumber Artho Bersaudara
          </span>
          <button className="button-primary font-bold mx-auto py-4 text-sm px-10 mt-6 mb-10 lg:text-2xl lg:px-14 lg:py-2">
            <a href="/contact-us" className="!font-medium">
              Contact Us
            </a>
          </button>
          <div className="overflow-hidden my-2 lg:rounded-[70px]">
            <img
              src="/about-us.png"
              alt="About Us"
              className="w-full h-auto min-h-[100vh] max-h-[566px] rounded-[40px] overflow-x-hidden object-cover object-center lg:rounded-[70px]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-items-normal items-start my-[5rem] mx-4 lg:justify-center lg:items-center">
          <h1 className="font-space text-lg tracking-wider font-medium text-primary">
            WHO ARE WE
          </h1>
          <h1 className="font-space leading-9 lg:mt-2 mt-4 mb-6 lg:mb-10 text-[32px] text-[#121212] font-bold tracking-normal lg:text-[36px]">
            PT Sumber Artho Bersaudara
          </h1>
          <p className="font-epilogue lg:text-center text-sm text-[#808080] leading-5 lg:mx-[9.5rem] lg:text-[18px] lg:leading-9">
            PT. Sumber Artho Bersaudara is a dynamic company specializing in
            Civil, Contractor Civil, Electrical Power Systems, and
            Telecommunication Network services. With a commitment to excellence
            and a focus on delivering high-quality solutions, we pride ourselves
            on our expertise and dedication to meeting the diverse needs of our
            clients.
          </p>
        </div>
        <div className="flex flex-col mx-4 lg:mt-24 mb-9 ">
          <div className="flex lg:hidden overflow-hidden mt-8 mb-7 ">
            <img
              src="/about-company-sm.png"
              alt="About Us"
              className="w-full h-auto object-cover object-center"
            />
          </div>
          <div className="lg:hidden lg:items-start lg:text-left lg:justify-start mx-0">
            <h1 className="font-space text-[16px] font-medium text-secondary tracking-wider">
              ABOUT
            </h1>
            <h1 className="font-space text-[32px] my-3.5 font-bold text-[#121212] tracking-tight leading-9">
              About the Company
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:mx-[9.5rem]">
            {/* Image - takes 6/12 width on lg+ screens */}
            <div className="hidden lg:flex lg:w-6/12 overflow-hidden">
              <img
                src="/about-company-md.png"
                alt="About Us"
                className="w-full h-auto object-cover object-center"
              />
            </div>

            {/* Content - takes 5/12 width on lg+ screens */}
            <div className="lg:w-5/12 px-4 lg:px-0">
              {/* About the Company Header Section */}
              <div className="mb-6 hidden lg:flex flex-col items-start text-left ">
                <h1 className="font-space text-[16px] font-medium text-secondary">
                  ABOUT
                </h1>
                <h1 className="font-space text-[36px] my-3.5 font-bold text-[#121212] tracking-tight leading-9">
                  About the Company
                </h1>
              </div>

              {/* Established Date Section */}
              <div className="flex gap-4 mb-4">
                <BsFillFolderFill
                  size={20}
                  className="text-secondary flex-none mt-0.5"
                  fill="currentColor"
                />
                <p className="font-epilogue text-left lg:leading-9 text-sm lg:text-[18px] text-[#808080]">
                  From towering buildings to seamless connectivity, we are
                  committed to delivering high-quality infrastructure, embracing
                  innovation, and ensuring customer satisfaction since{" "}
                  <span className="font-bold text-primary">18 April 2022.</span>
                </p>
              </div>

              {/* Company Description Section */}
              <div className="flex gap-4 mb-6">
                <RiSettingsFill
                  size={20}
                  className="text-secondary flex-none mt-0.5"
                  fill="currentColor"
                />
                <p className="font-epilogue text-left lg:leading-9 text-sm lg:text-[18px] text-[#808080]">
                  On top of that, we don’t just build structures–we proudly
                  highlighted our best project management practices from
                  planning, execution, monitoring & controlling to closing. We
                  believe that administration is important for sustainability,
                  we assuredly managing HSE (Health, Safety, and Environment)
                  practices to safeguard our employees and the work environment
                  also.
                </p>
              </div>

              {/* Contact Button */}
              <div>
                <button className="button-primary py-3 text-sm px-8">
                  <a href="/contact-us" className="font-medium">
                    Contact Us
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mx-4 flex-col mb-10 lg:mx-0 lg:mt-24 lg:mb-0">
          <div className="flex lg:hidden items-start mt-8 mb-4">
            <h1 className="font-space text-left text-[16px] font-medium text-primary tracking-wider">
              VISION
            </h1>
          </div>
          <div className="bg-primary relative rounded-[32px] py-8 px-4 text-center flex items-center justify-center lg:rounded-none lg:flex-col lg:py-16">
            <h1 className="hidden lg:flex font-space text-center text-[16px] font-medium text-white tracking-wider mb-4">
              VISION
            </h1>
            <span className="font-epilogue items-center text-[20px] font-medium text-white leading-10 text-center lg:text-4xl lg:leading-12 lg:mx-[9.8rem]">
              {`“Aiming to be at the forefront of Indonesia’s construction industry by implementing value engineering”`}
            </span>
            <div className="hidden top-12 left-4 lg:absolute lg:flex">
              <img
                src="/quotes-md.png"
                className="w-[88px] h-auto rotate-180"
              />
            </div>
            <div className="hidden bottom-8 right-4 lg:absolute lg:flex">
              <img src="/quotes-md.png" className="w-[88px] h-auto" />
            </div>
            <div className="lg:hidden absolute -bottom-5.5 right-4">
              <img src="/quotes-sm.png" className="w-[50px] h-auto" />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center mb-10 lg:mb-0 mx-0 bg-[#F5F2F2] min-h-screen">
          <div className="mx-4 lg:my-4 my-8 items-start lg:text-center  lg:mx-[9.5rem]">
            <h1 className="font-space text-[16px] font-medium text-primary tracking-wider">
              MISSION
            </h1>
            <h1 className="font-space text-[32px] font-bold text-black tracking-tight leading-9 lg:text-[36px] lg:leading-[84px]">
              Our Mission For the Company
            </h1>
          </div>

          {/* Single container for both cards with responsive layout */}
          <div className="flex flex-col px-4 items-center lg:flex-row lg:justify-center lg:gap-24 w-full lg:max-w-[1440px] ">
            {/* Card 1 */}
            <div className="bg-white rounded-[30px] px-8 py-10 flex flex-col items-center text-center mx-auto lg:mx-0 mb-8 lg:mb-12 lg:min-h-[313px] lg:max-w-[340px]">
              <div className="mb-4 bg-white p-2 rounded-full">
                <LiaSignalSolid className="bg-secondary text-white rounded-full p-2 lg:p-6 w-10 h-10 flex items-center justify-center lg:w-[90px] lg:h-[90px] " />
              </div>
              <p className="mt-2 font-epilogue text-sm lg:text-[18px] leading-[26px] text-[#808080]">
                Enhancing competition among companies by providing and
                developing the best services and technology for consumers
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[30px] px-8 py-10 flex flex-col items-center text-center mx-auto mb-8 lg:mb-12 lg:mx-0  lg:min-h-[313px] lg:max-w-[340px]">
              <div className="mb-4 bg-white p-2 rounded-full">
                <HiBriefcase className="bg-secondary text-white rounded-full p-2 lg:p-6 w-10 h-10 flex items-center justify-center lg:w-[90px] lg:h-[90px]" />
              </div>
              <p className="mt-2 font-epilogue text-sm lg:text-[18px] leading-[26px] text-[#808080]">
                Improving HR Training to develop a high-quality workforce and
                create a supportive work environment
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[30px] px-8 py-10 flex flex-col items-center text-center mx-auto mb-8 lg:mb-12 lg:mx-0  lg:min-h-[313px] lg:max-w-[340px]">
              <div className="mb-4 bg-white p-2 rounded-full">
                <HiMiniUsers className="bg-secondary text-white rounded-full p-2 lg:p-6 w-10 h-10 flex items-center justify-center lg:w-[90px] lg:h-[90px]" />
              </div>
              <p className="mt-2 font-epilogue text-sm lg:text-[18px] leading-[26px] text-[#808080]">
                Prioritizing customer satisfaction and providing the best
                quality outcomes for employees and stakeholders
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-center lg:justify-center mb-10 mx-4 lg:mx-[9.5rem] h-min-screen lg:mt-[7rem]">
          <h1 className="font-space font-medium text-[16px] tracking-widest lg:tracking-normal text-secondary lg:text-primary">
            CORE VALUES
          </h1>
          <h1 className="font-space font-bold text-[32px] text-[#121212]">
            E P I I C S
          </h1>
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 w-full mt-8 lg:max-w-[1440px]">
            {/* First Row (Cards 1, 2, 3) */}
            <div className="lg:col-span-12 grid grid-cols-12 gap-8 mb-8">
              {/* Card 1 - Energy */}
              <div className="col-span-12 lg:col-span-3 p-6 rounded-[40px] flex flex-col min-h-[320px] relative overflow-hidden group">
                {/* Color Background */}
                <div
                  className="absolute inset-0 bg-black/40 lg:group-hover:bg-black/30 transition-all duration-500 transform lg:group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/Energy.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                {/* Grayscale Overlay - only on lg screens */}
                <div
                  className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 transform lg:group-hover:scale-110 hidden lg:block"
                  style={{
                    backgroundImage: "url('/Energy.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                  }}
                ></div>
                <div className="relative z-10 h-full flex flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    className="lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
                  >
                    <path
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223M12 9l-2 3h4l-2 3"
                    />
                  </svg>
                  <div className="mt-auto pt-4 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="font-bold font-space text-lg lg:text-[36px] text-white">
                      Energy
                    </h3>
                    <p className="text-white font-epilogue lg:text-[18px]">
                      Fueled by passion and dedication
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Pioneer */}
              <div className="col-span-12 lg:col-span-3 p-6 rounded-[40px] flex flex-col min-h-[320px] relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-black/40 lg:group-hover:bg-black/30 transition-all duration-500 transform lg:group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/Pioneer.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 transform lg:group-hover:scale-110 hidden lg:block"
                  style={{
                    backgroundImage: "url('/Pioneer.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                  }}
                ></div>
                <div className="relative z-10 h-full flex flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    className="lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
                  >
                    <path
                      fill="#fff"
                      d="m12 7.09l2.45 1.49l-.65-2.81L16 3.89l-2.89-.25L12 1l-1.13 2.64L8 3.89l2.18 1.88l-.68 2.81zM15 23H9V10h6zM1 17v6h6v-6zm4 4H3v-2h2zm12-8v10h6V13zm4 8h-2v-6h2z"
                    />
                  </svg>
                  <div className="mt-auto pt-4 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="font-bold font-space text-lg lg:text-[36px] text-white">
                      Pioneer
                    </h3>
                    <p className="text-white font-epilogue lg:text-[18px]">
                      Always aiming to be ahead of the competition
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Innovative */}
              <div className="col-span-12 lg:col-span-6 p-6 rounded-[40px] flex flex-col min-h-[320px] relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-black/40 lg:group-hover:bg-black/30 transition-all duration-500 transform lg:group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/Innovative.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 transform lg:group-hover:scale-110 hidden lg:block"
                  style={{
                    backgroundImage: "url('/Innovative.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                  }}
                ></div>
                <div className="relative z-10 h-full flex flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    className="lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
                  >
                    <path
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5.143 14A7.8 7.8 0 0 1 4 9.919C4 5.545 7.582 2 12 2s8 3.545 8 7.919A7.8 7.8 0 0 1 18.857 14M7.383 17.098c-.092-.276-.138-.415-.133-.527a.6.6 0 0 1 .382-.53c.104-.041.25-.041.54-.041h7.656c.291 0 .436 0 .54.04a.6.6 0 0 1 .382.531c.005.112-.041.25-.133.527c-.17.511-.255.767-.386.974a2 2 0 0 1-1.2.869c-.238.059-.506.059-1.043.059h-3.976c-.537 0-.806 0-1.043-.06a2 2 0 0 1-1.2-.868c-.131-.207-.216-.463-.386-.974M15 19l-.13.647c-.14.707-.211 1.06-.37 1.34a2 2 0 0 1-1.113.912C13.082 22 12.72 22 12 22s-1.082 0-1.387-.1a2 2 0 0 1-1.113-.913c-.159-.28-.23-.633-.37-1.34L9 19m3-3v-5"
                    />
                  </svg>
                  <div className="mt-auto pt-4 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="font-bold font-space text-lg lg:text-[36px] text-white">
                      Innovative
                    </h3>
                    <p className="text-white font-epilogue lg:text-[18px]">
                      Bringing fresh ideas and breakthrough solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row (Cards 4 & 5) */}
            <div className="lg:col-span-12 grid grid-cols-12 gap-8">
              {/* Card 4 - Integrity */}
              <div className="col-span-12 lg:col-span-4 p-6 rounded-[40px] flex flex-col min-h-[320px] relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-black/40 lg:group-hover:bg-black/30 transition-all duration-500 transform lg:group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/Integrity.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 transform lg:group-hover:scale-110 hidden lg:block"
                  style={{
                    backgroundImage: "url('/Integrity.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                  }}
                ></div>
                <div className="relative z-10 h-full flex flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 56 56"
                    className="lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
                  >
                    <path
                      fill="#fff"
                      d="M9.156 50.582h37.688c4.851 0 7.265-2.344 7.265-7.148V20.629c0-4.781-2.414-7.149-7.265-7.149h-4.969v-1.476c0-4.57-2.273-6.586-6.61-6.586h-14.53c-4.102 0-6.633 2.016-6.633 6.586v1.476H9.156c-4.851 0-7.265 2.368-7.265 7.149v22.805c0 4.804 2.414 7.148 7.265 7.148m8.578-38.836c0-1.945 1.008-2.93 2.953-2.93h14.626c1.945 0 2.93.985 2.93 2.93v1.734h-20.51Zm-12.07 9.07c0-2.39 1.219-3.585 3.54-3.585h37.593c2.297 0 3.539 1.195 3.539 3.585v6.188H5.664Zm3.54 26.016c-2.321 0-3.54-1.172-3.54-3.586V30.52h13.078v1.454c0 1.922 1.102 3.023 3.047 3.023h12.422c1.922 0 3.047-1.102 3.047-3.023V30.52h13.078v12.726c0 2.414-1.242 3.586-3.539 3.586Z"
                    />
                  </svg>
                  <div className="mt-auto pt-4 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="font-bold font-space text-lg lg:text-[36px] text-white">
                      Integrity
                    </h3>
                    <p className="text-white font-epilogue lg:text-[18px]">
                      Operating with ethics, honesty, and responsibility
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 - Collab */}
              <div className="col-span-12 lg:col-span-8 p-6 rounded-[40px] flex flex-col min-h-[320px] relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-black/40 lg:group-hover:bg-black/30 transition-all duration-500 transform lg:group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/Collab.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 transform lg:group-hover:scale-110 hidden lg:block"
                  style={{
                    backgroundImage: "url('/Collab.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                  }}
                ></div>
                <div className="relative z-10 h-full flex flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    className="lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500"
                  >
                    <path
                      fill="#fff"
                      d="M8 2.002a1.998 1.998 0 1 0 0 3.996a1.998 1.998 0 0 0 0-3.996M12.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M5 7.993A1 1 0 0 1 6 7h4a1 1 0 0 1 1 1v3a3 3 0 0 1-.146.927A3.001 3.001 0 0 1 5 11zM4 8c0-.365.097-.706.268-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 0 3.436 2.319A4 4 0 0 1 4 10.999zm8 0v3c0 .655-.157 1.273-.436 1.819A2.5 2.5 0 0 0 15 10.5V8a1 1 0 0 0-1-1h-2.268c.17.294.268.635.268 1"
                    />
                  </svg>
                  <div className="mt-auto pt-4 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="font-bold font-space text-lg lg:text-[36px] text-white">
                      Collaboration Success
                    </h3>
                    <p className="text-white font-epilogue lg:text-[18px]">
                      Creating strong synergies for greater achievements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button className="button-primary py-3 text-sm px-8">
              <a href="/contact-us" className="font-medium">
                Contact Us
              </a>
            </button>
          </div>
        </div>
        <div
          id="certifications"
          className="flex flex-col mx-4 lg:flex-row lg:mx-[9.5rem] gap-2 lg:gap-[60px]"
        >
          {/* Left side - Title */}
          <div className="flex-col">
            <h2 className="font-space text-[16px] font-medium text-secondary">
              OUR LICENSES
            </h2>
            <h1 className="font-space text-[36px] font-bold text-[#121212]">
              Certifications
            </h1>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex-col pt-4 overflow-hidden">
            {/* Company Certifications Section */}
            <div className="border-b border-gray-200 pb-8">
              <div
                className="flex justify-between items-center cursor-pointer pb-4 group"
                onClick={toggleCompanyAccordion}
              >
                <h2 className="font-epilogue text-[18px] items-center font-semibold text-[#121212]">
                  Company Certifications
                </h2>
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 group-hover:border-gray-400 transition-all duration-200">
                  <svg
                    className={`w-4 h-4 transition-all duration-300 transform ${
                      isCompanyOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Company Certifications List */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isCompanyOpen ? "max-h-[2000px]" : "max-h-0 overflow-hidden"
                }`}
              >
                <div className="mt-2">
                  {loading ? (
                    <div className="py-6 text-center">
                      Loading certifications...
                    </div>
                  ) : error ? (
                    <div className="py-6 text-center text-red-500">{error}</div>
                  ) : companyCertifications.length > 0 ? (
                    companyCertifications.map((cert, index) => (
                      <div
                        key={cert.id}
                        className="py-6 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2 lg:gap-4">
                            <span className="font-space text-sm lg:text-lg font-medium text-[#121212]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="items-center lg:items-start">
                              <h3 className="font-space text-sm lg:text-lg font-semibold text-[#121212]">
                                {cert.certification_name}
                              </h3>
                              {cert.description && (
                                <p className="font-epilogue text-sm text-[#121212] mt-2 max-w-lg">
                                  {cert.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-left items-center lg:items-start">
                            <span className="font-epilogue text-sm font-semibold text-[#121212] block">
                              Year
                            </span>
                            <span className="font-epilogue text-sm text-gray-600">
                              {getYearFromDate(cert.issue_date)} -{" "}
                              {cert.expiration_date
                                ? getYearFromDate(cert.expiration_date)
                                : "Present"}
                            </span>
                          </div>
                        </div>
                        {index < companyCertifications.length - 1 && (
                          <hr className="mt-6 border-gray-200" />
                        )}
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            </div>

            {/* HR Certifications Section */}
            {hrCertifications.length > 0 && (
              <div className="pt-8">
                <div
                  className="flex justify-between items-center cursor-pointer pb-4 group"
                  onClick={toggleHRAccordion}
                >
                  <h2 className="font-epilogue text-[18px] items-center font-semibold text-[#121212]">
                    HR Certifications
                  </h2>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 group-hover:border-gray-400 transition-all duration-200">
                    <svg
                      className={`w-4 h-4 transition-all duration-300 transform ${
                        isHROpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isHROpen ? "max-h-[2000px]" : "max-h-0 overflow-hidden"
                  }`}
                >
                  {hrCertifications.map((cert, index) => (
                    <div
                      key={cert.id}
                      className="py-6 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2 lg:gap-4">
                          <span className="font-space text-sm lg:text-lg font-medium text-[#121212]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="items-center lg:items-start">
                            <h3 className="font-space text-sm lg:text-lg font-semibold text-[#121212]">
                              {cert.certification_name || "akacopa"}
                            </h3>
                            {cert.description && (
                              <p className="font-epilogue text-sm text-[#121212] mt-2 max-w-lg">
                                {cert.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-left items-center lg:items-start">
                          <span className="font-epilogue text-sm font-semibold text-[#121212] block">
                            Year
                          </span>
                          <span className="font-epilogue text-sm text-gray-600">
                            {getYearFromDate(cert.issue_date)} -{" "}
                            {cert.expiration_date
                              ? getYearFromDate(cert.expiration_date)
                              : "Present"}
                          </span>
                        </div>
                      </div>
                      {index < hrCertifications.length - 1 && (
                        <hr className="mt-6 border-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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
                    className="w-full md:flex  hidden rounded-4xl h-auto object-cover"
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
    </main>
  );
};

export default AboutView;
