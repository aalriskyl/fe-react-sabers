import React from "react";
import { BsFolderFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

interface CardProps {
  id: string;
  title: string;
  text: string;
  category?: string;
  location?: string;
  isActive?: boolean;
  backgroundImage?: string;
  onClick?: (projectId: string) => void; // Made optional with ?
}

const CardService: React.FC<CardProps> = ({
  id,
  title,
  //   text,
  category,
  location = "Location not specified",
  backgroundImage = "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  onClick,
}) => {
  const fallbackBgColor = "#D0D4DDFF";

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className="relative border-2 border-[#EAE8E8] rounded-[20px] overflow-hidden bg-white h-full flex flex-col w-[264px]">
      {/* Image section */}
      <div
        className="relative h-[200px] w-full flex-shrink-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: fallbackBgColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content section */}
      <div className="p-4 flex flex-col h-full">
        {category && (
          <div className="mb-3">
            <span className="inline-block bg-[#EAEAEA] text-secondary font-bold text-[14px] px-3 py-1 rounded-[10px]">
              {category}
            </span>
          </div>
        )}

        <div className="flex items-start gap-2 mb-2">
          <BsFolderFill className="text-secondary flex-shrink-0" size={27} />
          <h3 className="font-bold text-[16px] text-[#121212] leading-tight">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#5E5E5E] mb-4">
          <HiLocationMarker
            className="text-secondary flex-shrink-0"
            size={27}
          />
          <span className="font-bold text-[16px] text-[#121212] leading-tight">
            {location}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="bg-primary text-white font-medium py-1 px-3 rounded-[70px] hover:bg-opacity-90 text-[12px]"
              //   disabled={!onClick} // Disable if no onClick handler
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardService;
