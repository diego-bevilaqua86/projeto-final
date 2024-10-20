/** @type {import("rxdb").RxJsonSchema<import("src/jsdocs/users.jsdocs.mjs").User>} */
const usersSchema = {
  version: 0,
  type: "object",
  primaryKey: "id",
  properties: {
    id: {
      type: "string",
      maxLength: 64,
    },
    name: {
      type: "string",
    },
    birthDate: {
      type: "date",
    },
    email: {
      type: "string",
    },
  },
};

let lastUserId = 0;
const nextUserId = () => {
  return (++lastUserId).toString(10);
};

export { nextUserId };
export default usersSchema;
