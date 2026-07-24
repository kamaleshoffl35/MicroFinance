const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true,
      required: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    fatherName: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^\+?\d{10,13}$/, "Please enter a valid mobile number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    occupation: {
      type: String,
      trim: true,
    },
    monthlyIncome: {
      type: Number,
      min: 0,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", ""],
      default: "",
    },

    address: {
      doorNumber: { type: String, trim: true },
      street: { type: String, trim: true },
      village: { type: String, trim: true },
      city: { type: String, trim: true },
      district: { type: String, trim: true },
      state: { type: String, trim: true },
      pinCode: {
        type: String,
        trim: true,
        match: [/^\d{6}$/, "Please enter a valid 6 digit PIN code"],
      },
    },

    identity: {
      aadhaarNumber: {
        type: String,
        trim: true,
        match: [/^\d{12}$/, "Aadhaar number must be 12 digits"],
      },
      panNumber: {
        type: String,
        trim: true,
        uppercase: true,
        match: [/^[A-Z]{5}\d{4}[A-Z]$/, "Please enter a valid PAN number"],
      },
      drivingLicense: { type: String, trim: true },
      voterId: { type: String, trim: true },
    },

    bank: {
      bankName: { type: String, trim: true },
      accountNumber: { type: String, trim: true },
      ifscCode: { type: String, trim: true, uppercase: true },
      branchName: { type: String, trim: true },
    },

    nominee: {
      name: { type: String, trim: true },
      relation: { type: String, trim: true },
      age: { type: Number, min: 0, max: 120 },
      phoneNumber: { type: String, trim: true },
    },

    guarantor: {
      name: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
      occupation: { type: String, trim: true },
      monthlyIncome: { type: Number, min: 0 },
      address: { type: String, trim: true },
    },

    documents: {
      aadhaarFront: { type: String, default: null },
      aadhaarBack: { type: String, default: null },
      panCard: { type: String, default: null },
      passportPhoto: { type: String, default: null },
      signature: { type: String, default: null },

      incomeProof: { type: String, default: null },
    },

    kycStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },
    branch: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Customer", customerSchema);
