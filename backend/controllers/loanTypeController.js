const LoanType = require("../models/LoanType");

exports.createLoanType = async (req, res) => {
  try {
    const { loanTypeName } = req.body;

    if (!loanTypeName) {
      return res.status(400).json({
        success: false,
        message: "Loan Type Name is required",
      });
    }

    const exists = await LoanType.findOne({
      loanTypeName,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Loan Type already exists",
      });
    }

    const loanType = await LoanType.create({
      loanTypeName,
    });

    res.status(201).json({
      success: true,
      message: "Loan Type Created Successfully",
      data: loanType,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getLoanTypes = async (req, res) => {
  try {
    const loanTypes = await LoanType.find().sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      data: loanTypes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateLoanType = async (req, res) => {
  try {
    const loanType = await LoanType.findById(req.params.id);

    if (!loanType) {
      return res.status(404).json({
        success: false,
        message: "Loan Type not found",
      });
    }

    const { loanTypeName } = req.body;

    if (loanTypeName) {
      const exists = await LoanType.findOne({
        loanTypeName,
        _id: { $ne: req.params.id },
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Loan Type already exists",
        });
      }

      loanType.loanTypeName = loanTypeName;
    }

    const updatedLoanType = await loanType.save();

    res.status(200).json({
      success: true,
      message: "Loan Type updated successfully",
      data: updatedLoanType,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteLoanType = async (req, res) => {
  try {
    const loanType = await LoanType.findById(req.params.id);

    if (!loanType) {
      return res.status(404).json({
        success: false,
        message: "Loan Type not found",
      });
    }

    await LoanType.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Loan Type deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
