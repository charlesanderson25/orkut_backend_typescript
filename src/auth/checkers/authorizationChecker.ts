import { Action } from "routing-controllers";
import {
  JwtService,
  EmptyJwtError,
  InvalidAuthorizationHeaderError,
} from "../jwt.service";
import { UserRepository } from "../../user/user.model.repository";

const jwtService = new JwtService();
// const userRepository = new UserRepository();

export async function authorizationChecker(action: Action): Promise<boolean> {
  try {
    const payload = jwtService.extractTokenFromHeader(action.request);
    // const user = await userRepository.findByEmail(payload.email);
    // action.request.user = user;

    return true;
  } catch (error) {
    if (error instanceof InvalidAuthorizationHeaderError) {
      return false;
    }
    throw error;
  }
}
