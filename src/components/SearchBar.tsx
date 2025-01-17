import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/userSlice";
import { useAppSelector } from "../redux/hooks";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useAppSelector((state) => state.users);

  // Handle search input change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      dispatch(setSearchTerm(term)); // Dispatch the search action to filter users
    };

  return (
    <div className="max-w-lg mx-auto mb-6">
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBar;
