import { usersCollection } from "../database.mjs";
import { nextUserId } from "../schemas/users.schema.mjs";

/**
 * @returns {Promise<import("src/jsdocs/users.jsdocs.mjs").User[]>}
 */
const findAll = async () => {
  const allUsersDocuments = await usersCollection.find().exec();

  return allUsersDocuments.map((userDocument) => userDocument.toJSON());
};

/**
 *
 * @param {string} userId
 * @returns {Promise<import("src/jsdocs/users.jsdocs.mjs").User | null>}
 */
const findById = async (userId) => {
  const userDocument = await usersCollection
    .findOne({
      selector: {
        id: userId,
      },
    })
    .exec();

  if (!userDocument) {
    return null;
  }
  return userDocument.toJSON();
};

/**
 * @param {import("src/jsdocs/users.jsdocs.mjs").UserCreateDTO} userCreateDTO
 * @returns {Promise<import("src/jsdocs/users.jsdocs.mjs").User>}
 */
const create = async (userCreateDTO) => {
  const newUser = await usersCollection.insert({
    id: nextUserId(),
    ...userCreateDTO,
  });

  return newUser.toJSON();
};

/**
 *
 * @param {import("src/jsdocs/users.jsdocs.mjs").User} user
 * @returns {Promise<import("src/jsdocs/users.jsdocs.mjs").User | null>}
 */
const patch = async (user) => {
  const patchedUser = await usersCollection
    .findOne({ selector: { id: user.id } })
    .patch(user);

  if (!patchedUser) {
    return null;
  }

  return patchedUser.toJSON();
};

/**
 * @param {string} userId
 * @returns {Promise<import("src/jsdocs/users.jsdocs.mjs").User | null>}
 */
const deleteById = async (userId) => {
  const removedUser = await usersCollection
    .findOne({
      selector: {
        id: userId,
      },
    })
    .remove();

  if (!removedUser) {
    return null;
  }
  return removedUser.toJSON();
};

const usersService = {
  findAll,
  findById,
  create,
  patch,
  deleteById,
};

export default usersService;
