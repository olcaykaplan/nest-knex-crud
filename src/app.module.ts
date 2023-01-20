import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [MovieModule, GenderModule],
})
export class AppModule {}
