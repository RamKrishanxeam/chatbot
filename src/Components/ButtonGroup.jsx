import React from "react";

const ButtonGroup = ({ toggleModal, handleSelectProduct, rightIcon }) => {
  return (
    <div
      className="flex flex-col gap-3 mb-2 w-full
                    sm:flex-row sm:gap-1 sm:justify-center
                    md:flex-col md:gap-1 md:justify-center md:items-center
                    lg:flex-row lg:gap-1 lg:justify-start lg:min-w-[250px]
                    xl:flex-row xl:gap-2 xl:justify-start xl:min-w-[250px]"
    >
      <button
        onClick={toggleModal}
        className="flex items-center justify-center whitespace-nowrap
                   bg-[#1D73F20F] text-[#1D73F2] rounded-full
                   px-3 py-1 min-w-fit
                   text-[8px]
                   sm:text-[8px] sm:px-4 sm:w-1/3
                   md:text-[8px] md:w-1/2 
                   lg:text-[7px] lg:px-4 lg:w-1/3 lg:ml-1
                   xl:text-[8px] xl:px-4 xl:w-1/3 xl:ml-1
                   transition-all duration-200 hover:bg-[#1D73F20F]/80"
      >
        View details
      </button>

      <button
        onClick={handleSelectProduct}
        className="flex items-center justify-center gap-1 whitespace-nowrap
                   border border-[#1D73F2] text-[#1D73F2] rounded-full
                   px-3 py-1 min-w-fit
                   text-[8px]
                   sm:text-[8px] sm:px-4 sm:w-1/3
                   md:text-[8px] md:w-1/2 
                   lg:text-[7px] lg:px-4 lg:w-1/3
                   xl:text-[8px] xl:px-4 xl:w-1/3
                   transition-all duration-200 hover:bg-[#1D73F2]/5"
      >
        I like this
        <img
          src={rightIcon}
          alt="rightIcon"
          className="w-3 h-3
                     sm:w-3.5 sm:h-3.5
                     lg:w-4 lg:h-4"
        />
      </button>
    </div>
  );
};

export default ButtonGroup;
