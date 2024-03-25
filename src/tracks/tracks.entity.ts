import { UUID } from 'crypto';
import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  duration: number;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: UUID | null;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => AlbumEntity, { onDelete: 'SET NULL', eager: false })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: UUID | null;
}
