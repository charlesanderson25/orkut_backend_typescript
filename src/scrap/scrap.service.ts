import { ScrapRepository } from "./scrap.repository";

export class ScrapService {
  constructor() {
    this.scrapRepository = new ScrapRepository();
  }

  scrapRepository: ScrapRepository;
}
