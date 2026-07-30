const express = require("express");

const router = express.Router();

const {
  createTenure,
  getTenures,
  updateTenure,
  deleteTenure,
} = require("../controllers/tenureController");

router.post("/", createTenure);

router.get("/", getTenures);

router.put("/:id", updateTenure);


router.delete("/:id", deleteTenure);

module.exports = router;