import Cake from "../models/Cake";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const addCake = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];

  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  //console.log(extractedToken);
  let adminId;
  //verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (error, decrypted) => {
    if (error) {
      return res.status(400).json({ message: `${error.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new cake
  const { name, flavours, description, celebratedOn, imageUrl, featured } =
    req.body;
  if (
    !name &&
    name.trim() === "" &&
    !flavours &&
    flavours.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !imageUrl &&
    imageUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let cake;
  try {
    cake = new Cake({
      name,
      flavours,
      description,
      celebratedOn: new Date(`${celebratedOn}`),
      imageUrl,
      featured,
      admin: adminId,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await cake.save({ session });
    adminUser.addedCakes.push(cake);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }

  if (!cake) {
    return res.status(500).json({ message: "Request failed" });
  }

  return res.status(201).json({ cake });
};

export const getAllCakes = async (req, res, next) => {
  let cakes;
  try {
    cakes = await Cake.find();
  } catch (error) {
    return console.log(error);
  }
  if (!cakes) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ cakes });
};

export const getCakeById = async (req, res, next) => {
  const id = req.params.id;
  let cake;
  try {
    cake = await Cake.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!cake) {
    return res.status(404).json({ message: "Invalid cake ID" });
  }
  return res.status(200).json({ cake });
};
