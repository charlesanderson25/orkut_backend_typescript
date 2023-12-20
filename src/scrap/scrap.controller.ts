import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import type { User } from "../user/user.types";

@JsonController("/scraps")
export class ScrapController {
  @Authorized()
  @Get("/users/:userId")
  async listUserScraps(@Param("userId") userId: number) {}

  @Authorized()
  @Get("/scrapId")
  async readScrap(@Param("scrapId") scrapId: string) {}

  @Authorized()
  @Post()
  async creatScrap(@CurrentUser() user: User) {}
}
