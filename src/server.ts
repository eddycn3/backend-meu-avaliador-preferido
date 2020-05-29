import express, { Router } from "express";
import cors from "cors";

import { AvaliadorRoutes } from "../src/routes/AvaliadorRoutes";
import { AuthRoutes } from "../src/routes/AuthRoutes";

import errorMiddleware from "./middlewares/errorHandlerMiddleware";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public routes(): void {
    this.app.use("/auth", new AuthRoutes().router);
    this.app.use("/avaliadores", new AvaliadorRoutes().router);
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(errorMiddleware);
    // this.app.use(compression());
    this.app.use(cors());
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        "API is running on port:%d in %s mode",
        this.app.get("port"),
        this.app.get("env")
      );
    });
  }
}

const server = new Server();

server.start();
