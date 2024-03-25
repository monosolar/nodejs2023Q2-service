import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  name: string;

  @Column({ type: 'boolean', nullable: false })
  grammy: boolean;
}
