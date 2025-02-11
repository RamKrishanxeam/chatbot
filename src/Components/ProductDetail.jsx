import { useState } from "react";
import crossbutton from "../assets/images/crossButton.png";
import fullexpand from "../assets/images/full-expand.png";
import ButtonGroup from "./ButtonGroup";

const ProductDetail = ({
  title,
  image,
  pre,
  commonButton,
  CardTextCenter,
  bottomText,
  borderHidden,
  rightIcon,
  button1,
  button2,
  handleSelectedTile,
  allData,
  handleSendMessage,
  specialTag,
  thumbnail_url,
  isSelected,
  onSelect,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => setModalOpen(!isModalOpen);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSelectProduct = () => {
    if (specialTag) {
      handleSendMessage(`${title} like`);
    } else {
      handleSelection();
    }
  };

  const handleSelection = () => {
    onSelect(image); // Notify parent about the selection/deselection
  };

  return (
    <>
      <div
        className={`max-w-sm overflow-hidden shadow-lg bg-white rounded-xl p-1 md:p-2 ${
          isSelected ? "border-[1px] border-[#1D73F2]" : "" // Apply border if selected
        }`}
      >
        {specialTag ? (
          <img
            class="rounded-xl"
            src={thumbnail_url ? thumbnail_url : image}
            alt="product thumbnail image"
            style={{ width: "100%", height: "auto", aspectRatio: "7 / 6" }}
          />
        ) : (
          <img
            class="rounded-xl"
            src={thumbnail_url ? thumbnail_url : image}
            alt="product thumbnail image"
            style={{ width: "100%", height: "auto", aspectRatio: "9 / 5" }}
          />
        )}
        <div class="py-4 text-center ">
          {!specialTag && (
            <div
              class={`font-semibold text-[12px] md:text-[16px] line-clamp-1 ${CardTextCenter}`}
            >
              {title}
            </div>
          )}
          <p className={`text-[12px] mb-2 text-[#727681] ${CardTextCenter}`}>
            {pre}
          </p>
          <div
            className={`${commonButton} inline-grid w-full  md:flex lg:justify-between md:justify-center lg:flex-row md:gap-2 px-2 md:px-0`}
          >
            <button
              className={`${button1} text-[#1D73F2] border-0  bg-[#1D73F20F] rounded-full  px-5 py-1 text-[12px] md:text-[14px] lg:text-[14px] mb-2 md:mb-0`}
              onClick={toggleModal}
            >
              View details
            </button>

            <button
              className={`${button2}  flex items-center justify-center gap-1 text-[#1D73F2] border border-[#1D73F2] text-[12px] md:text-[14px] lg:text-[14px] py-1 px-5 rounded-full`}
              onClick={handleSelectProduct}
            >
              I like this
              <img class=" w-auto h-auto" src={rightIcon} alt="rightIcon" />
            </button>
          </div>

          <div className={`${borderHidden}`}></div>
          <div className={`text-end`}>{bottomText}</div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center rounded-lg">
          <div className="bg-[#F7F8F9] w-[90%] h-auto lg:w-[90%] lg:h-auto md:w-[90%] md:h-[90%] max-h-[90vh] overflow-y-auto rounded-lg md:block lg:flex relative p-[12px] md:gap-0 lg:gap-3">
            <div className="md:w-full lg:w-1/2 md:h-[auto] lg:h-auto">
              <div className="relative">
                <img
                  className="lg:w-full lg:h-[100%] md:h-[420px] md:w-full rounded-lg"
                  src={image}
                  alt="cross"
                />
              </div>
              {/*  */}
              <div className="popup-content">
                <button
                  className="absolute right-2 top-2 text-xl bg-[#fff] px-3 py-1 rounded-full"
                  onClick={() => setModalOpen(false)}
                >
                  X
                </button>
              </div>
            </div>
            <div class="rounded-lg md:w-full lg:w-1/2 text-gray-600 body-font bg-[#F7F8F9] overflow-y-auto lg:h-auto">
              <h1 class="text-[20px] md:text-4xl text-gray-800 sm:text-[24px] max-h-[70vh] overflow-y-auto font-semibold title-font mb-3 mt-4">
                {allData.product_name}
              </h1>
              <p className="text-[14px] md:text-[16px] mb-4 md:pb-5">
                {allData.description.split(".")[0] + "."}
              </p>

              <div>
                <div className="border border-[#DAE3F1] bg-[#F0F2F4] p-2 rounded-lg  text-[15px] md:text-lg font-semibold">
                  Aesthetics Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                  {allData.specifications.primary_colors && (
                    <div>
                      <p className="text-[#727681] font-normal">Color</p>
                      <p className="text-[14px] font-semibold">
                        {allData.specifications.primary_colors}
                      </p>
                    </div>
                  )}
                  {allData.specifications.shade_variations && (
                    <div>
                      <p className="text-[#727681] font-normal">
                        Shade Variations
                      </p>
                      <p className="text-[14px] font-semibold">
                        {allData.specifications.shade_variations}
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  {allData.tone && (
                    <>
                      <p className="text-[#727681] font-normal">Tone</p>
                      <p className="text-[14px] font-semibold">
                        {allData.tone}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* technical details */}
              <div>
                <div className="border p-2 border-[#DAE3F1] bg-[#F0F2F4] rounded-lg text-[15px] md:text-lg font-semibold mb-3">
                  Technical Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                  {allData.category && (
                    <div>
                      <p className="text-[#727681] font-normal">Category</p>
                      <p className="text-[14px] font-semibold">
                        {allData.category}
                      </p>
                    </div>
                  )}
                  {allData.size && (
                    <div>
                      <p className="text-[#727681] font-normal">Size</p>
                      <p className="text-[14px] font-semibold">
                        {allData.size[0]}
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                  {allData.thickness && (
                    <div>
                      <p className="text-[#727681] font-normal">Thickness</p>
                      <p className="text-[14px] font-semibold">
                        {allData.thickness[0]}
                      </p>
                    </div>
                  )}
                  {allData.wear_layer && (
                    <div>
                      <p className="text-[#727681] font-normal">Wear Layer</p>
                      <p className="text-[14px] font-semibold">
                        {allData.wear_layer[0]}
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  {allData.specifications.warranty && (
                    <div>
                      <p className="text-[#727681] font-normal">Warranty</p>
                      <p className="text-[14px] font-semibold">
                        {allData.specifications.warranty}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;

ProductDetail.defaultProps = {
  borderHidden: "",
  commonButton: "",
  CardTextCenter: "",
  CardTextEnd: "",
  bottomText: "",
};
