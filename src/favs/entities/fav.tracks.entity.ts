import { TrackEntity } from 'src/tracks/tracks.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FavTracksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  @OneToOne(() => TrackEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  trackId: string;
}
