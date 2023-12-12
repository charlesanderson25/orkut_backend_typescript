import { IsInt, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
  @MinLength(16, {
    message: "A mensagem precisa ter pelo menos 16 caracteres",
  })
  @MaxLength(270, {
    message: "O conteúdo pode ter no máximo 270 caracteres",
  })
  content: string;

  @IsInt()
  @IsOptional()
  user_id: number;
}
