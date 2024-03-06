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
import { Track, TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: V4Options) {
    return await this.trackService.getTrackById(id);
  }

  @Post()
  async createTrack(@Body() createtrackDto: Track) {
    return await this.trackService.createTrack(createtrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: V4Options,
    @Body() updatePasswordDto: Track,
  ) {
    return await this.trackService.updateTrack(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deletetrack(@Param('id') id: V4Options) {
    return await this.trackService.deleteTrack(id);
  }
}
