import BounceLoader from "react-spinners/BounceLoader";
const LoadingModal = ({ loading }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={` bg-transparent   transition-all ${
          open ? " scale-100 opacity-100" : " scale-125 opacity-0"
        }`}
      >
        <BounceLoader
          color="red"
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default LoadingModal;
