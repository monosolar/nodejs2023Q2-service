import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './albums.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artists/artists.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
})
export class AlbumsModule {}
