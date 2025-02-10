import { useState } from "react";

const TabsDetails = ({ message }) => {
  const { options } = message;
  const [activeTab, setActiveTab] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setDropdownOpen(false); // Close dropdown when a tab is selected
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to split description by line breaks or full stops
  const splitDescription = (description) => {
    const lines = description
      .split(/(?<!\$\d+)\.(?!\d+)/)
      .flatMap((line) => line.split("\n"))
      .filter(Boolean);

    return lines.map((line) => line.trim());
  };

  // Separate the first three tabs and the rest
  const firstThreeTabs = options.slice(0, 3);
  const otherTabs = options.slice(3);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Tab Buttons */}
      <div className="border-[#E9EEF7] border rounded-t-lg p-2 mb-5 bg-[#F7F8F9]">
        <div className="inline-block md:flex md:justify-center md:items-center md:space-x-4">
          {/* Render the first three tabs */}
          {firstThreeTabs.map((option, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-[12px] md:text-[16px] ${
                activeTab === index
                  ? "border-[#1D73F2] text-[#1D73F2] hover:bg-[#fff]"
                  : "border-none hover:bg-[#fff]"
              } focus:outline-none tab-button`}
              onClick={() => handleTabClick(index)}
            >
              {option.title}
            </button>
          ))}

          {/* Dropdown for remaining tabs */}
          {otherTabs.length > 0 && (
            <div className="relative inline-block text-left">
              <div className="group">
                <button
                  className={`flex items-center px-3 py-1 text-[12px] md:text-[16px] ${
                    dropdownOpen
                      ? "border-[#1D73F2] text-[#1D73F2] hover:bg-[#fff]"
                      : "border-none hover:bg-[#fff] text-[12px] md:text-[16px]"
                  } focus:outline-none tab-button`}
                  onClick={handleDropdownToggle}
                  type="button"
                >
                  Others
                  <svg
                    className="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                    <div className="py-1">
                      {otherTabs.map((option, index) => (
                        <a
                          key={index}
                          href="#"
                          onClick={() => handleTabClick(3 + index)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {option.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {options.map((option, index) => (
        <div
          key={index}
          className={`p-4 tab-content bg-white shadow-md rounded-lg ${
            activeTab === index ? "" : "hidden"
          }`}
        >
          {option.subcategories.map((subcategory, subIndex) => (
            <div key={subIndex} className="subcategory mb-4">
              <div className="subcategory-name font-semibold text-[14px] md:text-[16px] mb-3 md:mb-0">
                {subcategory.name}
              </div>
              <div className="subcategory-description">
                {/* Split description and display as bullet points */}
                <ul>
                  {splitDescription(subcategory.description).map(
                    (line, lineIndex) => (
                      <li
                        key={lineIndex}
                        className="text-[14px] md:text-[16px]"
                      >
                        {line}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TabsDetails;
