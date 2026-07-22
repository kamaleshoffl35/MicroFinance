import axiosInstance from "./axiosInstance";

/**
 * Converts the nested customer form-state object into a FormData
 * instance so that document files can be uploaded alongside the
 * regular text fields in a single multipart/form-data request.
 */
const buildCustomerFormData = (customer) => {
  const formData = new FormData();

  // Flat/top-level fields
  const topLevelFields = [
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
  ];

  topLevelFields.forEach((field) => {
    if (customer[field] !== undefined && customer[field] !== null) {
      formData.append(field, customer[field]);
    }
  });

  // Nested objects are stringified; the backend parses them back to JSON
  const nestedFields = ["address", "identity", "bank", "nominee", "guarantor"];
  nestedFields.forEach((field) => {
    if (customer[field]) {
      formData.append(field, JSON.stringify(customer[field]));
    }
  });

  // Document files (only appended if the user actually selected a file)
  if (customer.documents) {
    Object.entries(customer.documents).forEach(([key, file]) => {
      if (file instanceof File) {
        formData.append(key, file);
      }
    });
  }

  return formData;
};

export const createCustomer = async (customer) => {
  const formData = buildCustomerFormData(customer);
  const response = await axiosInstance.post("/customers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const formData = buildCustomerFormData(customer);
  const response = await axiosInstance.put(`/customers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getCustomers = async (params = {}) => {
  const response = await axiosInstance.get("/customers", { params });
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/customers/${id}`);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`/customers/${id}`);
  return response.data;
};
