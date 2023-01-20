import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  releasedYear?: number;

  @IsOptional()
  @IsNumber()
  imdbRating?: number;
}
