import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './tracks.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class TracksModule {}
