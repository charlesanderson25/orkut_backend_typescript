import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Authorized,
  CurrentUser,
  Body,
} from "routing-controllers";
import type { User } from "../user/user.types";
import { CreateScrapDto } from "./dtos/create-scrap.dto";
import { UpdatePostDto } from "../post/dtos/update.post.dto";

@JsonController("/scraps")
export class ScrapController {
  @Authorized()
  @Get("/owner/:userId")
  async listOwnerScraps(@Param("ownerId") ownerId: number) {}

  @Authorized()
  @Get("/scrapId")
  async readScrap(@Param("scrapId") scrapId: string) {}

  @Authorized()
  @Post()
  async createScrap(
    @Body() createScrapDto: CreateScrapDto,
    @CurrentUser() user: User
  ) {}

  @Put("/scrapId")
  @Authorized()
  async updateScrap(
    @Param("scrapId") scrapId: string,
    @Body() updateScrapDto: UpdatePostDto,
    @CurrentUser() user: User
  ) {}

  @Delete("/:scrapId")
  @Authorized()
  async deleteScrap(
    @Param("scrapId") scrapId: string,
    @CurrentUser() user: User
  ) {}
}
