import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artists.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
})
export class ArtistModule {}
