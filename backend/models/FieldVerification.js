const mongoose = require("mongoose");

const fieldVerificationSchema = new mongoose.Schema(
  {
    loanType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

    customerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    addressVerified: {
      type: Boolean,
      default: false,
    },

    incomeVerified: {
      type: Boolean,
      default: false,
    },

    businessVerified: {
      type: Boolean,
      default: false,
    },

    gpsLocation: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    housePhoto: String,
    businessPhoto: String,
    customerPhoto: String,

    status: {
      type: String,
      enum: [
        "Pending",
        "Verified",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FieldVerification",
  fieldVerificationSchema
);