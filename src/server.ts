import express from "express";
import cors from "cors";
import { AvaliadorRoutes } from "./routes/AvaliadorRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import { handleError } from "./middlewares/errorHandlerMiddleware";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.initializeErrorHandling();
  }

  private config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private routes() {
    this.app.use("/auth", new AuthRoutes().router);
    this.app.use("/avaliadores", new AvaliadorRoutes().router);
  }

  private initializeErrorHandling() {
    this.app.use(handleError);
  }
  public start() {
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
