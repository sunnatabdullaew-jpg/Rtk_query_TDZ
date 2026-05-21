import React, { useState } from "react";

import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation
} from "./features/api/UserApi";

const App = () => {
  const { data = [], isLoading, error } = useGetUsersQuery();

  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: ""
  });

  const [editingUser, setEditingUser] = useState(null);

  // ADD and edit
  const handleSaveUser = async () => {
    if (editingUser) {
      await editUser({
        id: editingUser.id,
        editedUser: newUser
      });
    } else {
      await addUser(newUser);
    }

    setNewUser({ name: "", email: "" });
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);

    setNewUser({
      name: user.name,
      email: user.email
    });

    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl font-bold">
        Error...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Users CRUD</h1>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditingUser(null);
              setNewUser({ name: "", email: "" });
            }}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg"
          >
            Add User
          </button>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4">
          {data.map((user) => (
            <div key={user.id} className="bg-gray-50 border p-4 rounded-xl">
              <h2 className="text-xl font-semibold">{user.name}</h2>

              <p className="text-gray-600 mb-3">{user.email}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h2>

            <input
              className="border p-3 w-full mb-3"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value
                })
              }
            />

            <input
              className="border p-3 w-full mb-4"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value
                })
              }
            />

            <button
              onClick={handleSaveUser}
              className="bg-blue-500 text-white w-full p-3 rounded"
            >
              {editingUser ? "Save Changes" : "Add User"}
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 bg-red-500 text-white w-full p-3 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
