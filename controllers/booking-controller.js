import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Cake from "../models/Cake";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
  const { cake, weight, message, deliveryDate, user } = req.body;

  let existingCake;
  let existingUser;

  try {
    existingCake = await Cake.findById(cake);
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingCake) {
    res.status(404).json({ message: "Movie not found with the given ID" });
  }
  if (!existingUser) {
    res.status(404).json({ message: "User not found with the given ID" });
  }

  let booking;
  try {
    booking = new Bookings({
      cake,
      weight,
      message,
      deliveryDate: new Date(`${deliveryDate}`),
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingCake.bookings.push(booking);
    await existingUser.save({ session });
    await existingCake.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }
  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user cake");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.cake.bookings.pull(booking);
    await booking.cake.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "successfully Deleted" });
};
