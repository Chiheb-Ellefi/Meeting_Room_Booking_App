import userAvatar from "../../assets/userAvatar.png";
import { X } from "lucide-react";

const ReportsListItem = ({ item, index, onClick, onConfirmationClick }) => {
  return (
    <>
      <div
        onClick={() => {
          onClick({ index });
        }}
        className="w-full h-[280px]  shadow-lg rounded-lg flex flex-col items-center pt-6 gap-6  transition-transform ease-in-out delay-150 hover:-translate-y-2  relative overflow-hidden"
      >
        <div
          onClick={(e) => {
            e.bubbles = false;
            e.stopPropagation();
            onConfirmationClick({ index });
          }}
          className="absolute right-2 top-4 opacity-0 hover:opacity-80 bg-black/20 rounded-full  p-1 hover:cursor-pointer "
        >
          <X />
        </div>
        <div
          className={`rounded-full p-1 ${
            item.report.done
              ? "bg-gradient-to-r from-green-400 via-green-500 to-green-400 "
              : "bg-gradient-to-r from-red-400 via-red-500 to-red-400 "
          } `}
        >
          <div
            className="rounded-full w-[80px] h-[80px]  hover:cursor-pointer bg-none bg-cover"
            style={{
              backgroundImage: `url(${`${item.user.image || userAvatar}`})`,
            }}
          ></div>
        </div>

        <div className=" flex flex-col items-start w-full h-2/3 p-2 ">
          <h1 className="text-lg font-bold text-black/70">
            {item.user.username}
          </h1>
          <p className="text-md text-black/50">{item.user.email}</p>
          <p className=" text-wrap text-justify text-sm text-black/80  mx-2">
            {item.report.description.length >= 100
              ? item.report.description.substring(0, 100) + "..."
              : item.report.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReportsListItem;
