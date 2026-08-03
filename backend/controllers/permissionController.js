const Permission = require("../models/Permission");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.getPermissions = asyncHandler(async (req, res) => {

    const permissions = await Permission.find().sort({ name: 1 });

    res.status(200).json({

        success: true,
        data: permissions

    });

});


exports.createPermission = asyncHandler(async (req, res) => {

    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "Permission name is required");
    }

    const exists = await Permission.findOne({
        name: name.trim(),
    });

    if (exists) {
        throw new ApiError(400, "Permission already exists");
    }

    const permission = await Permission.create({

        name: name.trim(),

    });

    res.status(201).json({

        success: true,
        message: "Permission created successfully",
        data: permission,

    });

});


exports.updatePermission = asyncHandler(async (req, res) => {

    const permission = await Permission.findByIdAndUpdate(

        req.params.id,

        {
            name: req.body.name,
        },

        {
            new: true,
        }

    );

    if (!permission) {
        throw new ApiError(404, "Permission not found");
    }

    res.status(200).json({

        success: true,
        message: "Permission updated successfully",
        data: permission,

    });

});


exports.deletePermission = asyncHandler(async (req, res) => {

    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
        throw new ApiError(404, "Permission not found");
    }

    res.status(200).json({

        success: true,
        message: "Permission deleted successfully",

    });

});