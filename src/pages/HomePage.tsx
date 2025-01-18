import React, { lazy, Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUsers } from '../redux/userSlice';
import { debounce } from 'lodash';
import Spinner from '../components/Spinner';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load components
const UserList = lazy(() => import('../components/UserList'));
const SearchBar = lazy(() => import('../components/SearchBar'));
const Pagination = lazy(() => import('../components/Pagination'));

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, searchTerm } = useAppSelector((state) => state.users);

  // Immediate fetch on the first render, debounce for subsequent renders
  useEffect(() => {
    // Immediate fetch
    dispatch(fetchUsers({ page: currentPage, searchTerm }));

    // Debounced fetch
    const debouncedFetch = debounce(() => {
      dispatch(fetchUsers({ page: currentPage, searchTerm }));
    }, 300);

    // Cleanup debounce
    return () => {
      debouncedFetch.cancel();
    };
  }, [dispatch, currentPage, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <h1 className="text-3xl font-bold text-center mb-8">User Directory</h1>

      {/* Search Bar */}
      <ErrorBoundary>
        <Suspense fallback={<Spinner size="w-8 h-8" color="text-blue-500" />}>
          <SearchBar />
        </Suspense>
      </ErrorBoundary>

      {/* User List */}
      <ErrorBoundary>
        <Suspense fallback={<Spinner size="w-8 h-8" color="text-blue-500" />}>
          <UserList />
        </Suspense>
      </ErrorBoundary>

      {/* Pagination */}
      <ErrorBoundary>
        <Suspense fallback={<Spinner size="w-8 h-8" color="text-blue-500" />}>
          <Pagination />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
