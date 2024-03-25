import { ArtistEntity } from 'src/artists/artists.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FavArtistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  @OneToOne(() => ArtistEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string;
}
