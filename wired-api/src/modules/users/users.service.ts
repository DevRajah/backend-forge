// I keep business logic in the service layer so controllers stay clean.

export const findAllUsers = async () => {
  // I return an empty array for now so the generated module works immediately.
  // Later, I can replace this with database logic.
  return [];
};

export const createUsers = async (payload: unknown) => {
  // I return the payload for now so the endpoint can be tested immediately.
  // Later, I can validate and save this data to the database.
  return payload;
};
