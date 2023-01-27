import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateMovieDto, UpdateMovieDto } from './dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel() private knex: Knex) {}
  async getMovies() {
    const movies = await this.knex('movie_genre')
      .select(
        'movies.*',
        this.knex.raw(`GROUP_CONCAT(genres.name SEPARATOR ', ') as genres`),
      )
      .leftJoin('genres', 'movie_genre.genreId', 'genres.genreId')
      .rightJoin('movies', 'movie_genre.movieId', 'movies.movieId')
      .groupBy('movies.movieId');

    return movies;
  }
  async getMovieById(movieId: string) {
    const movie = await this.knex('movie_genre')
      .select(
        'movies.*',
        this.knex.raw(`GROUP_CONCAT(genres.name SEPARATOR ', ') as genres`),
      )
      .leftJoin('genres', 'movie_genre.genreId', 'genres.genreId')
      .rightJoin('movies', 'movie_genre.movieId', 'movies.movieId')
      .groupBy('movies.movieId')
      .where({ 'movies.movieId': movieId })
      .then((movie) => (movie.length > 0 ? movie[0] : null));
    if (!movie) throw new Error('The movie was not found.');
    return movie;
  }
  async createMovie(dto: CreateMovieDto) {
    const { genres, ...movie } = dto;
    await this.knex('movies').insert(movie);
    const newMovie = await this.knex('movies')
      .where({
        ...movie,
      })
      .then((res) => res[0]);

    const genreIds = await this.knex('genres')
      .select('genreId')
      .whereIn('name', genres);

    const fieldsToInsertForMovieGenre = genreIds.map((genre) => ({
      movieId: newMovie.movieId,
      genreId: genre.genreId,
    }));

    await this.knex('movie_genre').insert(fieldsToInsertForMovieGenre);

    return { ...newMovie, genres: genres.join(', ') };
  }
  async updateMovieById(movieId: string, dto: UpdateMovieDto) {
    const { genres, ...movieUpdateData } = dto;
    const oldMovie = await this.getMovieById(movieId);
    if (!oldMovie) {
      throw new Error('The movie was not found.');
    }
    await this.knex('movies')
      .where('movieId', movieId)
      .update({ ...movieUpdateData });
    // const movie = await this.getMovieById(movieId);

    if (genres) {
      // get genreIds to add movie_genre
      const genreIds = await this.knex('genres')
        .select('genreId')
        .whereIn('name', genres)
        .then((res) => {
          console.log('res: ', res);
          return res;
        });

      const fieldsToInsertForMovieGenre = genreIds.map((genre) => ({
        movieId: oldMovie.movieId,
        genreId: genre.genreId,
      }));

      // delete all rows which relational with the movie before inserting new rows
      await this.knex('movie_genre')
        .where('movieId', oldMovie.movieId)
        .delete();

      // insert new genres for movie
      await this.knex('movie_genre').insert(fieldsToInsertForMovieGenre);
    }

    return 'The movie has been successfully updated.';
  }

  async deleteMovieById(movieId: string) {
    const movie = await this.getMovieById(movieId);
    if (!movie) {
      throw new Error('The movie was not found.');
    }
    await this.knex('movies').where('movieId', movieId).delete();
    return 'The movie has been successfully deleted.';
  }
}
