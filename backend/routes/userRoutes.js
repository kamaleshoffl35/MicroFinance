const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", authorize("admin"), userController.getUsers);

router.get("/:id", authorize("admin"), userController.getUser);

router.post("/", authorize("admin"), userController.createUser);

router.put("/:id", authorize("admin"), userController.updateUser);

router.delete("/:id", authorize("admin"), userController.deleteUser);

module.exports = router;
