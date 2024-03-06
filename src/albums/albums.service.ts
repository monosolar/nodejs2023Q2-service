import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  private albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
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

    const albumIndex = this.albums.findIndex((user) => user.id === id);
    if (albumIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
    const albumIndex = this.albums.findIndex((Album) => Album.id === id);
    if (albumIndex === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albums.splice(albumIndex, 1);
  }
}
