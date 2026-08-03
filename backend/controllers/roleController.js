const Role = require("../models/Role");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.addRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role name is required",
      });
    }

    const exists = await Role.findOne({
      name: name.trim(),
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Role already exists",
      });
    }

    const role = await Role.create({
      name: name.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Role added successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const duplicate = await Role.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Role already exists",
      });
    }

    const role = await Role.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        isActive,
      },
      {
        new: true,
      }
    );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};