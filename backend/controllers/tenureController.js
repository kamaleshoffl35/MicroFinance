const Tenure = require("../models/Tenure");

exports.createTenure = async (req, res) => {
  try {
    const { tenureName } = req.body;

    if (!tenureName) {
      return res.status(400).json({
        success: false,
        message: "Tenure is required",
      });
    }

    const exists = await Tenure.findOne({
      tenureName: tenureName.trim(),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Tenure already exists",
      });
    }

    const tenure = await Tenure.create({
      tenureName: tenureName.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Tenure Created Successfully",
      data: tenure,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getTenures = async (req, res) => {
  try {
    const tenures = await Tenure.find().sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      data: tenures,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateTenure = async (req, res) => {
  try {
    const { tenureName } = req.body;

    const tenure = await Tenure.findById(req.params.id);

    if (!tenure) {
      return res.status(404).json({
        success: false,
        message: "Tenure not found",
      });
    }

    if (!tenureName) {
      return res.status(400).json({
        success: false,
        message: "Tenure is required",
      });
    }

    const exists = await Tenure.findOne({
      tenureName: tenureName.trim(),
      _id: { $ne: req.params.id },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Tenure already exists",
      });
    }

    tenure.tenureName = tenureName.trim();

    const updatedTenure = await tenure.save();

    res.status(200).json({
      success: true,
      message: "Tenure Updated Successfully",
      data: updatedTenure,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteTenure = async (req, res) => {
  try {
    const tenure = await Tenure.findById(req.params.id);

    if (!tenure) {
      return res.status(404).json({
        success: false,
        message: "Tenure not found",
      });
    }

    await Tenure.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tenure Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
