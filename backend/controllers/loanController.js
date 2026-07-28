const Loan = require("../models/Loan");

exports.createLoan = async (req, res) => {
  try {
    const files = req.files;

    const loan = await Loan.create({
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
        "customerName customerId mobileNumber branch address"
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