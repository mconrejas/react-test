import React from "react";
import { User } from "../redux/userSlice";

interface UserDetailsProps {
  user: User | null;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white w-full max-w-2xl rounded-md shadow-lg p-6 relative transform transition-all duration-500 scale-100 opacity-100"
        style={{
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold text-lg"
        >
          ✖
        </button>

        {/* User Details */}
        <h1 className="text-2xl font-bold mb-4">
          {user.firstName} {user.lastName}
        </h1>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="mb-2">
          <strong>Company:</strong> {user.company.name}
        </p>
        <p className="mb-2">
          <strong>Department:</strong> {user.company.department}
        </p>
        <p className="mb-2">
          <strong>Title:</strong> {user.company.title}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {user.company.address?.address},{" "}
          {user.company.address?.city}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
