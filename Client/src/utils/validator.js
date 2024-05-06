export const validateFormData = (data, setErrors) => {
  const errors = {};
  if (data.name === "") {
    errors.name = "Name is required";
  }

  if (data.price === "") {
    errors.price = "Price is required";
  }

  if (data.discountPercentage === "") {
    errors.discountPercentage = "Discount is required";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
