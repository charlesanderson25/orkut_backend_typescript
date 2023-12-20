import { MongoClient, Db } from "mongodb";
export * from "mongodb";

export let mongodb: Db;

export async function setupMongoDb() {
  let mongoDbUrl: string;
  if (!process.env.MONGODB_URL) {
    throw new Error("Onde está a string de conexão do MongoDB?");
  }
  mongoDbUrl = process.env.MONGODB_URL;
  const mongoClient = new MongoClient(mongoDbUrl);
  await mongoClient.connect();
  mongodb = mongoClient.db("orkut");
}
