import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './artists.entity';
import { CreateArtistrDto } from './dto/creare.artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistrDto) {
    return await this.artistsRepository.save(createArtistDto);
  }

  async getAll() {
    return await this.artistsRepository.find();
  }

  async getById(id: string) {
    return await this.artistsRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.artistsRepository.delete({ id });
  }

  async update(id: string, artist: CreateArtistrDto): Promise<Artist> {
    await this.artistsRepository.update(id, artist);

    return await this.getById(id);
  }
}
