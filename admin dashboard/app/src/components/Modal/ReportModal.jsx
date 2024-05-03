import Modal from "./Modal";
import userAvatar from "../../assets/userAvatar.png";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  fetchReports,
  sendToSupport,
  updateReport,
} from "../../redux/features/ReportsSlice";
import { generateHtml } from "../../../utils/email";
const ReportModal = ({ open, onClose, report }) => {
  const dispatch = useDispatch();
  const handleSendToSupport = () => {
    const html = generateHtml({
      username: report.user.username,
      email: report.user.email,
      description: report.report.description,
    });
    dispatch(
      sendToSupport({
        email: "chihebellefi888@gmail.com",
        html,
        type: "support",
        subject: `${report.user.username} report`,
      })
    ).then((result) => {
      if (result.payload) {
        dispatch(
          updateReport({
            rep_id: report.report.rep_id,
            details: { done: true },
          })
        ).then((res) => {
          if (res.payload) {
            dispatch(fetchReports({ offset: 0, limit: 10 }));
          }
        });
      }
    });
  };
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
        <div className="flex justify-end items-center">
          <button
            onClick={handleSendToSupport}
            className="btn btn-animation btn-danger"
          >
            Send To Support
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
