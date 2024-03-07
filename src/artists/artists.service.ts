import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { V4Options, v4 as uuidv4 } from 'uuid';

import { validateUuid } from 'src/utils';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistsService {
  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {}

  private artists: Artist[] = [];

  async getIsExist(id: V4Options) {
    const idx = this.artists.findIndex((item) => item.id === id);
    return idx;
  }

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getByIds(ids: V4Options[]): Promise<Artist[]> {
    return this.artists.filter((item) => ids.includes(item.id as V4Options));
  }

  async getArtistById(id: V4Options): Promise<Artist> {
    validateUuid(id);
    const artist = this.artists.find((Artist) => Artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async createArtist(artist: Artist): Promise<Artist> {
    const { name, grammy } = artist;
    if (!name || typeof grammy !== 'boolean') {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }

    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(id: V4Options, artist: Artist): Promise<Artist> {
    validateUuid(id);
    const { name, grammy } = artist;

    if (!name || typeof grammy !== 'boolean') {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }

    const artistIndex = await this.getIsExist(id);
    if (artistIndex === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    this.artists[artistIndex] = { ...this.artists[artistIndex], name, grammy };

    return this.artists[artistIndex];
  }

  async deleteArtist(id: V4Options): Promise<void> {
    validateUuid(id);
    const artistIndex = await this.getIsExist(id);
    if (artistIndex === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.artists.splice(artistIndex, 1);
    this.tracksService.deleteArtists(id);
    this.albumsService.deleteArtists(id);
  }
}
