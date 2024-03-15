import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  name: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;
}
