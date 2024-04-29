import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import BounceLoader from "react-spinners/BounceLoader";
import ReservationsList from "../components/ReservationsScreen/ReservationsList";
import { fetchReservations } from "../redux/features/ReservationsSlice";
import Pagination from "../components/Pagination/PaginationBar";
const Reservations = () => {
  const { data, loading, nbrRes } = useSelector((state) => state.reservations);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [selected, setSelected] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsSearch(search != "");
  }, [search]);
  useMemo(() => {
    const offset = (currentPage - 1) * 10;
    let queryParams;
    selected == "valid"
      ? (queryParams = { valid: "true" })
      : selected == "invalid"
      ? (queryParams = { valid: "false" })
      : selected == "room_id"
      ? (queryParams = { sort: "room_id" })
      : selected == "user_id"
      ? (queryParams = { sort: "user_id" })
      : (queryParams = { valid: null });
    queryParams = { ...queryParams, search };
    dispatch(fetchReservations({ offset, ...queryParams })).then((result) => {
      if (result.payload) {
        return result.payload.reservations;
      }
      return [];
    });
  }, [currentPage, dispatch, selected, search]);
  return (
    <section className="h-screen w-full flex flex-col items-center px-5 overflow-hidden ">
      <div className="w-full mt-5 mb-14 pl-5 flex flex-row justify-between items-start">
        <h1 className=" font-sans text-3xl font-semibold text-gray-800">
          All Reservations
        </h1>
        <div className="flex flex-row gap-2 relative">
          <div
            className={`flex flex-row  items-center  h-10 bg-gray-100 border-2 border-gray-200 rounded-xl  pr-2 ${
              isSearch ? "w-70 justify-between " : " w-44 justify-evenly"
            }`}
          >
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search..."
              className="border-none outline-none w-full h-full text-gray-600 bg-transparent p-3 "
            />

            {search == "" ? (
              <Search
                size={25}
                className="text-gray-400 hover:cursor-pointer"
              />
            ) : (
              <X
                onClick={() => {
                  setSearch("");
                }}
                size={25}
                className="text-gray-400 hover:cursor-pointer"
              />
            )}
          </div>
          <button
            onClick={() => {
              setFilter((curr) => !curr);
              if (filter) {
                setSelected("all");
              }
            }}
            className={`btn-animation rounded-lg h-10 w-10 shadow-md  flex justify-center items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-600 ${
              filter ? "bg-red-100 text-red-600" : "text-white bg-red-600  "
            }`}
          >
            <Filter size={20} />
          </button>
          {filter && (
            <div className=" transition-all bg-red-50 shadow-lg text-red-600 rounded-lg  w-44 overflow-y-scroll no-scrollbar  z-10 absolute  top-12 right-0">
              <p
                className={`filter-item ${
                  selected == "valid" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setCurrentPage(1);
                  setSelected("valid");
                }}
              >
                Valid
              </p>
              <p
                className={`filter-item ${
                  selected == "invalid" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setCurrentPage(1);
                  setSelected("invalid");
                }}
              >
                Invalid
              </p>
              <p
                className={`filter-item ${
                  selected == "room_id" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setCurrentPage(1);
                  setSelected("room_id");
                }}
              >
                Room
              </p>
              <p
                className={`filter-item ${
                  selected == "user_id" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setCurrentPage(1);
                  setSelected("user_id");
                }}
              >
                User
              </p>
            </div>
          )}
        </div>
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
      ) : (
        <>
          <ReservationsList reservations={data} />

          <div className="mb-4">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={nbrRes.count}
              pageSize={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Reservations;
