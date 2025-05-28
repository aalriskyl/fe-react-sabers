import { useState, useEffect } from "react";
import api from "../../app/api/axios";
import { BsFolderFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

interface ProjectDetails {
  id: string;
  client_id: string;
  title: string;
  description: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  status: string;
  category: string;
  budget: string;
  location: string;
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

interface Client {
  id: string;
  name: string | undefined;
  logo: string | undefined;
}

const CardModal = ({ isOpen, onClose, projectId }: CardModalProps) => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!isOpen || !projectId) {
      setProjectDetails(null);
      setClient(null);
      setCurrentImageIndex(0);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch project details and client data in parallel
        const [projectResponse, clientResponse] = await Promise.all([
          api.get(`/api/projects/${projectId}`),
          projectDetails?.client_id
            ? api.get(`/api/clients/${projectDetails.client_id}`)
            : Promise.resolve(null),
        ]);

        setProjectDetails(projectResponse.data);

        if (clientResponse?.data) {
          setClient(clientResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen, projectId, projectDetails?.client_id]);

  const handlePrevImage = () => {
    if (!projectDetails?.images || projectDetails.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectDetails.images!.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!projectDetails?.images || projectDetails.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === projectDetails.images!.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  const hasMultipleImages =
    projectDetails?.images && projectDetails.images.length > 1;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Semi-transparent black overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content container - compact size */}
      <div className="relative w-full max-w-md h-auto max-h-[90vh] flex flex-col z-10">
        {/* Modal card */}
        <div className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-xl">
          {/* Project image with navigation - compact height */}
          {projectDetails &&
            projectDetails.images &&
            projectDetails.images.length > 0 && (
              <div className="relative w-full h-72 sm:h-72 overflow-hidden">
                <img
                  src={`https://api.sabers.web.id/uploads/projects/${projectDetails.images[currentImageIndex].image_path}`}
                  alt={`${projectDetails.title} - Image ${
                    currentImageIndex + 1
                  }`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation arrows - only show if multiple images */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/70 text-white rounded-full p-2 transition-colors"
                      aria-label="Previous image"
                    >
                      <FaArrowLeftLong size={18} />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/70 text-white rounded-full p-2 transition-colors"
                      aria-label="Next image"
                    >
                      <FaArrowRightLong size={18} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {hasMultipleImages && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {currentImageIndex + 1} / {projectDetails.images.length}
                  </div>
                )}

                {/* Dot indicators - only show if multiple images */}
                {hasMultipleImages && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {projectDetails.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

          {/* Content area */}
          <div className="p-5 sm:p-6 flex flex-col">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <p>Loading project details...</p>
              </div>
            ) : projectDetails ? (
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <span className="inline-block text-xs sm:text-sm font-bold font-space text-secondary bg-[#EAEAEA] px-3 py-1 rounded-full">
                    {projectDetails.description}
                  </span>
                </div>

                {/* Client info */}
                {/* Client info - Adjusted for better alignment */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-gray-100 rounded-[10px] p-1 bg-white overflow-hidden">
                    <img
                      src={`https://api.sabers.web.id/uploads/clients/${client?.logo}`}
                      alt={client?.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/path-to-fallback-image.png";
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#8C8D8E] font-bold font-space truncate">
                      PROJECT UNDER
                    </p>
                    <p className="text-sm sm:text-base font-bold text-[#121212] truncate">
                      {projectDetails.client_name || "Client Name"}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-space text-base sm:text-lg font-bold text-[#121212] flex items-center gap-6 sm:gap-6">
                  <BsFolderFill
                    className="text-secondary flex-none"
                    size={27}
                  />
                  <span>{projectDetails.title}</span>
                </h2>

                {/* Location */}
                <div className="flex items-center gap-6 sm:gap-6">
                  <HiLocationMarker
                    className="text-secondary flex-none"
                    size={27}
                  />
                  <p className="font-space text-sm sm:text-base font-bold text-[#121212]">
                    {projectDetails.location}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <p>No project details available</p>
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mx-auto mt-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardModal;
