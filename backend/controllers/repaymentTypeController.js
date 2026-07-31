const RepaymentType = require("../models/repaymentType");

exports.createRepaymentType = async (req, res) => {
  try {
    const { repaymentTypeName } = req.body;

    if (!repaymentTypeName) {
      return res.status(400).json({
        success: false,
        message: "Repayment Type is required",
      });
    }

    const exists = await RepaymentType.findOne({
      repaymentTypeName: repaymentTypeName.trim(),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Repayment Type already exists",
      });
    }

    const repaymentType = await RepaymentType.create({
      repaymentTypeName: repaymentTypeName.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Repayment Type created successfully",
      data: repaymentType,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getRepaymentTypes = async (req, res) => {
  try {
    const repaymentTypes = await RepaymentType.find().sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      data: repaymentTypes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateRepaymentType = async (req, res) => {
  try {
    const { repaymentTypeName } = req.body;

    if (!repaymentTypeName) {
      return res.status(400).json({
        success: false,
        message: "Repayment Type is required",
      });
    }

    const repaymentType = await RepaymentType.findByIdAndUpdate(
      req.params.id,
      {
        repaymentTypeName: repaymentTypeName.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!repaymentType) {
      return res.status(404).json({
        success: false,
        message: "Repayment Type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Repayment Type updated successfully",
      data: repaymentType,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.deleteRepaymentType = async (req, res) => {
  try {
    const repaymentType = await RepaymentType.findByIdAndDelete(
      req.params.id
    );

    if (!repaymentType) {
      return res.status(404).json({
        success: false,
        message: "Repayment Type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Repayment Type deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};