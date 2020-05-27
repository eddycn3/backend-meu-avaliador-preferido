import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Routes from "./routes";
import errorMiddleware from "./middlewares/errorHandlerMiddleware";
import HttpException from "./exceptions/HttpException";

const app = express();

app.set("port", process.env.PORT || 3336);

app.use(cors());

app.use(express.json());

app.use(Routes.routes);

app.use(errorMiddleware);

export default app;
