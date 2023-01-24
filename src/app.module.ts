import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
// import { KnexModule } from './knex/knex.module';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    MovieModule,
    GenreModule,
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '8.0',
        useNullAsDefault: true,
        connection: {
          host: 'localhost',
          user: 'root',
          password: '728096Ok',
          database: 'knex_crud',
        },
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
