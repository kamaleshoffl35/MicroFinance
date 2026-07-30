const express = require("express");

const router = express.Router();

const { upload } = require("../middleware/upload");

const { createLoan,getLoans,deleteLoan,updateLoan } = require("../controllers/loanController");
router.get("/", getLoans);
router.post(
  "/create",
  upload.fields([
    {
      name: "goldPhoto",
      maxCount: 1,
    },
    {
      name: "vehiclePhoto",
      maxCount: 1,
    },
  ]),
  createLoan
);

router.put(
  "/:id",
  upload.fields([
    { name: "goldPhoto", maxCount: 1 },
    { name: "vehiclePhoto", maxCount: 1 },
  ]),
  updateLoan
);
router.delete("/:id", deleteLoan);

module.exports = router;