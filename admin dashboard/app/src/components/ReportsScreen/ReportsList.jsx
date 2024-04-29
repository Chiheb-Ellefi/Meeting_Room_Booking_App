import ReportsListItem from "./ReportsListItem";
import ReportModal from "../Modal/ReportModal";
import { useState } from "react";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";
import { useDispatch } from "react-redux";
import { deleteReport, fetchReports } from "../../redux/features/ReportsSlice";
const ReportsList = ({ data }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reportIndex, setReportIndex] = useState(0);
  const dispatch = useDispatch();
  const handleDeleteReport = () => {
    dispatch(deleteReport({ rep_id: data[reportIndex].report.rep_id })).then(
      () => {
        dispatch(fetchReports({ offset: 0, limit: 10 }));
      }
    );
  };
  const onClick = ({ index }) => {
    setReportIndex(index);
    setOpenModal(true);
  };
  const onConfirmationClick = ({ index }) => {
    setReportIndex(index);
    setOpenConfirmation(true);
  };
  return (
    <div className="w-full  gap-5 grid grid-cols-4 max-h-[525px] overflow-y-scroll no-scrollbar pb-10 mb-6">
      {data?.map((item, index) => (
        <ReportsListItem
          key={index}
          item={item}
          onClick={onClick}
          index={index}
          onConfirmationClick={onConfirmationClick}
        />
      ))}
      <ReportModal
        open={openModal}
        report={data[reportIndex]}
        onClose={() => {
          setOpenModal(false);
        }}
      />
      <DeleteConfirmationModal
        open={openConfirmation}
        onClose={() => {
          setOpenConfirmation(false);
        }}
        handleDelete={handleDeleteReport}
        text={"Are you sure you want to delete this report?"}
      />
    </div>
  );
};

export default ReportsList;
