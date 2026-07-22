const Customer = require("../models/Customer");


const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
const parseNestedField = (field) => {
  if (!field) return undefined;
  if (typeof field === "object") return field;
  try {
    return JSON.parse(field);
  } catch (err) {
    return undefined;
  }
};

const buildDocumentPaths = (files) => {
  if (!files) return undefined;

  const documents = {};
  Object.keys(files).forEach((fieldName) => {
    const file = files[fieldName][0];
    documents[fieldName] = `/uploads/${file.filename}`;
  });
  return documents;
};


const createCustomer = asyncHandler(async (req, res) => {
  const body = req.body;
 
const lastCustomer = await Customer.findOne()
  .sort({ createdAt: -1 })
  .select("customerId");


let customerId = "CUST0001";

if (lastCustomer && lastCustomer.customerId) {
  const lastNumber = parseInt(
    lastCustomer.customerId.replace("CUST", ""),
    10
  );

  customerId = `CUST${String(lastNumber + 1).padStart(4, "0")}`;
}


  const customerData = {
    customerId,
    customerName: body.customerName,
    fatherName: body.fatherName,
    dateOfBirth: body.dateOfBirth || undefined,
    gender: body.gender,
    mobileNumber: body.mobileNumber,
    email: body.email,
    occupation: body.occupation,
    monthlyIncome: body.monthlyIncome || undefined,
    maritalStatus: body.maritalStatus,
    branch: body.branch,
    status: body.status,
    address: parseNestedField(body.address),
    identity: parseNestedField(body.identity),
    bank: parseNestedField(body.bank),
    nominee: parseNestedField(body.nominee),
    guarantor: parseNestedField(body.guarantor),
  };

  const documents = buildDocumentPaths(req.files);
  if (documents) {
    customerData.documents = documents;
  }

  const customer = await Customer.create(customerData);

  res.status(201).json({
    success: true,
    message: "Customer registered successfully",
    data: customer,
  });
});


const getCustomers = asyncHandler(async (req, res) => {
  const { search, branch, kycStatus, page = 1, limit = 20 } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { mobileNumber: { $regex: search, $options: "i" } },
      { _id: search.match(/^[0-9a-fA-F]{24}$/) ? search : undefined },
    ].filter((clause) => Object.values(clause)[0] !== undefined);
  }

  if (branch && branch !== "All Branches") {
    filter.branch = branch;
  }

  if (kycStatus && kycStatus !== "Any Status") {
    filter.kycStatus = kycStatus;
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 20, 1);

  const [customers, total] = await Promise.all([
    Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Customer.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: customers.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: customers,
  });
});


const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  res.status(200).json({ success: true, data: customer });
});


const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  const body = req.body;

  const updatableTopLevel = [
    "customerName",
    "fatherName",
    "dateOfBirth",
    "gender",
    "mobileNumber",
    "email",
    "occupation",
    "monthlyIncome",
    "maritalStatus",
    "branch",
    "status",
    "kycStatus",
  ];

  updatableTopLevel.forEach((field) => {
    if (body[field] !== undefined) {
      customer[field] = body[field];
    }
  });

  const nestedFields = ["address", "identity", "bank", "nominee", "guarantor"];
  nestedFields.forEach((field) => {
    const parsed = parseNestedField(body[field]);
    if (parsed) {
      customer[field] = { ...customer[field]?.toObject?.(), ...parsed };
    }
  });

  const documents = buildDocumentPaths(req.files);
  if (documents) {
    customer.documents = { ...customer.documents?.toObject?.(), ...documents };
  }

  const updatedCustomer = await customer.save();

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: updatedCustomer,
  });
});


const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }

  await customer.deleteOne();

  res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
    data: { _id: req.params.id },
  });
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
