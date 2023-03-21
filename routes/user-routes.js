import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getBookingsOfUser,
} from "../controllers/user-controller";
import { signup, login } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);

export default userRouter;
