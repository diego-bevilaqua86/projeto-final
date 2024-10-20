import express from "express";
import usersService from "../database/services/users.service.mjs";
import dateFormatter from "../utils/date.formatter.mjs";

const viewsRouter = express.Router();

viewsRouter.get("/home", (req, res) => {
  res.render("home");
  return;
});

viewsRouter.get("/users-list", (req, res) => {
  usersService.findAll().then((users) => {
    users = users.map((user) => {
      user.birthDate = dateFormatter(user.birthDate);
      return user;
    });
    console.log(`Carregada listagem com ${users.length} usuários.`);
    res.render("users-list", { users });
    return;
  });
});

viewsRouter.get("/users-delete/:userId", (req, res) => {
  const userId = req.params.userId;
  usersService.deleteById(userId).then((user) => {
    console.log(
      `Usuário ${user?.name ?? "desconhecido"} removido com sucesso!`
    );
    res.redirect("../users-list");
    return;
  });
});

viewsRouter.get("/users-new", (req, res) => {
  res.render("users-new");
});

viewsRouter.get("/users-update/:userId", (req, res) => {
  const userId = req.params.userId;
  usersService.findById(userId).then((user) => {
    if (user) {
      user.birthDate = dateFormatter(user.birthDate);
    }

    console.log(
      `Usuário ${user?.name ?? "desconhecido"} carregado para atualização.`
    );
    res.render("users-update", { user });
    return;
  });
});

viewsRouter.post("/users-create", (req, res) => {
  const { name, birthDate, email } = req.body;

  usersService.create({ name, birthDate, email }).then((user) => {
    console.log(`Usuário ${user.name} criado com sucesso!`);
    res.redirect("./users-list");
  });
});

viewsRouter.post("/users-patch", (req, res) => {
  const user = req.body;

  usersService.patch(user).then((user) => {
    console.log(
      `Usuário ${user?.name ?? "desconhecido"} atualizado com sucesso.`
    );
    res.redirect("./users-list");
  });
});

export default viewsRouter;
