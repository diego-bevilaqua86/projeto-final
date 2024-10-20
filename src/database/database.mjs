import { createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import usersSchema from "./schemas/users.schema.mjs";

const db = await createRxDatabase({
  name: "exampledb",
  storage: getRxStorageMemory(),
});

const collections = await db.addCollections({
  /** @type {import("rxdb").RxCollectionCreator<import("src/jsdocs/users.jsdocs.mjs").User>} */
  users: {
    schema: usersSchema,
  },
});

/** @type {import("rxdb").RxCollection<import("src/jsdocs/users.jsdocs.mjs").User>} */
const usersCollection = collections.users;

export { usersCollection };
export default collections;
