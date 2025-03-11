import User from "../models/User.js";
import { userSchema } from "../validations/userValidation.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
  try {
    return await User.query().select("id", "name", "email");
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.query().findById(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (data) => {
  try {
    const { error } = userSchema.validate(data);
    if (error) throw new Error(error.details[0].message);

    const isUserExists = await User.query().findOne({ email: data.email });
    if (isUserExists) {
      throw new Error("User with this email already exists");
    }
    data.password = await bcrypt.hash(
      data.password,
      parseInt(process.env.SALT_OF_ROUNDS, 10)
    );
    return await User.query().insert(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.query().findById(id);
    if (!user) throw new Error("User not found");

    const { error } = userSchema.validate(data, { allowUnknown: true });
    if (error) throw new Error(error.details[0].message);

    return await User.query().patchAndFetchById(id, data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.query().findById(id);
    if (!user) throw new Error("User not found");

    await User.query().deleteById(id);
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
