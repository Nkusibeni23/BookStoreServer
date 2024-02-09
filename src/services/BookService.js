import { Sequelize } from 'sequelize';
import db from "../database/entity/index.js";
const BookModel = db["Book"];

export const getone = async (id) => {
  try {
    const book = await BookModel.findByPk(id);
    return book;
  } catch (error) {
    console.error("Error fetching all book with users:", error);
    throw error;
  }
};

export const getoneB = async (id) => {
  const restoToUpdate = await BookModel.findOne({ where: { id } });
  // if (restoToUpdate) {
  //  const updatedone= await RestaurentModel.update({ status: 'active' }, { where: { id } });
  //   return updatedone;
  // }
  return restoToUpdate;
};

//   return await BookModel.findOne({
//   where: {
//     title,
//   },
// });

export const getAllBookes = async () => {
  try {
    const Book = await BookModel.findAll();

    return Book;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};



export const createBook = async (BookData) => {
  try {
    return await BookModel.create(BookData);
  } catch (error) {
    throw new Error(`Error creating Book: ${error.message}`);
  }
};

export const checkExistingBook = async (title) => {
  return await BookModel.findOne({
    where: {
      title,
    },
  });
};

// export const getAllBookes = async () => {
//   return await BookModel.findAll();
// };

export const deleteOneBook = async (id) => {
  const restToDelete = await BookModel.findOne({ where: { id } });
  if (restToDelete) {
    await BookModel.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await BookModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await BookModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};



export const deactivateResto = async (id) => {
  const restoToUpdate = await BookModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await BookModel.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

