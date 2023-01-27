import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  releasedYear: number;

  @IsNotEmpty()
  @IsNumber()
  imdbRating: number;

  @IsOptional()
  @IsArray()
  genres: Array<string>;
}
