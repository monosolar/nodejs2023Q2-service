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
    private readonly usersRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistrDto) {
    return await this.usersRepository.save(createArtistDto);
  }

  async getAll() {
    return await this.usersRepository.find();
  }

  async getById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.usersRepository.delete({ id });
  }

  /* async updateArtist(id: V4Options, artist: Artist): Promise<Artist> {
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
  } */
}
