import { AlbumEntity } from 'src/albums/albums.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FavAlbumsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  @OneToOne(() => AlbumEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: string;
}
