import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/albums.entity';
import { Album } from 'src/albums/albums.service';
import { ArtistEntity } from 'src/artists/artists.entity';
import { Artist } from 'src/artists/artists.service';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { Track } from 'src/tracks/tracks.service';
import { In, Repository } from 'typeorm';
import { FavAlbumsEntity } from './entities/fav.albums.entity';
import { getEntityIds } from 'src/utils';
import { FavTracksEntity } from './entities/fav.tracks.entity';
import { FavArtistsEntity } from './entities/fav.artists.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavAlbumsEntity)
    private readonly favAlbumsRepository: Repository<FavAlbumsEntity>,
    @InjectRepository(FavTracksEntity)
    private readonly favTracksRepository: Repository<FavTracksEntity>,
    @InjectRepository(FavArtistsEntity)
    private readonly favArtistsRepository: Repository<FavArtistsEntity>,

    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async getAll() {
    const favorites = {
      tracks: await this.tracksRepository.findBy({
        id: In(await getEntityIds(this.favTracksRepository, 'trackId')),
      }),
      albums: await this.albumsRepository.findBy({
        id: In(await getEntityIds(this.favAlbumsRepository, 'albumId')),
      }),
      artists: await this.artistsRepository.findBy({
        id: In(await getEntityIds(this.favArtistsRepository, 'artistId')),
      }),
    };

    return favorites;
  }

  async addTrack(trackId: string) {
    return await this.favTracksRepository.save({ trackId });
  }

  async addArtist(artistId: string) {
    return await this.favArtistsRepository.save({ artistId });
  }

  async addAlbum(albumId: string) {
    return await this.favAlbumsRepository.save({ albumId });
  }

  async deleteTrack(trackId: string) {
    return await this.favTracksRepository.delete({ trackId });
  }

  async deleteArtist(artistId: string) {
    return await this.favArtistsRepository.delete({ artistId });
  }

  async deleteAlbum(albumId: string) {
    await this.favAlbumsRepository.delete({ albumId });
  }
}
