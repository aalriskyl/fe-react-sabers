/* eslint-disable @typescript-eslint/no-unused-vars */
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
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  // text,
  category,
  location = "Location not specified",
  // isActive = false,
  backgroundImage = "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
}) => {
  const fallbackBgColor = "#D0D4DDFF";

  return (
    <div className="relative border-2 border-[#EAE8E8] rounded-[20px] overflow-hidden bg-white h-full flex flex-col w-[264px]">
      {/* Image section */}
      <div
        id={id}
        className="relative h-[200px] w-full flex-shrink-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: fallbackBgColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* {isActive && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col p-4">
            <h3 className="font-bold text-lg mb-2 text-secondary">{title}</h3>
            <p className="text-[12px] text-secondary">{text}</p>
          </div>
        )} */}
      </div>

      {/* Content section */}
      <div className="flex-1 px-2 py-6 flex flex-col">
        {/* Category */}
        {category && (
          <div className="mb-3">
            <span className="inline-block bg-[#EAEAEA] text-secondary font-bold font-space text-[14px] px-3 py-1 rounded-[10px] tracking-normal">
              {category}
            </span>
          </div>
        )}

        {/* Title with folder icon */}
        <div className="flex items-start gap-2 mb-2">
          <BsFolderFill className="text-secondary flex-shrink-0" size={27} />
          <h3 className="font-space font-bold text-[16px] text-[#121212] leading-tight tracking-normal">
            {title}
          </h3>
        </div>

        {/* Location with pin icon */}
        <div className="flex items-start font-space font-bold gap-2 text-[#121212] text-[16px]">
          <HiLocationMarker
            className="text-secondary flex-shrink-0"
            size={27}
          />
          <span className="leading-tight font-space">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
