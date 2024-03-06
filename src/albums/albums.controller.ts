import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { V4Options } from 'uuid';
import { Album, AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: V4Options) {
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: Album) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbumPassword(
    @Param('id') id: V4Options,
    @Body() updatePasswordDto: Album,
  ) {
    return await this.albumService.updateAlbum(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: V4Options) {
    return await this.albumService.deleteAlbum(id);
  }
}
