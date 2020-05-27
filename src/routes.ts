import express, { Router } from "express";
import AvaliadorController from "./controllers/AvaliadorController";
import AuthController from "./controllers/AuthController";

class Routes {
  routes: Router;
  constructor() {
    this.routes = express.Router();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.routes.get("/avaliadores/:id", AvaliadorController.index);
    this.routes.post("/auth/create", AuthController.create);
    this.routes.post("/auth/authenticate", AuthController.authenticate);
  }
}

export default new Routes();

// routes.post("/register", AuthController.create);

// routes.get("/avaliadores/:id", AvaliadorController.index);
// routes.put("/avaliadores/:id", AvaliadorController.update);

// routes.get("/alunos/:id", AlunoController.index);
// routes.post("/alunos", AlunoController.create);
// routes.put("/alunos/:id", AlunoController.update);
