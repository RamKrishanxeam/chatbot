const UserImageUpload = ({ imageUrl, loading }) => {
  return (
    <>
      {loading ? (
        <div className="scanner-imageFile">
          <div className="bg-[#E8EDF2] p-4 rounded-lg">
            <img
              src={imageUrl}
              alt="room image"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="scanner"></div>{" "}
        </div>
      ) : (
        <div className="bg-[#E8EDF2] p-4 rounded-lg">
          <img
            src={imageUrl}
            alt="room image"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default UserImageUpload;
