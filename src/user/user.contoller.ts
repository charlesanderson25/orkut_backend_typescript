import express from "express";
import cors from "cors";
import { listLatestFriends, readUser } from "./user.model.service";
import { JsonController, Get, Param } from "routing-controllers";

const app = express();
app.use(cors());

const userController = express.Router();

@JsonController("/users")
export class UserController {
  @Get("/:userId")
  async getById(@Param("userId") userId: number) {
    const user = await readUser(userId);
    return user;
  }

  @Get("/:userId/friends")
  async listLatestFriends(@Param("userId") userId: number) {
    const friends = await listLatestFriends(userId);
    return friends;
  }
}

// userController.get("/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const user = await readUser(userId);
//   res.status(200).json(user);
// });

// userController.get("/:userId/friends", async (req, res) => {
//   const userId = req.params.userId;
//   const friends = await listLatestFriends(userId);
//   res.status(200).json(friends);
// });

export default userController;
