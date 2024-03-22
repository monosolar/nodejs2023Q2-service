import { UUID } from 'crypto';
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
  id: UUID;

  @Column({ type: 'uuid', nullable: false })
  @OneToOne(() => AlbumEntity, {
    onDelete: 'CASCADE',
  })
  //@JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: UUID;
}
