import { CreateScrapDto } from "./dtos/create-scrap.dto";
import { UpdateScrapDto } from "./dtos/update-scrap.dto";
import { mongodb, Collection, ObjectId } from "../mongodb";
import type { Scrap } from "./scrap.types";

export class ScrapRepository {
  constructor() {
    this.scraps = mongodb.collection("scraps");
  }

  scraps: Collection<Scrap>;

  async readScrap(id: string) {
    const scrap = await this.scraps.findOne({
      _id: new ObjectId(id),
    });
    return scrap;
  }

  async listOwnerScraps(ownerId: number) {
    const scraps = await this.scraps.find({
      ownerId,
    });
    return scraps;
  }

  async createScrap(createScrapDto: CreateScrapDto) {
    const scrap = await this.scraps.insertOne(createScrapDto);
    return scrap;
  }

  async updateScrap(id: string, updateScrapDto: UpdateScrapDto) {
    const scrap = await this.scraps.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      updateScrapDto
    );
  }

  async deleteScrap(id: string) {
    const scrap = await this.scraps.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return scrap;
  }
}
