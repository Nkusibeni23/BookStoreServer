import { Sequelize } from 'sequelize';
import db from "../database/entity/index.js";
const OrderModel = db["Order"];
const BookModel = db["Book"];
const users = db["User"];
const orders = db["Order"];

export const approveOrder = async (id) => {
  const ordertoapprove = await orders.findOne(
    { where: { id } }
   
  );
  if (ordertoapprove) {
    await orders.update({ status: "approved" }, { where: { id } });
    return ordertoapprove;
  }
  return null;
};

export const rejectOrder = async (id) => {
  const ordertoapprove = await orders.findOne(
    { where: { id } }
   
  );
  if (ordertoapprove) {
    await orders.update({ status: "rejected" }, { where: { id } });
    return ordertoapprove;
  }
  return null;
};

export const getoneOrderB = async (id) => {
  try {
    const Order = await OrderModel.findByPk(id,
      {
        include: [
          {
            model: BookModel,
            as: "BooksOrder",
             },
             {
              model: users,
              as: "OrdersUser",
               },
         
        ],
  
      });

    return Order;
  } catch (error) {
    console.error("Error fetching all Order with users:", error);
    throw error;
  }
};

export const updateUser = async (userId, points) => {
  try {
    const userToUpdate = await users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (userToUpdate) {
      await userToUpdate.update({ points: points });
      const updatedUser = await users.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      return updatedUser;
    }
    

    return null;
  } catch (error) {
    console.error("Error updating user with restaurant:", error);
    throw error;
  }
};

export const pending = async (id) => {
  const bookToUpdate = await BookModel.findOne({ where: { id } });
  if (bookToUpdate) {
   const updatedone= await BookModel.update({ status: 'pending' }, { where: { id } });
    return updatedone;
  }
  return null;
};

export const getone = async (id) => {
  try {
    const Order = await OrderModel.findByPk(id,
      {
        include: [
          {
            model: BookModel,
            as: "BooksOrder",
             },
             {
              model: users,
              as: "OrdersUser",
               },
         
        ],
  
      });

    return Order;
  } catch (error) {
    console.error("Error fetching all Order with users:", error);
    throw error;
  }
};

export const getAllOrderes = async () => {
  try {
    const Order = await OrderModel.findAll(
      {
        include: [
          {
            model: BookModel,
            as: "BooksOrder",
             },
             {
              model: users,
              as: "OrdersUser",
               },
         
        ],
  
      }
    );

    return Order;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};



export const createOrder = async (OrderData) => {
  try {
    return await OrderModel.create(OrderData);
  } catch (error) {
    throw new Error(`Error creating Order: ${error.message}`);
  }
};

export const checkExistingOrder = async (title) => {
  return await OrderModel.findOne({
    where: {
      title,
    },
  });
};

// export const getAllOrderes = async () => {
//   return await OrderModel.findAll();
// };

export const deleteOneOrder = async (id) => {
  const restToDelete = await OrderModel.findOne({ where: { id } });
  if (restToDelete) {
    await OrderModel.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await OrderModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await OrderModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};



export const deactivateResto = async (id) => {
  const restoToUpdate = await OrderModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await OrderModel.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

