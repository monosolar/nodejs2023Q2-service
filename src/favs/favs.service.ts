import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album, AlbumsService } from 'src/albums/albums.service';
import { Artist, ArtistsService } from 'src/artists/artists.service';
import { Track, TracksService } from 'src/tracks/tracks.service';
import { validateUuid } from 'src/utils';
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

  private albumsIds: V4Options[] = [];
  private tracksIds: V4Options[] = [];
  private artistsIds: V4Options[] = [];

  async getAll(): Promise<FavoritesResponse> {
    const favorites = {
      tracks: await this.tracksService.getByIds(this.tracksIds),
      albums: await this.albumsService.getByIds(this.albumsIds),
      artists: await this.artistsService.getByIds(this.artistsIds),
    };

    return favorites;
  }

  async addTrack(id: V4Options) {
    validateUuid(id);

    const trackIndex = await this.tracksService.getIsExist(id);
    if (trackIndex === -1) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.tracksIds.includes(id)) {
      this.tracksIds.push(id);
    }

    return id;
  }

  async addArtist(id: V4Options) {
    validateUuid(id);

    const artistIndex = await this.artistsService.getIsExist(id);
    if (artistIndex === -1) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.artistsIds.includes(id)) {
      this.artistsIds.push(id);
    }

    return id;
  }

  async addAlbum(id: V4Options) {
    validateUuid(id);

    const albumIndex = await this.albumsService.getIsExist(id);
    if (albumIndex === -1) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.albumsIds.includes(id)) {
      this.albumsIds.push(id);
    }

    return id;
  }

  async deleteTrack(id: V4Options) {
    validateUuid(id);
    const foundIndex = await this.tracksIds.findIndex((item) => item === id);
    this.tracksIds.splice(foundIndex, 1);
  }

  async deleteArtist(id: V4Options) {
    validateUuid(id);
    const foundIndex = await this.artistsIds.findIndex((item) => item === id);
    this.artistsIds.splice(foundIndex, 1);
    return [];
  }

  async deleteAlbum(id: V4Options) {
    validateUuid(id);
    const foundIndex = await this.albumsIds.findIndex((item) => item === id);
    this.albumsIds.splice(foundIndex, 1);
    return [];
  }
}
