const mongoose = require("mongoose");

const tenureSchema = new mongoose.Schema(
  {
    tenureName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tenure", tenureSchema);