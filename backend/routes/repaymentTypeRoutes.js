const express = require("express");
const router = express.Router();

const {
  createRepaymentType,
  getRepaymentTypes,
  updateRepaymentType,
  deleteRepaymentType,
} = require("../controllers/repaymentTypeController");


router.post("/", createRepaymentType);

router.get("/", getRepaymentTypes);

router.put("/:id", updateRepaymentType);

router.delete("/:id", deleteRepaymentType);

module.exports = router;