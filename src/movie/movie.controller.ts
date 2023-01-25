import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    try {
      const data = await this.movieService.getMovies();
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Get(':id')
  async getMovieById(@Param('id', ParseUUIDPipe) movieId: string) {
    try {
      const data = await this.movieService.getMovieById(movieId);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Post()
  async createMovie(@Body() dto: CreateMovieDto) {
    try {
      const data = await this.movieService.createMovie(dto);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Put(':id')
  async updateMovieById(
    @Param('id', ParseUUIDPipe) movieId: string,
    @Body() dto: UpdateMovieDto,
  ) {
    try {
      const data = await this.movieService.updateMovieById(movieId, dto);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Delete(':id')
  async deleteMovieById(@Param('id', ParseUUIDPipe) movieId: string) {
    try {
      const data = await this.movieService.deleteMovieById(movieId);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }
}
