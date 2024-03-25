import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Artist, ArtistsService } from './artists.service';

@Injectable()
export class ArtistPipe implements PipeTransform<string, Promise<Artist>> {
  constructor(private readonly artistsService: ArtistsService) {}

  async transform(id: Artist['id']) {
    const user = await this.artistsService.getById(id);

    if (!user) {
      throw new NotFoundException(`No entry with id ${id}`);
    }

    return user;
  }
}
