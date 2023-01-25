import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateGenreDto, UpdateGenreDto } from './dto';
import { GenreService } from './genre.service';

@Controller({
  path: 'genres',
  version: '1',
})
export class GenreController {
  constructor(private genreService: GenreService) {}
  @Get()
  async getGenres() {
    try {
      const data = await this.genreService.getGenres();
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Post()
  async createGenre(@Body() dto: CreateGenreDto) {
    try {
      const data = await this.genreService.createGenre(dto);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Put(':id')
  async updateGenreById(
    @Param('id', ParseUUIDPipe) genreId: string,
    @Body() dto: UpdateGenreDto,
  ) {
    try {
      const data = await this.genreService.updateGenreById(genreId, dto);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  @Delete(':id')
  async deleteGenreById(@Param('id', ParseUUIDPipe) genreId: string) {
    try {
      const data = await this.genreService.deleteGenreById(genreId);
      return { data, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }
}
