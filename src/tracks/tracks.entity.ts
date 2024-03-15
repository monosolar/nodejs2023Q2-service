import { PrimaryGeneratedColumn, Generated, Column, Entity } from 'typeorm';

@Entity()
export class UsersEntity {
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
}
