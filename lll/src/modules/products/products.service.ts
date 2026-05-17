// I keep CRUD business logic in the service layer so controllers stay clean.

export const findAllProducts = async () => {
  // Later, I can replace this with database query logic.
  return [];
};

export const findProductsById = async (id: string) => {
  // Later, I can replace this with database lookup logic.
  return {
    id,
  };
};

export const createProducts = async (payload: unknown) => {
  // Later, I can validate and save this payload to the database.
  return payload;
};

export const updateProducts = async (id: string, payload: unknown) => {
  // Later, I can update the database record with this id.
  return {
    id,
    ...(payload as object),
  };
};

export const deleteProducts = async (id: string) => {
  // Later, I can delete the database record with this id.
  return {
    id,
  };
};
