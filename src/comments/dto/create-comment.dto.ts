import { IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsOptional()
  value?: string

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number

  @IsUUID()
  bikeId: string

  @IsInt()
  @IsPositive()
  userId: number
}
