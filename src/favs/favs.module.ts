import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavAlbumsEntity } from './entities/fav.albums.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
    TypeOrmModule.forFeature([FavAlbumsEntity]),
    ArtistModule,
    AlbumsModule,
    TracksModule,
  ],
})
export class FavsModule {}
