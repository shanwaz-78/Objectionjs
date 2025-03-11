import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8181/api/users";

const api = axios.create({ baseURL });

export const getAllUsers = async () => {
  try {
    return await api.get("/");
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    return await api.get(`/${id}`);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    return await api.post("/create-user", data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    return await api.put(`/update-user/${id}`, data);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await api.delete(`/delete-user/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
