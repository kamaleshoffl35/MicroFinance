const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { upload, customerDocumentFields } = require("../middleware/upload");

router
  .route("/")
  .post(upload.fields(customerDocumentFields), createCustomer)
  .get(getCustomers);

router
  .route("/:id")
  .get(getCustomerById)
  .put(upload.fields(customerDocumentFields), updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
