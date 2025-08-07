import { IsIn, IsInt, IsString, Max, Min } from "class-validator"

export class CreateBikeDto {
  @IsInt()
  @Min(0)
  @Max(300)
  no: number

  @IsString()
  @IsIn(['disponible', 'ocupada'])
  status: string
}