import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class FilterCommentsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  user?: number

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  min_rating?: number

  @IsString()
  @IsIn(['rating'])
  @IsOptional()
  order_by?: 'rating'
}