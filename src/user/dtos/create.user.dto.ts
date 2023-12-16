import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({
    message: "O nome precisa ser uma string",
  })
  @MinLength(2, { message: "O nome precisa ter pelo menos 2 letras" })
  first_name: string;

  @IsString()
  @MinLength(2, { message: "O sobrenome precisa ter pelo menos 2 letras" })
  last_name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
  pass_word: string;

  @IsEmail(undefined, { message: "O e-mail digitado é inválido" })
  email: string;
}
