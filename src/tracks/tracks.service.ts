import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateUuid } from 'src/utils';
import { V4Options, v4 as uuidv4 } from 'uuid';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  async getIsExist(id: V4Options) {
    const idx = this.tracks.findIndex((item) => item.id === id);
    return idx;
  }

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getByIds(ids: V4Options[]): Promise<Track[]> {
    return this.tracks.filter((item) => ids.includes(item.id as V4Options));
  }

  async getTrackById(id: V4Options): Promise<Track> {
    validateUuid(id);
    const track = this.tracks.find((Track) => Track.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async createTrack(track: Track): Promise<Track> {
    const { name, albumId, artistId, duration } = track;

    if (!name || !duration) {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }

    const newTrack: Track = {
      id: uuidv4(),
      name,
      albumId,
      artistId,
      duration,
    };
    this.tracks.push(newTrack);

    return newTrack;
  }

  async updateTrack(id: V4Options, track: Track): Promise<Track> {
    validateUuid(id);
    const { name, albumId, artistId, duration } = track;

    if (!name || !duration) {
      throw new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    }

    const trackIndex = await this.getIsExist(id);
    if (trackIndex === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      albumId,
      artistId,
      duration,
    };

    return this.tracks[trackIndex];
  }

  async deleteTrack(id: V4Options) {
    validateUuid(id);
    const trackIndex = await this.getIsExist(id);
    if (trackIndex === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.tracks.splice(trackIndex, 1);
  }
}
