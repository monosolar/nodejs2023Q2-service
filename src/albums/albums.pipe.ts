import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Album, AlbumsService } from './albums.service';

@Injectable()
export class AlbumPipe implements PipeTransform<string, Promise<Album>> {
  constructor(private readonly albumssService: AlbumsService) {}

  async transform(id: Album['id']) {
    const user = await this.albumssService.getById(id);

    if (!user) {
      throw new NotFoundException(`No entry with id ${id}`);
    }

    return user;
  }
}
