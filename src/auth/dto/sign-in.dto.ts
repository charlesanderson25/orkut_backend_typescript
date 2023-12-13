import { IsEmail, IsString } from "class-validator";

export class SignInDto {
  @IsEmail(undefined, {
    message: "O e-mail informado é inválido!",
  })
  email: string;

  @IsString({
    message: "É necessário enviar a senha!",
  })
  password: string;
}
