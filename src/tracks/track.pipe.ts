import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Track, TracksService } from './tracks.service';

@Injectable()
export class TrackPipe implements PipeTransform<string, Promise<Track>> {
  constructor(private readonly trackssService: TracksService) {}

  async transform(id: Track['id']) {
    const entity = await this.trackssService.getById(id);

    if (!entity) {
      throw new NotFoundException(`No entry with id ${id}`);
    }

    return entity;
  }
}
