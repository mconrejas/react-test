import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Company {
  name: string;
  address: Address;
  department: string;
  title: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: Company;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  searchTerm: '',
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

// Fetch users from DummyJSON
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({
    page,
    limit = 10,
    searchTerm = '',
  }: {
    page: number;
    limit?: number;
    searchTerm?: string;
  }) => {
    const query = searchTerm ? `/search?q=${searchTerm}&` : '?';
    const response = await axios.get(
      `https://dummyjson.com/users${query}limit=${limit}&skip=${(page - 1) * limit}&sortBy=firstName&order=asc`
    );

    return {
      users: response.data.users,
      total: response.data.total,
    };
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.toLowerCase();
      state.currentPage = 1; // Reset to the first page on a new search
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { users, total } = action.payload;
        state.loading = false;
        state.users = users;
        state.filteredUsers = users;
        state.totalPages = Math.ceil(total / 10); // Calculate total pages
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setSearchTerm, setPage } = userSlice.actions;
export default userSlice.reducer;
