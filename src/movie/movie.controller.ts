import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieService } from './movie.service';

@Controller({
  path: 'movies',
  version: '1',
})
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  getMovies() {
    const { data } = this.movieService.getMovies();
    return { data, message: 'Get Movies' };
  }

  @Post()
  createMovie(@Body() dto: CreateMovieDto) {
    const { data } = this.movieService.createMovie(dto);
    return { data, message: 'Create Movie' };
  }

  @Put(':id')
  updateMovieById(
    @Param('id', ParseIntPipe) movieId: number,
    @Body() dto: UpdateMovieDto,
  ) {
    const { data } = this.movieService.updateMovieById(movieId, dto);
    return { data, message: 'Update Movie By ID' };
  }

  @Delete(':id')
  deleteMovieById(@Param('id', ParseIntPipe) movieId: number) {
    const { data } = this.movieService.deleteMovieById(movieId);
    return { data, message: 'Delete Movie By ID' };
  }
}
