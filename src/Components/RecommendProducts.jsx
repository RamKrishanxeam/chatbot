import React, { useState } from "react";
import Product from "./ProductDetail";
import dummyData from "../Resources/dummyData.json";
import dummyCountertopData from "../Resources/countertopData.json";
import rightIcon from "../assets/images/arrow-narrow-right.svg";
import ProductDetail from "./ProductDetail";

const RecommendProducts = ({
  customStyles,
  altText,
  handleSelectedTile,
  products,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const findMatchingProduct = (productUrl) => {
    let matchingTile = dummyData.find(
      (tile) => tile.main_image_url === productUrl
    );
    if (!matchingTile) {
      matchingTile = dummyCountertopData.find(
        (tile) => tile.main_image_url === productUrl
      );
    }
    return matchingTile;
  };
  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    handleSelectedTile(product); // Call the provided handler when an option is selected
  };

  return (
    <>
      <div className="card-data">
        <div className="mb-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Array.isArray(products) &&
              products.map((productUrl, index) => {
                const matchingProduct = findMatchingProduct(productUrl);
                if (!matchingProduct) return null; // Skip if no match is found
                return (
                  <ProductDetail
                    key={index}
                    title={matchingProduct.product_name}
                    thumbnail_url={
                      matchingProduct.thumbnail_url
                        ? matchingProduct.thumbnail_url
                        : matchingProduct.main_image_url
                    }
                    image={matchingProduct.main_image_url}
                    pre={matchingProduct.category}
                    CardTextCenter="text-center"
                    rightIcon={rightIcon}
                    handleSelectedTile={handleSelectedTile}
                    allData={matchingProduct}
                    isSelected={selectedProduct === productUrl}
                    onSelect={handleProductSelection}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendProducts;
