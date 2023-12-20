import "reflect-metadata";

import express from "express";
import postController, { PostController } from "./post/post.controller";
import cors from "cors";
import { connectionDataBase } from "./db";
import userController, { UserController } from "./user/user.contoller";
import { createExpressServer } from "routing-controllers";
import { AuthController } from "./auth/auth.controller";
import { authorizationChecker } from "./auth/checkers/authorizationChecker";
import { currentUserChecker } from "./auth/checkers/currentUserChecker";
import { ScrapController } from "./scrap/scrap.controller";

const port = 8080;
const host = "0.0.0.0";
// const app = express();
// app.use(express.json()); //Middleware para trabalhar com JSON
const app = createExpressServer({
  cors: true,
  controllers: [
    PostController,
    UserController,
    AuthController,
    ScrapController,
  ],
  authorizationChecker,
  currentUserChecker,
});

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// app.use("/posts", postController);
app.use("/users", userController);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em: http://${host}:${port}`);
});
