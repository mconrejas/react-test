import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UserDetails from './UserDetails';
import Spinner from './Spinner';

const UserList: React.FC = () => {
  const { filteredUsers, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  return (
    <>
      <div className="max-w-screen-xl mx-auto min-h-[670px] relative">
        {loading && (
          <div className="absolute flex items-center justify-center h-full w-full bg-gray-100/70 z-50">
            <Spinner />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {filteredUsers.length > 0 &&
            filteredUsers.map((user) => <UserDetails user={user} />)}
        </div>
      </div>
    </>
  );
};

export default UserList;
