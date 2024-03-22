import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Track, TracksService } from './tracks.service';
import { TrackPipe } from './track.pipe';
import { CreateTrackDto } from './dto/create.track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  async getAll() {
    return await this.trackService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe, TrackPipe) entity: Track) {
    return entity;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe, TrackPipe) entity: Track) {
    return await this.trackService.delete(entity.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUserPassword(
    @Param('id', ParseUUIDPipe, TrackPipe) entity: Track,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return await this.trackService.update(entity.id, updateTrackDto);
  }
}
