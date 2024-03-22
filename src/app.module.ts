import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { ArtistEntity } from './artists/artists.entity';
import { AlbumEntity } from './albums/albums.entity';
import { TrackEntity } from './tracks/tracks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // todo put to env
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'eugenekosenko',
      password: 'root',
      database: 'rsschool',
      entities: [UsersEntity, ArtistEntity, AlbumEntity, TrackEntity],
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
