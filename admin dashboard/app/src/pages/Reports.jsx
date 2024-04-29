import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { fetchReports } from "../redux/features/ReportsSlice";
import ReportsList from "../components/ReportsScreen/ReportsList";
import folder from "../assets/folder.png";
import Pagination from "../components/Pagination/PaginationBar";

const Reports = () => {
  const { count, data, loading } = useSelector((state) => state.reports);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const offset = (currentPage - 1) * 10;
    const limit = 10;
    dispatch(fetchReports({ offset, limit }));
  }, [dispatch, currentPage]);

  return (
    <section className="h-screen w-full flex flex-col items-center px-5 overflow-hidden ">
      <div className="w-full mt-5 mb-14 pl-5 flex flex-row justify-between items-start">
        <h1 className=" font-sans text-3xl font-semibold text-gray-800">
          All Reports
        </h1>
      </div>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <BounceLoader
            color="red"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : data.length > 0 ? (
        <>
          <ReportsList data={data} />
          <div className="mb-4">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={count}
              pageSize={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-2/3 items-center flex flex-col gap-2">
          <img width={180} src={folder} alt="" />
          <p className="text-3xl text-gray-400 text-wrap">
            No data available...
          </p>
        </div>
      )}
    </section>
  );
};

export default Reports;
