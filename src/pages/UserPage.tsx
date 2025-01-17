import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === Number(id))
  );

  if (!user) return <p className="text-center text-gray-500">User not found!</p>;

  const { firstName, lastName, email, phone, company } = user;
  const { name: companyName, address, department, title } = company || {};
  const { address: street, city, state, postalCode, country } = address || {};

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-md shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">
          {firstName} {lastName}
        </h1>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Phone:</span> {phone}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Company:</span> {companyName}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Department:</span> {department}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Title:</span> {title}
        </p>
        <h2 className="text-xl font-bold mt-6">Company Address</h2>
        {address ? (
          <p className="mt-2">
            {street}, {city}, {state}, {postalCode}, {country}
          </p>
        ) : (
          <p className="text-gray-500">No address available</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
