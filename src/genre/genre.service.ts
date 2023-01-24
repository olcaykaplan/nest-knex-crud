import { Injectable } from '@nestjs/common';
import { CreateGenreDto, UpdateGenreDto } from './dto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
@Injectable()
export class GenreService {
  constructor(@InjectModel() private knex: Knex) {}
  async getGenres() {
    const genres = await this.knex('genre');
    return genres;
  }
  async getGenreById(genreId: number) {
    const genre = await this.knex('genre')
      .where('id', genreId)
      .then((genre) => (genre.length > 0 ? genre[0] : null));
    return genre;
  }
  async createGenre({ name }: CreateGenreDto) {
    await this.knex('genre').insert({ name });
    return 'genre is created';
  }

  async updateGenreById(genreId: number, dto: UpdateGenreDto) {
    const genre = this.getGenreById(genreId);
    if (!genre) return 'The genre was not found.';
    await this.knex('genre')
      .where(genreId)
      .update({ ...dto });
    return 'genre is updated';
  }

  async deleteGenreById(genreId: number) {
    const genre = this.getGenreById(genreId);
    if (!genre) return 'The genre was not found.';
    await this.knex('genre').where(genreId).delete();
    return 'genre is Deleted';
  }
}
