const express = require("express");

const router = express.Router();

const {upload }= require("../middleware/upload");

const controller = require("../controllers/fieldVerificationController");

router.post(
  "/",
  upload.fields([
    {
      name: "housePhoto",
      maxCount: 1,
    },
    {
      name: "businessPhoto",
      maxCount: 1,
    },
    {
      name: "customerPhoto",
      maxCount: 1,
    },
  ]),
  controller.addFieldVerification
);

router.get(
  "/",
  controller.getFieldVerifications
);

router.get(
  "/:id",
  controller.getFieldVerification
);

router.put(
  "/:id",
  upload.fields([
    {
      name: "housePhoto",
      maxCount: 1,
    },
    {
      name: "businessPhoto",
      maxCount: 1,
    },
    {
      name: "customerPhoto",
      maxCount: 1,
    },
  ]),
  controller.updateFieldVerification
);

router.delete(
  "/:id",
  controller.deleteFieldVerification
);

module.exports = router;