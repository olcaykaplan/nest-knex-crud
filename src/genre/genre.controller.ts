import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
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
    const data = await this.genreService.getGenres();
    return { data, message: 'Get Genres' };
  }

  @Post()
  async createGenre(@Body() dto: CreateGenreDto) {
    const data = await this.genreService.createGenre(dto);
    return { data, message: 'Genre is created' };
  }

  @Put(':id')
  async updateGenreById(
    @Param('id', ParseUUIDPipe) genreId: string,
    @Body() dto: UpdateGenreDto,
  ) {
    const data = await this.genreService.updateGenreById(genreId, dto);
    return { data, message: 'Genre is updated' };
  }

  @Delete(':id')
  async deleteGenreById(@Param('id', ParseUUIDPipe) genreId: string) {
    const data = await this.genreService.deleteGenreById(genreId);
    return { data, message: 'Genre is Deleted' };
  }
}
