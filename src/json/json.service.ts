import fs from "fs";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

export async function createJson(path: string, data: any) {
  const dataString = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(path, dataString);
}

export async function readJson(path: string): Promise<any> {
  const dataBuffer = await fs.promises.readFile(path);
  const dataString = dataBuffer.toString();
  const data = JSON.parse(dataString);
  return data;
}

export async function updateJson(path: string, partialJson: any) {
  const oldJson = await readJson(path);
  const nextJson = { ...oldJson, ...partialJson };
  await createJson(path, nextJson);
}

export async function deleteJson(path: string) {
  await fs.promises.unlink(path);
}
