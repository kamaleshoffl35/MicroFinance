const mongoose = require("mongoose");

const loanTypeSchema = new mongoose.Schema(
  {
    loanTypeName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LoanType", loanTypeSchema);