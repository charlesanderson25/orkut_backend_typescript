import { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export class JwtService {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) {
      throw new EmptyJwtError();
    }
    this.jwtSecret = jwtSecret;
  }

  private jwtSecret: string;

  encode(payload: Object) {
    const token = jwt.sign(payload, this.jwtSecret);
    return token;
  }

  decode(token: string) {
    const payload = jwt.verify(token, this.jwtSecret);
    return payload;
  }
}

class EmptyJwtError extends Error {}
