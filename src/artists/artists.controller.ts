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
import { Artist, ArtistsService } from './artists.service';
import { V4Options } from 'uuid';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: V4Options) {
    return await this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() createArtistDto: Artist) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtistPassword(
    @Param('id') id: V4Options,
    @Body() updatePasswordDto: Artist,
  ) {
    return await this.artistService.updateArtist(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: V4Options) {
    return await this.artistService.deleteArtist(id);
  }
}
