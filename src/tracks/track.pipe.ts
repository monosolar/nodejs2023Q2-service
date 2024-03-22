import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Track, TracksService } from './tracks.service';

@Injectable()
export class TrackPipe implements PipeTransform<string, Promise<Track>> {
  constructor(private readonly trackssService: TracksService) {}

  async transform(id: Track['id']) {
    const user = await this.trackssService.getById(id);

    if (!user) {
      throw new NotFoundException(`No entry with id ${id}`);
    }

    return user;
  }
}
