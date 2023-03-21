import express from "express";
import { addAdmin } from "../controllers/admin-controller";
import { adminLogin } from "../controllers/admin-controller";
import { getAdmins } from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmins);

export default adminRouter;
