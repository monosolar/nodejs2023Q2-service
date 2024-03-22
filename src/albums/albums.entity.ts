import { ArtistEntity } from 'src/artists/artists.entity';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  name: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];
}
