// I keep validation logic here so invalid data is rejected before reaching the service layer.

export const validateCreateUsers = (payload: unknown) => {
  // Add Joi/Zod validation later if this module needs strict request validation.
  return payload;
};
