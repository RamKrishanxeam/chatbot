const DefaultImage = ({
  imageSrc,
  title,
  description,
  buttonText,
  link,
  customStyles,
  isSelected, // Pass the selected state as a prop from the parent component
  onSelect, // Handle selection change from the parent component
}) => {
  const handleSelect = () => {
    onSelect(title); // Notify parent component that the image is selected
  };

  return (
    <div
      className="w-[100%] h-auto"
      style={{ boxShadow: "0px 8px 64px 0px rgba(3, 33, 79, 0.04)" }}
      onClick={handleSelect}
    >
      <a
        className={`p-[12px] rounded-[12px] shadow-xl bg-white flex flex-col items-center ${customStyles} ${
          isSelected ? "border-[1px] border-[#1D73F2]" : ""
        }`}
        href={link}
      >
        <img
          src={imageSrc}
          alt={title}
          className="shadow rounded-lg overflow-hidden border"
          style={{ width: "100%", height: "auto", aspectRatio: "191 / 117" }}
        />
        <div className="mt-3 w-full">
          <h4 className="font-semibold text-[16px] text-[#171717]">{title}</h4>
          <p className="text-[#727681] text-[13px]">{description}</p>
          <div className="">
            {buttonText ? (
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 mt-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
              >
                {buttonText}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </a>
    </div>
  );
};
export default DefaultImage;
