import bcrypt from "bcryptjs";
import db from "../database/entity/index.js";
const users = db["User"];
import Sequelize from "sequelize";

export const getUserByEmail = async (email) => {
  try {
    const user = await users.findOne(
      {
        where: { email: email },
      }
    );

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};




export const createUserCustomer = async (user) => {
  // hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await users.create(user);
  return newUser;
};

export const getUser = async (id) => {
  const user = await users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return user;
};
export const GetUserPassword = async (id) => {
  const user = await users.findByPk(id, {
    attributes: ['password'],
  });
  return user ? user.password : null;
};





export const getUserByPhone = async (phone) => {
  try {
    const user = await users.findOne({
      where: { phone }

    });

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};







