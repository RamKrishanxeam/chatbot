import FaqComponent from "./FaqComponent";
import rightArrow from "../assets/images/rightArrow.png";
import ProductDetail from "./ProductDetail";
import rightIcon from "../assets/images/arrow-narrow-right.svg";

const CountertopDesign = ({
  options,
  images,
  handleSendMessage,
  handleSelectedTile,
  specialTag,
}) => {
  return (
    <>
      <div>
        <div className="rounded-lg p-0">
          <div class="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mb-4">
            {options.map((option, index) => (
              <ProductDetail
                key={index}
                title={option}
                image={images[index]}
                CardTextCenter="text-center"
                rightIcon={rightIcon}
                // borderText="hidden"
                button1="hidden"
                button2="w-full justify-center"
                specialTag={specialTag}
                handleSendMessage={handleSendMessage}
                handleSelectedTile={handleSelectedTile}
              />
            ))}
          </div>
        </div>
      </div>
      <FaqComponent
        altText=""
        messageBody="Not Sure."
        customStyles="mt-3"
        imageSrc={rightArrow}
        text=""
        customBg="border-[#1D73F2] border"
        onSelect={handleSendMessage}
        specialTag="countertop"
      />
    </>
  );
};

export default CountertopDesign;
