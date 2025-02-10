const Loader = ({ imageSrc }) => {
  return (
    <div className={`relative flex gap-[10px]`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="bot icon"
          className={`w-[26px] h-auto md:w-[35px] md:h-auto cursor-pointer absolute -left-10 mt-1`}
        />
      ) : (
        ""
      )}
      <div
        className={` p-[12px] rounded-[12px] bg-white`}
        style={{ boxShadow: "0px 8px 64px 0px #03214F0A" }}
      >
        <div class="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
