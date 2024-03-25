import { config } from 'dotenv';
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
import { FavAlbumsEntity } from './favs/entities/fav.albums.entity';
import { FavArtistsEntity } from './favs/entities/fav.artists.entity';
import { FavTracksEntity } from './favs/entities/fav.tracks.entity';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        UsersEntity,
        ArtistEntity,
        AlbumEntity,
        TrackEntity,
        FavAlbumsEntity,
        FavArtistsEntity,
        FavTracksEntity,
      ],
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
