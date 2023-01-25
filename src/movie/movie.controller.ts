import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
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
  async getMovies() {
    const data = await this.movieService.getMovies();
    return { data, message: 'Get Movies' };
  }

  @Get(':id')
  async getMovieById(@Param('id', ParseUUIDPipe) movieId: string) {
    const data = await this.movieService.getMovieById(movieId);
    return { data, error: false };
  }

  @Post()
  async createMovie(@Body() dto: CreateMovieDto) {
    const data = await this.movieService.createMovie(dto);
    return { data, message: 'Create Movie' };
  }

  @Put(':id')
  async updateMovieById(
    @Param('id', ParseUUIDPipe) movieId: string,
    @Body() dto: UpdateMovieDto,
  ) {
    const data = await this.movieService.updateMovieById(movieId, dto);
    return { data, message: 'Update Movie By ID' };
  }

  @Delete(':id')
  async deleteMovieById(@Param('id', ParseUUIDPipe) movieId: string) {
    const data = await this.movieService.deleteMovieById(movieId);
    return { data, message: 'Delete Movie By ID' };
  }
}
