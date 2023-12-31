// import { addFriend, listAllUsers } from "../user/user.model.repository";
import { UserRepository } from "../user/user.model.repository";

const minFriendsCount = 12;
const friendsRange = 15;

async function seedFriend() {
  const userRepository = new UserRepository();

  //   const limit = Number(process.argv[2] ?? defaultLimit);
  console.log("Iniciando seed...");
  //   console.log(`Vão ser criados ${limit} users`);
  const users = await userRepository.listAllUsers();
  const usersId = users.map((user) => user.id);
  let friendships: Array<{ userA: number; userB: number }> = [];

  for (const id of usersId) {
    const friendsCount =
      minFriendsCount + Math.round(Math.random() * friendsRange);
    // console.log(friendsCount);
    for (let index = 0; index < friendsCount; index++) {
      let randomId: number;
      do {
        randomId = usersId[Math.floor(Math.random() * usersId.length)];
      } while (
        randomId === id ||
        friendships.some(
          (friend) =>
            (friend.userA === id && friend.userB === randomId) ||
            (friend.userA === randomId && friend.userB === id)
        )
      );
      friendships.push({
        userA: id,
        userB: randomId,
      });
    }
  }
  for (const { userA, userB } of friendships) {
    await userRepository.addFriend(userA, userB);
    console.log(`Usuário #${userA} adicionou #${userB}`);
  }
  console.log("Seeding realizado com sucesso!");
}

seedFriend();

// add comment
