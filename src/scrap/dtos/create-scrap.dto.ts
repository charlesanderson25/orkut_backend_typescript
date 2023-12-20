import { IsInt, MinLength, MaxLength, Min } from "class-validator";

export class CreateScrapDto {
  @IsInt()
  creatorId: number;

  @IsInt()
  ownerId: number;

  @MinLength(4, {
    message: "A mensagem precisa ter pelo menos 4 caracteres",
  })
  @MaxLength(256, {
    message: "A mensagem precisa ter até 256 caracteres",
  })
  message: string;
}
