import express from "express";
import cors from "cors";
import { listLatestFriends, readUser } from "./user.model.repository";
import { JsonController, Get, Param } from "routing-controllers";
import { UserRepository } from "./user.model.repository";

const app = express();
app.use(cors());

const userController = express.Router();

@JsonController("/users")
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  userRepository: UserRepository;

  @Get("/:userId")
  async getById(@Param("userId") userId: number) {
    const user = await this.userRepository.readUser(userId);
    return user;
  }

  @Get("/:userId/friends")
  async listLatestFriends(@Param("userId") userId: number) {
    const friends = await this.userRepository.listLatestFriends(userId);
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
