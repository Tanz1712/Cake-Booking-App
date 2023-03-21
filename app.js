import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import cakeRouter from "./routes/cake-routes";
import bookingsRouter from "./routes/booking-routes";
dotenv.config();

const app = express();

//middlewares
app.use(express.json()); // This app will be used with json data,( error in destructuring name undefined )
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/cake", cakeRouter);
app.use("/booking", bookingsRouter);
mongoose
  .connect(
    `mongodb+srv://tanvi:${process.env.MONGODB_PASSWORD}@cluster0.bdkjsll.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected to Database and Server is running")
    )
  )
  .catch((error) => console.log(error));
