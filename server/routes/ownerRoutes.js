const express = require("express");
const { protect } = require("../middleware/auth");
const {
  changeRoleToOwner,
  addCar,
  getOwnerCar,
  toggleCarAvailability,
  deleteCar,
  getDashboardData,
  updateUserImage,
} = require("../controllers/ownerController");
const upload = require("../middleware/multer");
const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", upload.single("image"), protect, addCar);
ownerRouter.get("/cars", protect, getOwnerCar);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage
);

module.exports = ownerRouter;
