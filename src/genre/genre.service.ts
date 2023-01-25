import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { CreateGenreDto, UpdateGenreDto } from './dto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
@Injectable()
export class GenreService {
  constructor(@InjectModel() private knex: Knex) {}
  async getGenres() {
    const genres = await this.knex('genres');
    return genres;
  }
  async getGenreById(genreId: string) {
    const genre = await this.knex('genres')
      .where('id', genreId)
      .then((genre) => (genre.length > 0 ? genre[0] : null));
    return genre;
  }
  async createGenre({ name }: CreateGenreDto) {
    await this.knex('genres').insert({ name });
    return 'genre is created';
  }

  async updateGenreById(genreId: string, dto: UpdateGenreDto) {
    const genre = this.getGenreById(genreId);
    if (!genre) return 'The genre was not found.';
    await this.knex('genres')
      .where(genreId)
      .update({ ...dto });
    return 'genre is updated';
  }

  async deleteGenreById(genreId: string) {
    const genre = this.getGenreById(genreId);
    if (!genre) return 'The genre was not found.';
    await this.knex('genres').where(genreId).delete();
    return 'genre is Deleted';
  }
}
