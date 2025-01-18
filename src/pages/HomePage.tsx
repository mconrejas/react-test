import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers } from "../redux/userSlice";
import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { debounce } from "lodash";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, searchTerm } = useAppSelector((state) => state.users);

  // Debounced API Call
  const debouncedFetchUsers = useMemo(
    () =>
      debounce(() => {
        dispatch(fetchUsers({ page: currentPage, searchTerm }));
      }, 300),
    [dispatch, currentPage, searchTerm]
  );

  // Trigger debounced API call whenever searchTerm or currentPage changes
  useEffect(() => {
    debouncedFetchUsers();

    // Cleanup debounce on unmount
    return () => {
      debouncedFetchUsers.cancel();
    };
  }, [debouncedFetchUsers, searchTerm, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <h1 className="text-3xl font-bold text-center mb-8">User Directory</h1>

      {/* Search Bar */}
      <SearchBar />

      {/* User List */}
      <UserList />

      {/* Pagination Component */}
      <Pagination />
    </div>
  );
};

export default HomePage;
