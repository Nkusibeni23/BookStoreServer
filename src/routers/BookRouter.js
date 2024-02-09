import express from "express";
import {
  addBookController,
  BookWithAllController,
  deleteOneBookController,
  getOneBookController,
} from "../controllers/BookController";
import { protect } from "../middlewares/protect";
const router = express.Router();
router.delete("/delete/:id", protect, deleteOneBookController);
router.post("/add/",protect, addBookController);
router.get("/", protect,BookWithAllController);
router.get("/one/:id", protect, getOneBookController);
export default router;
