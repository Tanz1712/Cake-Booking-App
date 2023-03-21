import express from "express";
import {
  addCake,
  getAllCakes,
  getCakeById,
} from "../controllers/cake-controller";

const cakeRouter = express.Router();

cakeRouter.get("/", getAllCakes);
cakeRouter.get("/:id", getCakeById);
cakeRouter.post("/", addCake);

export default cakeRouter;
