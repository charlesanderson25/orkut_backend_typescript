import { UserRepository } from "../user/user.model.repository";
import { SignInDto } from "./dto/sign-in.dto";
import { UnauthorizedError, BadRequestError } from "routing-controllers";
import { JwtService } from "./jwt.service";
// import { th } from "@faker-js/faker";
import type { CreateUserDto } from "../user/dtos/create.user.dto";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.jwtService = new JwtService();
  }

  userRepository: UserRepository;
  jwtService: JwtService;

  async signIn({ email, password }: SignInDto) {
    const maybeUser = await this.userRepository.findByEmail(email);

    if (maybeUser === null) {
      throw new UnauthorizedError("Não existe um usuário com esse e-mail!");
    }

    if (password !== maybeUser.pass_word) {
      throw new UnauthorizedError("E-mail ou senha inválidos");
    }

    const payload = {
      id: maybeUser.id,
      name: `${maybeUser.first_name} ${maybeUser.last_name}`,
      email: maybeUser.email,
    };

    const token = this.jwtService.encode(payload);

    return { user: maybeUser, token };
  }
  async signUp(createUserDto: CreateUserDto) {
    const maybeUser = await this.userRepository.findByEmail(
      createUserDto.email
    );
    if (maybeUser) {
      throw new BadRequestError("Alguém já está utilizando esse e-mail");
    }
    const user = await this.userRepository.createUser(createUserDto);

    const payload = {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
    };

    const token = this.jwtService.encode(payload);

    return { user, token };
  }
}
