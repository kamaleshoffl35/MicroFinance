const express = require("express");

const router = express.Router();

const permissionController = require("../controllers/permissionController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", authorize("admin"), permissionController.getPermissions);

router.post("/", authorize("admin"), permissionController.createPermission);

router.put("/:id", authorize("admin"), permissionController.updatePermission);

router.delete(
  "/:id",
  authorize("admin"),
  permissionController.deletePermission,
);

module.exports = router;
