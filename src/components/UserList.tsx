import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserDetails from "./UserDetails";

const UserList: React.FC = () => {
  const { filteredUsers, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null); // Track the expanded card

  // Determine grid columns (adjust based on Tailwind grid classes)
  const columns = 3; // Change to 2 for `sm:grid-cols-2`, 3 for `lg:grid-cols-3`

  // Calculate the transform origin dynamically based on the card's grid position
  const getTransformOrigin = (index: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    if (row === 0 && col === 0) return "top left"; // Top-left corner
    if (row === 0 && col === columns - 1) return "top right"; // Top-right corner
    if (row === 0) return "top center"; // Top row, center
    if (col === 0) return "center left"; // Left column
    if (col === columns - 1) return "center right"; // Right column
    return "center"; // Middle cards
  };

  // Handle card click
  const handleCardClick = (user: any) => {
    setSelectedUser(user); // Set the selected user details
    setExpandedUserId(user.id); // Track the clicked card for expansion
  };

  // Handle close details
  const handleCloseDetails = () => {
    setSelectedUser(null); // Clear the selected user
    setExpandedUserId(null); // Reset the expanded card
  };

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {filteredUsers.map((user) => {
          const isExpanded = user.id === expandedUserId;
          
          return (
            <div
              key={user.id}
              className={`relative p-6 bg-white rounded-md shadow-md cursor-pointer hover:shadow-lg ${
                isExpanded
                  ? "fixed top-1/2 left-1/2 w-[500px] h-[500px] transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500"
                  : "w-full h-auto static transition-all duration-500"
              }`}
              onClick={() => handleCardClick(user)}
            >

              {/* Card Content */}
              <h3 className="text-xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">Phone: {user.phone}</p>
              <p className="text-sm text-gray-600">Company: {user.company.name}</p>

              {/* Close Button */}
              {isExpanded && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    handleCloseDetails();
                  }}
                  className="absolute top-2 right-2 text-red-500 font-bold text-lg"
                >
                  ✖
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Backdrop */}
      {expandedUserId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={handleCloseDetails} // Shrink card when clicking outside
        ></div>
      )}
    </>
  );
};

export default UserList;
