import Modal from "./Modal";
import userAvatar from "../../assets/userAvatar.png";
import moment from "moment";
const ReportModal = ({ open, onClose, report }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-[800px] max-h-[400px] flex flex-col gap-10  ">
        <div className="flex flex-row w-full items-center gap-8 ">
          <div
            className="rounded-full w-[150px] h-[150px]  hover:cursor-pointer bg-none bg-cover"
            style={{
              backgroundImage: `url(${`${report.user.image || userAvatar}`})`,
            }}
          ></div>
          <div className="flex flex-row flex-1 items-start gap-5 justify-between h-[150px]  pr-8">
            <div>
              <h1 className="text-3xl font-bold text-black/70">
                {report.user.username}
              </h1>
              <p className="text-xl text-black/50">{report.user.email}</p>
            </div>
            <div className="text-lg text-black/70">
              {moment(report.report.createdAt).format("DD-MM-YYYY HH:mm")}
            </div>
          </div>
        </div>
        <div>
          <p>
            <p className=" text-wrap text-justify text-lg text-black/80  mx-2 w-full">
              {report.report.description}
            </p>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
