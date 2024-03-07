import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { validateUuid } from 'src/utils';
import { V4Options, v4 as uuidv4 } from 'uuid';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

@Injectable()
export class AlbumsService {
  constructor(private tracksService: TracksService) {}

  private albums: Album[] = [];

  async getIsExist(id: V4Options) {
    const idx = this.albums.findIndex((item) => item.id === id);
    return idx;
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getByIds(ids: V4Options[]): Promise<Album[]> {
    return this.albums.filter((item) => ids.includes(item.id as V4Options));
  }

  async getAlbumById(id: V4Options): Promise<Album> {
    validateUuid(id);
    const album = this.albums.find((Album) => Album.id === id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async createAlbum(album: Album): Promise<Album> {
    const { name, year, artistId } = album;

    if (!name || !year) {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }
    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albums.push(newAlbum);

    return newAlbum;
  }

  async updateAlbum(id: V4Options, album: Album): Promise<Album> {
    validateUuid(id);
    const { name, year, artistId } = album;

    if (typeof year !== 'number') {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }

    const albumIndex = await this.getIsExist(id);
    if (albumIndex === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      name,
      year,
      artistId,
    };

    return this.albums[albumIndex];
  }

  async deleteAlbum(id: V4Options) {
    validateUuid(id);

    const albumIndex = await this.getIsExist(id);
    if (albumIndex === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albums.splice(albumIndex, 1);
    this.tracksService.deleteAlbum(id);
  }

  async deleteArtists(artistId: V4Options) {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
      return album;
    });
  }
}
