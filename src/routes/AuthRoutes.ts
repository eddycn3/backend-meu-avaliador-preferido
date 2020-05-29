import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export class AuthRoutes {
  public router: Router;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router.post("/create", this.authController.create);
    this.router.post("/authenticate", this.authController.authenticate);
  }
}
