import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column({
    nullable: false,
    type: 'int',
  })
  duration: number;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity;
}
