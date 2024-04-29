/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import UsersListItem from "./UsersListItem";

const UsersList = ({ users }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const styles =
    "text-gray-400 font-sans font-medium w-1/6 text-center tracking-wide";
  return (
    <div className=" w-full h-auto bg-gradient-to-b from-gray-50 to-white shadow-lg  rounded-3xl  overflow-hidden mb-10 pb-14 ">
      <div className="w-full flex flex-row  py-5 ">
        <span className={styles}>Image</span>
        <span className={styles}>Id</span>
        <span className={styles}>Username</span>
        <span className={styles}>Role</span>
        <span className={styles}>Email</span>
        <span className={styles}>Status</span>
      </div>
      <div className="overflow-x-hidden overflow-y-scroll no-scrollbar w-full h-full">
        {users?.map((user) => {
          if (currentUser.user_id !== user.user_id) {
            return <UsersListItem key={user.user_id} user={user} />;
          }
        })}
      </div>
    </div>
  );
};

export default UsersList;
