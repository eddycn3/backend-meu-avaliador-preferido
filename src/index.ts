import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Routes from "./routes";
import errorMiddleware from "./middlewares/errorHandlerMiddleware";

const app = express();

app.set("port", process.env.PORT);

app.use(cors());

app.use(express.json());

app.use(Routes.routes);

app.use(errorMiddleware);

export default app;
