import { CreateScrapDto } from "./dtos/create-scrap";
import { UpdateScrapDto } from "./dtos/update-scrap";

export class ScrapRepository {
  async readScrap(id: string) {}

  async listUserScraps(userId: number) {}

  async createScrap(createScrapDto: CreateScrapDto) {}

  async updateScrap(id: string, updateScrapDto: UpdateScrapDto) {}

  async deleteScrap(id: string) {}
}
