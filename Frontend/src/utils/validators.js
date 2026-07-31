export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const passwordRules = [
  { test: (v) => v.length >= 8, message: 'At least 8 characters' },
  { test: (v) => /[A-Z]/.test(v), message: 'One uppercase letter' },
  { test: (v) => /[a-z]/.test(v), message: 'One lowercase letter' },
  { test: (v) => /[0-9]/.test(v), message: 'One number' },
  { test: (v) => /[^A-Za-z0-9]/.test(v), message: 'One special character' },
];

export const getPasswordErrors = (password) =>
  passwordRules.filter((rule) => !rule.test(password || '')).map((rule) => rule.message);

export const validateSignupForm = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email';

  const pwErrors = getPasswordErrors(password);
  if (pwErrors.length) errors.password = `Password needs: ${pwErrors.join(', ')}`;
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  return errors;
};
