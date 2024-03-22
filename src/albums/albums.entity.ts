import { UUID } from 'crypto';
import { ArtistEntity } from 'src/artists/artists.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  name: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'varchar', nullable: true })
  @OneToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: UUID | null;
}
