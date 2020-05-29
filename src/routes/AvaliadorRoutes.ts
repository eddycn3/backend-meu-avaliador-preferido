import { Router } from "express";
import { AvaliadorController } from "../controllers/AvaliadorController";
import { AuthController } from "../controllers/AuthController";

export class AvaliadorRoutes {
  public router: Router;
  public avaliadorController: AvaliadorController = new AvaliadorController();
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router.get(
      "/:id",
      this.authController.authorize,
      this.avaliadorController.getAvaliador
    );
  }
}
