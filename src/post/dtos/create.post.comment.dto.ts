import { IsInt, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreatePostCommentDto {
  @MinLength(4, {
    message: "A mensagem precisa ter pelo menos 4 caracteres",
  })
  @MaxLength(96, {
    message: "O conteúdo pode ter no máximo 96 caracteres",
  })
  content: string;

  @IsInt()
  @IsOptional()
  user_id: number;
}
