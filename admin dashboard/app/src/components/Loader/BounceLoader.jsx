/* eslint-disable react/prop-types */
const BounceLoader = ({ loading }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <BounceLoader
        color="red"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default BounceLoader;
