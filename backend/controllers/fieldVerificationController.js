const FieldVerification = require("../models/FieldVerification");

exports.addFieldVerification = async (req, res) => {
  try {
    const verification = await FieldVerification.create({
      ...req.body,

      housePhoto: req.files?.housePhoto?.[0]?.filename || "",

      businessPhoto: req.files?.businessPhoto?.[0]?.filename || "",

      customerPhoto: req.files?.customerPhoto?.[0]?.filename || "",
    });

    res.status(201).json(verification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getFieldVerifications = async (req, res) => {
  try {
    const data = await FieldVerification.find()

      .populate("customerName")

      .populate("loanType");

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getFieldVerification = async (req, res) => {
  try {
    const data = await FieldVerification.findById(req.params.id)

      .populate("customer")

      .populate("loan");

    if (!data) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateFieldVerification = async (req, res) => {
  try {
    const update = {
      ...req.body,
    };

    if (req.files?.housePhoto)
      update.housePhoto = req.files.housePhoto[0].filename;

    if (req.files?.businessPhoto)
      update.businessPhoto = req.files.businessPhoto[0].filename;

    if (req.files?.customerPhoto)
      update.customerPhoto = req.files.customerPhoto[0].filename;

    const data = await FieldVerification.findByIdAndUpdate(
      req.params.id,
      update,
      {
        new: true,
      },
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteFieldVerification = async (req, res) => {
  try {
    await FieldVerification.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
