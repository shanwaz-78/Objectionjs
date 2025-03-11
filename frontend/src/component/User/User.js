import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  addUser,
  updateUser,
  deleteUser,
} from "../../redux/userSlice";
import {
  getAllUsers,
  createUser,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from "../../services/userService";
import styles from "./User.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      dispatch(setUser(data?.data || []));
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(setUser([]));
    }
  };

  const handleAddUser = async () => {
    if (
      newUser.name.trim() === "" ||
      newUser.email.trim() === "" ||
      newUser.password.trim() === ""
    ) {
      alert("Name, email, and password are required");
      return;
    }
    try {
      const { data } = await createUser(newUser);
      dispatch(addUser(data.data));
      setNewUser({ name: "", email: "", password: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  const handleEditUser = async () => {
    if (editUser.name.trim() === "" || editUser.email.trim() === "") {
      alert("Name and email are required");
      return;
    }
    try {
      const { data } = await updateUserApi(editUser.id, {
        name: editUser.name,
        email: editUser.email,
      });
      dispatch(updateUser(data.data));
      setEditUser(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserApi(id);
      dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setEditUser(user); // Set editUser if editing
    } else {
      setNewUser({ name: "", email: "", password: "" }); // Reset newUser if adding
      setEditUser(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Management</h1>
      <button onClick={() => openModal()} className={styles.addButton}>
        Add User
      </button>
      <ul className={styles.userList}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <span>
                {user.name} - {user.email}
              </span>
              <div>
                <button
                  onClick={() => openModal(user)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.loading}>No users found</p>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>{editUser ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={editUser ? editUser.name : newUser.name}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={editUser ? editUser.email : newUser.email}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
          className={styles.input}
        />
        {/* Conditionally render password field only in "Add User" mode */}
        {!editUser && (
          <input
            type="password"
            placeholder="Enter Your Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className={styles.input}
          />
        )}
        <div className={styles.modalActions}>
          <button
            onClick={editUser ? handleEditUser : handleAddUser}
            className={styles.saveButton}
          >
            {editUser ? "Update" : "Save"}
          </button>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default User;
