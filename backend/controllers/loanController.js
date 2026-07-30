const Loan = require("../models/Loan");

exports.createLoan = async (req, res) => {
  try {
    const files = req.files;
    const lastLoan = await Loan.findOne().sort({ createdAt: -1 });

    let loanId = "LOAN1";

    if (lastLoan && lastLoan.loanId) {
      const lastNumber = parseInt(lastLoan.loanId.replace("LOAN", ""));

      loanId = `LOAN${lastNumber + 1}`;
    }
    const loan = await Loan.create({
      loanId,
      customer: req.body.customerId,

      loanType: req.body.loanType,

      loanAmount: req.body.loanAmount,

      interestRate: req.body.interestRate,

      tenure: req.body.tenure,

      repaymentType: req.body.repaymentType,

      loanPurpose: req.body.loanPurpose,
      status: req.body.status || "Pending",
      collateral: {
        goldWeight: req.body.goldWeight,

        goldPurity: req.body.goldPurity,

        goldValue: req.body.goldValue,

        vehicleType: req.body.vehicleType,

        vehicleNumber: req.body.vehicleNumber,

        vehicleValue: req.body.vehicleValue,

        goldPhoto: files.goldPhoto
          ? `/uploads/collateral/${files.goldPhoto[0].filename}`
          : "",

        vehiclePhoto: files.vehiclePhoto
          ? `/uploads/collateral/${files.vehiclePhoto[0].filename}`
          : "",
      },
    });

    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate(
        "customer",
        "customerName customerId mobileNumber branch address documents",
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: loans,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    await Loan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Loan deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    const body = req.body;
    const files = req.files;

    const updatableFields = [
      "customer",
      "loanType",
      "loanAmount",
      "interestRate",
      "tenure",
      "repaymentType",
      "loanPurpose",
      "status",
    ];

    updatableFields.forEach((field) => {
      if (body[field] !== undefined) {
        loan[field] = body[field];
      }
    });

    if (body.customerId) {
      loan.customer = body.customerId;
    }

    const collateralFields = [
      "goldWeight",
      "goldPurity",
      "goldValue",
      "vehicleType",
      "vehicleNumber",
      "vehicleValue",
    ];

    collateralFields.forEach((field) => {
      if (body[field] !== undefined) {
        loan.collateral[field] = body[field];
      }
    });

    if (files?.goldPhoto) {
      loan.collateral.goldPhoto = `/uploads/collateral/${files.goldPhoto[0].filename}`;
    }

    if (files?.vehiclePhoto) {
      loan.collateral.vehiclePhoto = `/uploads/collateral/${files.vehiclePhoto[0].filename}`;
    }

    const updatedLoan = await loan.save();

    res.status(200).json({
      success: true,
      message: "Loan updated successfully",
      data: updatedLoan,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
