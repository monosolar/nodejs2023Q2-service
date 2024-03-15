import { Injectable } from '@nestjs/common';
import { Album, AlbumsService } from 'src/albums/albums.service';
import { Artist, ArtistsService } from 'src/artists/artists.service';
import { Track, TracksService } from 'src/tracks/tracks.service';
import { V4Options } from 'uuid';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavsService {
  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favorites = {
      tracks: await Promise.resolve([]),
      albums: await Promise.resolve([]),
      artists: await Promise.resolve([]),
    };

    return favorites;
  }

  async addTrack(id: V4Options) {
    //await this.tracksService.addFav(id);
  }

  async addArtist(id: V4Options) {
    //await this.artistsService.addFav(id);
  }

  async addAlbum(id: V4Options) {
    // await this.albumsService.addFav(id);
  }

  async deleteTrack(id: V4Options) {
    //await this.tracksService.deleteFav(id);
  }

  async deleteArtist(id: V4Options) {
    //await this.artistsService.deleteFav(id);
  }

  async deleteAlbum(id: V4Options) {
    //await this.albumsService.deleteFav(id);
  }
}
