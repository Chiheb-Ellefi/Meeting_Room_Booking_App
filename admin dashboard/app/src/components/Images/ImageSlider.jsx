import { useRef, useState } from "react";
import { Dot } from "lucide-react";
import picture from "../../assets/picture.jpg";
const ImageSlider = ({ images, showIndicator }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const divRef = useRef(null);

  const _handleClick = (e) => {
    const divWidth = divRef.current.getBoundingClientRect().width;
    const halfDivWidth = divWidth / 2;
    const mouseXPos = e.nativeEvent.offsetX;

    if (mouseXPos <= halfDivWidth) {
      goPrevious();
    } else {
      goNext();
    }
  };
  return (
    <div className={`h-full w-full relative  rounded-md bg-center shadow-sm `}>
      <div
        ref={divRef}
        onClick={_handleClick}
        className={`h-full w-full bg-cover bg-no-repeat rounded-md bg-center bg-black/10 `}
        style={{
          backgroundImage: `url(${
            images.length > 0 ? `${images[currentIndex]}` : picture
          })`,
        }}
      ></div>
      {showIndicator && images.length < 6 && (
        <div className="flex w-full justify-center cursor-pointer -translate-y-1.5 ">
          {images.map((image, index) => (
            <div key={index}>
              <Dot
                onClick={() => {
                  if (currentIndex > index) {
                    goPrevious();
                  } else if (currentIndex < index) {
                    goNext();
                  }
                }}
                className={`${
                  index == currentIndex ? " text-red-500" : "text-red-200 "
                }`}
                size={40}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
