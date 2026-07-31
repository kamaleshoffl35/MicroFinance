const mongoose = require("mongoose");

const repaymentTypeSchema = new mongoose.Schema(
  {
    repaymentTypeName: {
      type: String,
      required: [true, "Repayment Type is required"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "RepaymentType",
  repaymentTypeSchema
);