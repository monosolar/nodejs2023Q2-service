import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './albums.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create.album.dto';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.save(createAlbumDto);
  }

  async getAll() {
    return await this.albumsRepository.find();
  }

  async getById(id: string) {
    return await this.albumsRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.albumsRepository.delete({ id });
  }

  async update(id: string, album: CreateAlbumDto): Promise<Album> {
    await this.albumsRepository.update(id, album);

    return await this.getById(id);
  }
}
