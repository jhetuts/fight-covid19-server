const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateLoginInputs = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateRegisterInputs = (data) => {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmpassword = !isEmpty(data.confirmpassword)
    ? data.confirmpassword
    : "";

  // Length
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First name must be between 2 and 30 characters";
  }

  // FirstName
  if (Validator.isEmpty(data.firstName)) {
    errors.name = "First name field is required";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last name must be between 2 and 30 characters";
  }

  // LastName
  if (Validator.isEmpty(data.lastName)) {
    errors.name = "Last name field is required";
  }

  // Email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Name field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // Confirm Password
  if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = "Confirm password doest not match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  validateLoginInputs,
  validateRegisterInputs,
};
