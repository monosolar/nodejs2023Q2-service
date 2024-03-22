import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/albums.entity';
import { Album } from 'src/albums/albums.service';
import { ArtistEntity } from 'src/artists/artists.entity';
import { Artist } from 'src/artists/artists.service';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { Track } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { FavAlbumsEntity } from './entities/fav.albums.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavAlbumsEntity)
    private readonly favAlbumsRepository,
  ) {}

  async getAll() {
    const favorites = {
      tracks: await this.favAlbumsRepository.find(),
      albums: await this.favAlbumsRepository.find(),
      artists: await this.favAlbumsRepository.find(),
    };

    return favorites;
  }

  async addTrack(trackId: string) {
    //return await this.favAlbumsRepository.save({ trackId });
  }

  async addArtist(id: string) {
    //await this.artistsService.addFav(id);
  }

  async addAlbum(albumId: string) {
    return await this.favAlbumsRepository.save({ albumId });
  }

  async deleteTrack(id: string) {
    //await this.tracksService.deleteFav(id);
  }

  async deleteArtist(id: string) {
    //await this.artistsService.deleteFav(id);
  }

  async deleteAlbum(id: string) {
    //await this.albumsService.deleteFav(id);
  }
}
