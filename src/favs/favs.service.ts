import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album, AlbumsService } from 'src/albums/albums.service';
import { Artist, ArtistsService } from 'src/artists/artists.service';
import { Track, TracksService } from 'src/tracks/tracks.service';
import { validateUuid } from 'src/utils';
import { V4Options } from 'uuid';

interface FavoritesResponse {
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
      tracks: await this.tracksService.getAllTracks(),
      albums: await this.albumsService.getAllAlbums(),
      artists: await this.artistsService.getAllArtists(),
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
    return [];
  }

  async addAlbum(id: V4Options) {
    validateUuid(id);
    return [];
  }

  async deleteTrack(id: V4Options) {
    validateUuid(id);
    return [];
  }

  async deleteArtist(id: V4Options) {
    validateUuid(id);
    return [];
  }

  async deleteAlbum(id: V4Options) {
    validateUuid(id);
    return [];
  }
}
