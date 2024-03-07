import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { V4Options } from 'uuid';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getAll() {
    return await this.favsService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: V4Options) {
    return await this.favsService.addTrack(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: V4Options) {
    return await this.favsService.addArtist(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: V4Options) {
    return await this.favsService.addAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: V4Options) {
    return await this.favsService.deleteTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: V4Options) {
    return await this.favsService.deleteArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: V4Options) {
    return await this.favsService.deleteAlbum(id);
  }
}
