import express from "express";
import {
  addOrderController,
  OrderWithAllController,
  approveOrderController,
  rejectOrderController,
  deleteOneOrderController,
  getOneOrderController,
} from "../controllers/OrderController";
import { protect } from "../middlewares/protect";
const router = express.Router();
router.delete("/delete/:id", protect, deleteOneOrderController);   
router.post("/add/:id", protect, addOrderController);
router.get("/", protect, OrderWithAllController);
router.get("/one/:id", protect, getOneOrderController);
router.put("/approve/:id", protect, approveOrderController);
router.put("/reject/:id", protect, rejectOrderController);
export default router;
