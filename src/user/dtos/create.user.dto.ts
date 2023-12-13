import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  avatar: string;

  @IsString()
  pass_word: string;

  @IsEmail()
  email: string;
}
