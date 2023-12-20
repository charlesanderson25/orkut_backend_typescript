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
import { UpdateScrapDto } from "./dtos/update-scrap.dto";
import { ScrapService } from "./scrap.service";

@JsonController("/scraps")
export class ScrapController {
  constructor() {
    this.scrapService = new ScrapService();
  }

  scrapService: ScrapService;

  @Authorized()
  @Get("/owner/:userId")
  async listOwnerScraps(
    @Param("ownerId") ownerId: number,
    @CurrentUser() user: User
  ) {
    const scraps = await this.scrapService.listOwnerScraps(ownerId);
    return scraps;
  }

  @Authorized()
  @Get("/scrapId")
  async readScrap(@Param("scrapId") scrapId: string) {
    const scrap = await this.scrapService.readScrap(scrapId);
    return scrap;
  }

  @Authorized()
  @Post()
  async createScrap(
    @Body() createScrapDto: CreateScrapDto,
    @CurrentUser() user: User
  ) {
    createScrapDto.creatorId = user.id;
    const scrap = await this.scrapService.createScrap(createScrapDto);
    return scrap;
  }

  @Put("/scrapId")
  @Authorized()
  async updateScrap(
    @Param("scrapId") scrapId: string,
    @Body() updateScrapDto: UpdateScrapDto,
    @CurrentUser() user: User
  ) {
    updateScrapDto.creatorId = user.id;
    const scrap = await this.scrapService.updateScrap(scrapId, updateScrapDto);
    return scrap;
  }

  @Delete("/:scrapId")
  @Authorized()
  async deleteScrap(
    @Param("scrapId") scrapId: string,
    @CurrentUser() user: User
  ) {
    const scrap = await this.scrapService.deleteScrap(scrapId);
    return scrap;
  }
}
