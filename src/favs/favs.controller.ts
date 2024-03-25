import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackPipe } from 'src/tracks/track.pipe';
import { Track } from 'src/tracks/tracks.service';
import { Artist } from 'src/artists/artists.service';
import { ArtistPipe } from 'src/artists/artists.pipe';
import { AlbumEntity } from 'src/albums/albums.entity';
import { AlbumPipe } from 'src/albums/albums.pipe';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getAll() {
    return await this.favsService.getAll();
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe())
  async addTrack(@Param('id', ParseUUIDPipe, TrackPipe) entity: Track) {
    const { id } = entity;
    return await this.favsService.addTrack(id);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe())
  async addArtist(@Param('id', ParseUUIDPipe, ArtistPipe) entity: Artist) {
    const { id } = entity;
    return await this.favsService.addArtist(id);
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe())
  async addAlbum(@Param('id', ParseUUIDPipe, AlbumPipe) entity: AlbumEntity) {
    const { id } = entity;
    return await this.favsService.addAlbum(id);
  }

  @Delete('track/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe, TrackPipe) entity: Track) {
    const { id } = entity;
    return await this.favsService.deleteTrack(id);
  }

  @Delete('artist/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe, ArtistPipe) entity: Artist) {
    const { id } = entity;
    return await this.favsService.deleteArtist(id);
  }

  @Delete('album/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', ParseUUIDPipe, AlbumPipe) entity: AlbumEntity,
  ) {
    const { id } = entity;
    return await this.favsService.deleteAlbum(id);
  }
}
