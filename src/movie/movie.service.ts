import { Injectable } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto';

@Injectable()
export class MovieService {
  getMovies() {
    return { data: [], message: 'Get Movies' };
  }
  createMovie(dto: CreateMovieDto) {
    return { data: dto, message: 'Create Movie' };
  }

  updateMovieById(movieId: number, dto: UpdateMovieDto) {
    console.log('createMovie dto: ', dto);
    console.log('Update userId', movieId);
    return { data: 'Update Movie By ID' };
  }

  deleteMovieById(movieId: number) {
    console.log('Delete userId', movieId);
    return { data: 'Delete Movie By ID' };
  }
}
