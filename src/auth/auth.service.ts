import { UserRepository } from "../user/user.model.repository";
import { SignInDto } from "./dto/sign-in.dto";
import { UnauthorizedError } from "routing-controllers";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  userRepository: UserRepository;

  async signIn({ email, password }: SignInDto) {
    const maybeUser = await this.userRepository.findByEmail(email);

    if (maybeUser === null) {
      throw new UnauthorizedError("Não existe um usuário com esse e-mail!");
    }

    if (password !== maybeUser.pass_word) {
      throw new UnauthorizedError("E-mail ou senha inválidos");
    }

    return { user: maybeUser };
  }
}
