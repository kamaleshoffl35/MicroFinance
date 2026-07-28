const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    loanType: {
      type: String,
      required: true,
    },

    loanAmount: Number,

    interestRate: Number,

    tenure: Number,

    repaymentType: String,

    loanPurpose: String,

    status: {
      type: String,
      default: "Pending",
    },

    collateral: {
      goldWeight: Number,
      goldPurity: String,
      goldValue: Number,
      goldPhoto: String,

      vehicleType: String,
      vehicleNumber: String,
      vehicleValue: Number,
      vehiclePhoto: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);