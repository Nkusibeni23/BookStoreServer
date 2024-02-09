// OrderController.js
import {
  createOrder,
  getAllOrderes,
  deleteOneOrder,
  pending,
  updateUser,
  getoneOrderB,
  approveOrder,
  rejectOrder,
  getone



} from "../services/OrderService";

// BookController.js
import { getoneB } from "../services/BookService";



export const addOrderController = async (req, res) => {
  // const { id } = req.params;
  try {
    // const { id } = req.params;

    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }

    const data = await getoneB(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "book not found",
      });
    }
    req.body.bookid = req.params.id
    req.body.userid = req.user.id

    let updatedPoint = req.user.points - data.point;
    console.log(updatedPoint)

    if (updatedPoint < 0) {
      return res.status(404).json({
        message: "you dont have enought pont to make order ",
      });
    }


    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    req.body.date = date;
    req.body.time = time;


    if (!req.body.bookid) {
      return res.status(400).json({
        success: false,
        message: "bookid is required",
      });
    }

    req.body.status = "pending";
    // console.log(req.body)
    const newOrder = await createOrder(req.body);
    const book = await pending(req.params.id);
    const updatedUser = await updateUser(req.user.id, updatedPoint);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      Order: newOrder,
      updayedUser: updatedUser

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const approveOrderController = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }

    const data = await getoneOrderB(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "order not found",
      });
    }
    // req.body.status = "pending";
    const order = await approveOrder(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Order approved successfully",
      // Order: order,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const rejectOrderController = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  admin",
      });
    }

    const data = await getoneOrderB(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    let boodpoint = data.BooksOrder.point;
    let userid = data.userid;
    let esistingUserPoints = data.OrdersUser.points;
    let updatedpoint = Number(esistingUserPoints) + Number(boodpoint);
    const updatedUser = await updateUser(userid, updatedpoint);
    req.body.status = "rejected";
    const order = await rejectOrder(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Order rejected successfully",
      Order: order,
      updatedUser: updatedUser


    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const deleteOneOrderController = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  customer",
      });
    }


    let data = await getone(req.params.id);
    console.log(data.BooksOrder.point)
    let boodpoint = data.BooksOrder.point;


    if (data.status === "approved") {
      return res.status(404).json({
        success: false,
        message: "You are too late to cancil this order becouse it aready approved !",
      });
    }
    let updatedpoint = Number(boodpoint) + Number(req.user.points);
    console.log(updatedpoint)
    const Order = await deleteOneOrder(req.params.id);

    if (!Order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    const updatedUser = await updateUser(req.user.id, updatedpoint);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      Order,
      updatedUserPoints: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
export const OrderWithAllController = async (req, res) => {
  try {


    let allorders = await getAllOrderes();
    let data;

    if (req.user.role === "admin") {

      data = allorders;
    }
    if (req.user.role === "customer") {

      data = allorders.filter(order => order.userid === req.user.id);
    }




    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};







export const getOneOrderController = async (req, res) => {


  try {
    const { id } = req.params;
    let data = await getone(id);

    // console.log(data.userid)
    // console.log(req.user.id)



    if (req.user.role === "customer") {

      if (data.userid != req.user.id) {
        return res.status(200).json({
          success: true,
          message: "Order there is no order you make",
          data: []
        });
      }
    }


    // let  data;

    // if(req.user.role==="admin"){

    //   data= allorders;
    // }
    // if(req.user.role==="customer"){

    //   data= allorders.filter(order => order.userid===req.user.id);
    // }

    if (!data) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// 0725998330
