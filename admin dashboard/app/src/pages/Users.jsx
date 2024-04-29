import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/features/UsersSlice";
import { Suspense, useEffect, useState } from "react";
import UsersList from "../components/UsersScreen/UsersList";
import { Plus, Filter, Search, X } from "lucide-react";
import BounceLoader from "react-spinners/BounceLoader";
import AddUserModal from "../components/Modal/AddUserModal";
import folder from "../assets/folder.png";
import Pagination from "../components/Pagination/PaginationBar";
const Users = () => {
  const dispatch = useDispatch();
  const { count, data, loading } = useSelector((state) => state.users);
  const [filter, setFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addUser, setAddUser] = useState(false);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    setIsSearch(search != "");
  }, [search]);

  useEffect(() => {
    const offset = (currentPage - 1) * 10;
    let sort = null;
    let filter = "";

    if (selected == "all") {
      filter = "";
    }
    if (selected == "active") {
      filter = '{ "active": "true" }';
    }
    if (selected == "inactive") {
      filter = '{ "active": "false" }';
    }
    if (selected == "admin") {
      filter = '{ "role": "admin" }';
    }
    if (selected == "simple") {
      filter = '{ "role": "simple" }';
    }

    dispatch(fetchUsers({ offset, limit: 10, sort, filter, search })).then(
      (result) => {
        if (result.payload) {
          return result.payload.reservations;
        }
        return [];
      }
    );
  }, [currentPage, search, dispatch, selected]);

  return (
    <section className="h-screen w-full flex flex-col items-center px-5 ">
      <div className="w-full mt-5 mb-14 pl-5 flex flex-row justify-between items-start">
        <h1 className=" font-sans text-3xl font-semibold text-gray-800">
          All Users
        </h1>

        <div className="flex flex-col gap-2 items-end relative">
          <div className="flex flex-row gap-2">
            <div
              onClick={() => {
                setAddUser(true);
              }}
              className="btn-animation bg-red-600 rounded-lg  w-32 h-10 text-white flex flex-row justify-evenly items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-600 shadow-md "
            >
              <span className=" font-sans">Add User</span>
              <Plus size={20} />
            </div>
            <div
              onClick={() => {
                setFilter((curr) => !curr);
                if (filter) {
                  setSelected("all");
                }
              }}
              className={` btn-animation rounded-lg h-10 w-10 shadow-md  flex justify-center items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-600 ${
                filter ? "bg-red-100 text-red-600" : "text-white bg-red-600  "
              }`}
            >
              <Filter size={20} />
            </div>
          </div>
          {filter && (
            <div className="transition-all bg-red-50 shadow-lg text-red-600 rounded-lg  w-44 overflow-y-scroll no-scrollbar  z-1 absolute  top-12">
              <p
                className={`filter-item ${
                  selected == "active" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setSelected("active");
                }}
              >
                Active
              </p>
              <p
                className={`filter-item ${
                  selected == "inactive" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setSelected("inactive");
                }}
              >
                Inactive
              </p>
              <p
                className={`filter-item ${
                  selected == "admin" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setSelected("admin");
                }}
              >
                Admin
              </p>
              <p
                className={`filter-item ${
                  selected == "simple" && "bg-red-100 text-red-600 "
                }`}
                onClick={() => {
                  setSelected("simple");
                }}
              >
                Simple Users
              </p>
            </div>
          )}
          <div
            className={`flex flex-row  items-center  h-10 bg-gray-100 border-2 border-gray-200 rounded-xl transition-transform ease-in-out delay-150  pr-2 ${
              isSearch ? " w-70 justify-between " : " w-44 justify-evenly"
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
        </div>
      </div>

      <Suspense fallback={"...loading"}>
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
            <UsersList users={data} />
            <div className="mb-4">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={count - 1}
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
      </Suspense>
      <AddUserModal
        onClose={() => {
          setAddUser(false);
        }}
        open={addUser}
        loading={loading}
      />
    </section>
  );
};

export default Users;
