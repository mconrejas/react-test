import React, { useEffect, useState } from 'react';
import { User } from '../redux/userSlice';

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Expand the card when clicking anywhere on the page
  useEffect(() => {
    const handlePageClick = () => {
      setIsExpanded(false); // Always set to true when clicking outside
    };

    // Attach a global click listener
    window.addEventListener('click', handlePageClick);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, []);

  // Toggles the expansion state (when clicking inside the card)
  const toggleExpand = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full h-[143px]">
      <div
        key={user.id}
        className={`p-6 bg-white rounded-md shadow-md cursor-pointer hover:shadow-lg w-full absolute card flex ${
          isExpanded ? 'expanded' : ''
        }`}
        onClick={toggleExpand}
      >
        <div className="w-full overflow-hidden">
          {/* Card Content */}
          <h3 className="text-xl font-bold mb-2">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Company:</strong> {user.company.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Department:</strong> {user.company.department}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Title:</strong> {user.company.title}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {user.company.address?.address},{' '}
            {user.company.address?.city}
          </p>
        </div>

        {/* Close Button */}
        {isExpanded && (
          <button
            onClick={toggleExpand}
            className="absolute top-2 right-2 text-red-500 font-bold text-lg"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
