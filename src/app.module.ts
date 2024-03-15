import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'eugenekosenko',
      password: 'root',
      database: 'rsschool',
      entities: [UsersEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
    ArtistModule,
    AlbumsModule,
    TracksModule,
    FavsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
