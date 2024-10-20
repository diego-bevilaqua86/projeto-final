import usersService from "../database/services/users.service.mjs";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response<import("src/jsdocs/users.jsdocs.mjs").User[]>} res
 */
const findAll = (req, res) => {
  usersService
    .findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
};

const usersMiddlewares = {
  findAll,
};

export default usersMiddlewares;
