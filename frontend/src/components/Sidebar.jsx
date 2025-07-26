import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { avatar } from "../assets";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Search filter logic
  const filterUsers = users.filter((user) =>
    user?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  // Skeleton loading
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-2 py-3">
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-1 py-2 border border-gray-400 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Users list */}
      <div className="overflow-y-auto w-full py-3">
        {filterUsers.length ? (
          filterUsers?.map((user) => (
            <button
              key={user?._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center pag-3 hover:bg-base-300 transition-colors cursor-pointer ${
                selectedUser?._id === user?._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              {/* user profile pic & online status */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user?.profilePic || avatar}
                  alt={user?.fullName}
                  className="size-9 md:size-12 object-cover object-top rounded-full"
                />

                {onlineUsers.includes(user?._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>

              {/* user info - only visible on large screen */}
              <div className="hidden lg:block pl-4 text-left min-w-0">
                <p className="font-medium truncate">{user?.fullName}</p>
                <p className="text-sm text-zinc-400">
                  {onlineUsers.includes(user?._id) ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center">User not found!</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
