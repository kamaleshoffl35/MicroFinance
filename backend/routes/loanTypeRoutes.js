const express = require("express");

const router = express.Router();

const {
  createLoanType,
  getLoanTypes,updateLoanType,deleteLoanType,
} = require("../controllers/loanTypeController");

router.post("/", createLoanType);

router.get("/", getLoanTypes);
router.put("/:id", updateLoanType);
router.delete("/:id", deleteLoanType);

module.exports = router;