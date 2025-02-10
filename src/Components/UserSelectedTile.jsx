const UserSelectedTile = ({ productName, productImage, productCategory }) => {
  return (
    <div className="flex justify-end mb-5 mt-5">
      <div class="max-w-[285px]  overflow-hidden p-[6px] md:p-3 rounded-xl bg-[#E8EDF2]">
        <img
          class="w-full rounded-xl"
          src={productImage}
          alt="product image"
          style={{ width: "100%", height: "auto", aspectRatio: "9/5" }}
        />
        <p className="font-semibold text-[12px] md:text-base mt-3 md:mt-0">
          {productName}
        </p>
        <p
          className="text-[#727681] text-xs pb-2 "
          style={{ borderBottom: "1px solid #CED9E3" }}
        >
          {productCategory}
        </p>
        <div class="mt-2 text-center">
          <div className="text-end">I like this one</div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectedTile;
