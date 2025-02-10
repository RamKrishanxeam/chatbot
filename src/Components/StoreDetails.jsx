import location from "../assets/images/location.png";
import rightIcon from "../assets/images/arrow-narrow-right.svg";

const StoreDetails = ({ options }) => {
  return (
    <>
      {options.map((item, index) => (
        <div key={index} className="flex bg-white p-2 rounded-xl gap-3 mt-3">
          <img
            src={location}
            alt={item.store_name}
            className="w-[40px] h-[40px] cursor-pointer"
          />
          <div>
            <p className="text-[#171717] text-[16px] font-semibold">
              {item.store_name}
            </p>
            <p className="text-[#727681] text-[13px]">{item.address}</p>
            <div className="flex gap-2 mt-3">
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button className="text-[#1D73F2] border-0 bg-[#1D73F20F] rounded-full hover:bg-[#1D73F2] hover:text-[#fff] px-6 py-1">
                    Visit Website
                  </button>
                </a>
              )}
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(
                  item.address // Pass address here
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-1 text-[#1D73F2] border border-[#1D73F2] py-1 px-6 rounded-full hover:bg-[#1D73F2] hover:text-[#fff]">
                  Get Direction
                  <img className="w-4 h-4" src={rightIcon} alt="rightIcon" />
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StoreDetails;
