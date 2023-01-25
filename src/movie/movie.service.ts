import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateMovieDto, UpdateMovieDto } from './dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel() private knex: Knex) {}
  async getMovies() {
    const movies = await this.knex()
      .select(
        'movies.*',
        this.knex.raw(`GROUP_CONCAT(genres.name SEPARATOR ', ') as genres`),
      )
      .from('movie_genre')
      .innerJoin('genres', 'movie_genre.genreId', 'genres.genreId')
      .innerJoin('movies', 'movie_genre.movieId', 'movies.movieId')
      .groupBy('movies.movieId');

    console.log('getMovies movies: ', movies);
    return movies;
  }
  async getMovieById(movieId: string) {
    const movie = await this.knex()
      .select(
        'movies.*',
        this.knex.raw(`GROUP_CONCAT(genres.name SEPARATOR ', ') as genres`),
      )
      .from('movie_genre')
      .innerJoin('genres', 'movie_genre.genreId', 'genres.genreId')
      .innerJoin('movies', 'movie_genre.movieId', 'movies.movieId')
      .groupBy('movies.movieId')
      .where({ 'movies.movieId': movieId })
      .then((movie) => (movie.length > 0 ? movie[0] : null));
    return movie;
  }
  async createMovie(dto: CreateMovieDto) {
    const newMovieId = await this.knex('movies')
      .insert(dto)
      .then((movie) => movie[0]);
    const newMovie = await this.knex('movies').where({
      movieId: newMovieId,
    });
    return newMovie;
  }
  async updateMovieById(movieId: string, dto: UpdateMovieDto) {
    const movie = await this.getMovieById(movieId);
    if (!movie) {
      return 'The movie was not found.';
    }
    await this.knex('movies')
      .where('movieId', movieId)
      .update({ ...dto });
    return 'The movie has been successfully updated.';
  }

  async deleteMovieById(movieId: string) {
    const movie = await this.getMovieById(movieId);
    if (!movie) {
      return 'The movie was not found.';
    }
    await this.knex('movies').where('movieId', movieId).delete();
    return 'The movie has been successfully deleted.';
  }
}
