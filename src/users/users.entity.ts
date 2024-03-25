import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, Generated, Column, Entity } from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  login: string;

  @Exclude()
  @Column({ type: 'varchar', length: 30 /* select: false  */ })
  password: string;

  @Column()
  @Generated('increment')
  version: number;

  @Column({
    nullable: false,
    default: Date.now(),
    type: 'bigint',
  })
  createdAt: number;

  @Column({
    nullable: false,
    default: Date.now(),
    type: 'bigint',
  })
  updatedAt: number;
}
