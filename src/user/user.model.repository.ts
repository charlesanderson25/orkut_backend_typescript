// import { prisma } from "./../prisma";
import { connectionDataBase } from "../db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export class UserRepository {
//   async createUser(data: any) {
//     try {
//       const query = `
//         INSERT INTO users (first_name, last_name, avatar, pass_word)
//         VALUES (?, ?, ?, ?);
//       `;

//       const values = [
//         data.first_name,
//         data.last_name,
//         data.avatar,
//         data.pass_word,
//       ];

//       await connectionDataBase.promise().query(query, values);

//       const [lastInsertResult] = await connectionDataBase
//         .promise()
//         .query("SELECT LAST_INSERT_ID() as lastInsertId");

//       const lastInsertId = lastInsertResult[0].lastInsertId;

//       const [result] = await connectionDataBase
//         .promise()
//         .query("SELECT * FROM users WHERE id = ?", [lastInsertId]);

//       if (Array.isArray(result) && result.length === 1) {
//         return result[0];
//       } else {
//         return "Nenhum registro inserido, por favor verifique!";
//       }
//     } catch (error) {
//       console.error("Erro na consulta", error);
//       throw error;
//     }
//   }

interface LastInsertResult {
  lastInsertId: number;
}

export class UserRepository {
  async createUser(data: any) {
    // try {
    //   const query = `
    //     INSERT INTO users (first_name, last_name, avatar, pass_word)
    //     VALUES (?, ?, ?, ?);
    //   `;

    //   const values = [
    //     data.first_name,
    //     data.last_name,
    //     data.avatar,
    //     data.pass_word,
    //   ];

    //   await connectionDataBase.promise().query(query, values);

    //   const [lastInsertResult] = (await connectionDataBase
    //     .promise()
    //     .query("SELECT LAST_INSERT_ID() as lastInsertId")) as [
    //     LastInsertResult[],
    //     unknown[]
    //   ];

    //   const lastInsertId = lastInsertResult[0].lastInsertId;

    //   const [result] = await connectionDataBase
    //     .promise()
    //     .query("SELECT * FROM users WHERE id = ?", [lastInsertId]);

    //   if (Array.isArray(result) && result.length === 1) {
    //     return result[0];
    //   } else {
    //     return "Nenhum registro inserido, por favor, verifique!";
    //   }
    // } catch (error) {
    //   console.error("Erro na consulta", error);
    //   throw error;
    // }
    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        pass_word: data.pass_word,
        avatar: data.avatar,
      },
    });
    return user;
  }

  async readUser(userId: number) {
    // try {
    //   const [rows] = await connectionDataBase.promise().query(
    //     /*SQL*/
    //     `SELECT * FROM users WHERE id = ?`,
    //     [id]
    //   );

    //   if (Array.isArray(rows) && rows.length === 0) {
    //     return null; // Retorna null se nenhum registro for encontrado com o ID fornecido
    //   }

    //   const user = rows[0];
    //   return user;
    // } catch (error) {
    //   console.error("Erro na consulta:", error);
    //   throw error; // Propaga o erro para ser tratado em um nível superior, se necessário
    // }
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async listAllUsers() {
    // try {
    //   const queryCode = /*SQL*/ `SELECT * FROM users`;
    //   const [rows] = await connectionDataBase.promise().query(queryCode);

    //   console.log(rows);
    //   return rows;
    // } catch (error) {
    //   console.error("Erro na consulta", error);
    //   throw error;
    // }
    const user = await prisma.users.findMany();
    return user;
  }

  // async addFriend(userA: number, userB: number) {
  //   try {
  //     const query = /*SQL*/ `
  //       INSERT INTO friends (user_a, user_b)
  //       VALUES (?, ?);
  //     `;

  //     const values = [userA, userB];

  //     await connectionDataBase.promise().query(query, values);

  //     const [lastInsertResult] = await connectionDataBase
  //       .promise()
  //       .query("SELECT * FROM friends WHERE id = LAST_INSERT_ID()");

  //     if (Array.isArray(lastInsertResult) && lastInsertResult.length === 1) {
  //       return lastInsertResult[0];
  //     } else {
  //       return "Erro ao incluir os dados, por favor, verifique a query!";
  //     }
  //   } catch (error) {
  //     console.error("Erro na consulta", error);
  //     throw error;
  //   }
  // }

  async addFriend(user_a: number, user_b: number) {
    // try {
    //   const query = /*SQL*/ `
    //     INSERT INTO friends (user_a, user_b)
    //     VALUES (?, ?);
    //   `;

    //   const values = [userA, userB];

    //   await connectionDataBase.promise().query(query, values);

    //   const [lastInsertResult] = (await connectionDataBase
    //     .promise()
    //     .query("SELECT * FROM friends WHERE id = LAST_INSERT_ID()")) as [
    //     { id: number }[],
    //     unknown[]
    //   ];

    //   if (Array.isArray(lastInsertResult) && lastInsertResult.length === 1) {
    //     return lastInsertResult[0];
    //   } else {
    //     return "Erro ao incluir os dados, por favor, verifique a query!";
    //   }
    // } catch (error) {
    //   console.error("Erro na consulta", error);
    //   throw error;
    // }
    const friend = await prisma.friends.create({
      data: {
        user_a,
        user_b,
      },
    });
    return friend;
  }

  // async listLatestFriends(userId: number) {
  //   try {
  //     const query = await prisma.$queryRaw/*SQL*/ `
  //       SELECT u.*
  //       FROM users u
  //       WHERE u.id IN (
  //         SELECT f.user_b
  //         FROM friends f
  //         WHERE f.user_a = ${userId}
  //         UNION
  //         SELECT f.user_a
  //         FROM friends f
  //         WHERE f.user_b = ${userId}
  //       )
  //       ORDER BY u.created_at DESC
  //       LIMIT 9;
  //     `;

  //     const [rows] = await connectionDataBase
  //       .promise()
  //       .query(query, [userId, userId]);
  //     return rows;
  //   } catch (error) {
  //     console.error("Erro na consulta", error);
  //     throw error;
  //   }
  // }

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
