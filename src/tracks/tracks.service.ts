import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './tracks.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create.track.dto';

export interface Track {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.save(createTrackDto);
  }

  async getAll() {
    return await this.tracksRepository.find();
  }

  async getById(id: string) {
    return await this.tracksRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.tracksRepository.delete({ id });
  }

  async update(id: string, track: CreateTrackDto): Promise<Track> {
    await this.tracksRepository.update(id, track);

    return await this.getById(id);
  }
}
