import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistModule } from 'src/artists/artists.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TracksModule, AlbumsModule, ArtistModule],
})
export class FavsModule {}
