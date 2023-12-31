import { faker } from "@faker-js/faker";

// import {
//   createPost,
//   createPostComment,
//   deletePost,
//   listPosts,
//   readPost,
//   updatePost,
// } from "./post.model.repository";

// import { listAllUsers } from "../user/user.model.repository";
import { UserRepository } from "../user/user.model.repository";
import { PostRepository } from "./post.model.repository";

const defaultLimit = 100;
const minCommentCount = 3;
const commentRange = 12;

async function postSeed() {
  const userRepository = new UserRepository();
  const postRepository = new PostRepository();
  const users = await userRepository.listAllUsers();
  const usersIds = users.map((user) => user.id);
  console.log(usersIds);
  const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let index = 0; index < limit; index++) {
    const userId = getRandomUserId(usersIds);
    console.log(userId);
    const postData = generatePost(userId);

    const post = await postRepository.createPost(postData);
    console.log(`Criado post de id #${post.id}`);

    await commentSeed(post, usersIds);
  }

  console.log("Seed realizado com sucesso!");
}

async function commentSeed(
  post: {
    id: number;
    CONTENT: string;
    created_at: Date;
    user_id: number | null;
  },
  usersIds: number
) {
  const userRepository = new UserRepository();
  const postRepository = new PostRepository();
  const commentCount =
    minCommentCount + Math.round(Math.random() * commentRange);
  for (let index = 0; index < commentCount; index++) {
    const userId = getRandomUserId(usersIds);
    const comment = generateComment(userId);
    const addedComment = await postRepository.createPostComment(
      post.id,
      comment.message,
      comment.user_id
    );
    // console.log(`Post criado com id: ${addedComment.id}`);
    if (isCommentWithId(addedComment)) {
      console.log(`Post criado com id: ${addedComment.id}`);
    } else {
      console.log(`Erro ao incluir os dados, por favor, verifique a query!`);
    }
    function isCommentWithId(comment: any): comment is { id: number } {
      return typeof comment === "object" && comment !== null && "id" in comment;
    }
  }
}
// }

function generatePost(user_id: number) {
  return {
    user_id,
    // title: faker.lorem.word(4 + Math.round(Math.random() * 5)),
    content: faker.lorem.words(5 + Math.round(Math.random() * 6)),
    // content: faker.lorem.paragraph(3 + Math.round(Math.random() * 7)),
    // created_at: faker.date.past({ years: 5 }).toJSON,
  };
}

// function generateComment(user_id) {
//   return {
//     user_id,
//     message: faker.lorem.words(2 + Math.round(Math.random() * 5)),
//   };
// }

function generateComment(user_id: number) {
  const comment = {
    user_id,
    message: faker.lorem.words(2 + Math.round(Math.random() * 5)),
  };

  console.log("Generated comment:", comment.message); // Adicione esta linha para depuração

  return comment;
}

function getRandomUserId(usersId: number) {
  return usersId[Math.floor(Math.random() * usersId.length)];
}

postSeed();
