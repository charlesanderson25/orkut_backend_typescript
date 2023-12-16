// import { prisma } from "./../prisma";
import { connectionDataBase } from "../db";
import { PrismaClient } from "@prisma/client";
import type { CreateUserDto } from "./dtos/create.user.dto";

const prisma = new PrismaClient();

interface LastInsertResult {
  lastInsertId: number;
}

export class UserRepository {
  async createUser(data: CreateUserDto) {
    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        pass_word: data.pass_word,
        avatar: data.avatar,
        email: data.email,
      },
    });
    return user;
  }

  async readUser(userId: number) {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async listAllUsers() {
    const user = await prisma.users.findMany();
    return user;
  }

  async addFriend(user_a: number, user_b: number) {
    const friend = await prisma.friends.create({
      data: {
        user_a,
        user_b,
      },
    });
    return friend;
  }

  async listLatestFriends(userId: number) {
    try {
      const query = `
        SELECT u.*
        FROM users u
        WHERE u.id IN (
          SELECT f.user_b
          FROM friends f
          WHERE f.user_a = ${userId}
          UNION
          SELECT f.user_a
          FROM friends f
          WHERE f.user_b = ${userId}
        )
        ORDER BY u.created_at DESC
        LIMIT 9;
      `;

      const rows = await prisma.$executeRaw`${query}`;
      return rows;
    } catch (error) {
      console.error("Erro na consulta", error);
      throw error;
    }
  }
}
