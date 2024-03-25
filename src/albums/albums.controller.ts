import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Album, AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create.album.dto';
import { AlbumPipe } from './albums.pipe';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  async getAll() {
    return await this.albumService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe, AlbumPipe) entity: Album) {
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe, AlbumPipe) entity: Album) {
    return await this.albumService.delete(entity.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUserPassword(
    @Param('id', ParseUUIDPipe, AlbumPipe) entity: Album,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.update(entity.id, updateAlbumDto);
  }
}
