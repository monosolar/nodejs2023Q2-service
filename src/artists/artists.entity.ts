import { AlbumEntity } from 'src/albums/albums.entity';
import { TrackEntity } from 'src/tracks/tracks.entity';
import {
  PrimaryGeneratedColumn,
  Generated,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  name: string;

  @Column({ type: 'boolean', nullable: false })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];
}
