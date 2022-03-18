import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany
} from 'typeorm';

import { User } from './user';
import { BoardColumn } from './column';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50
  })
  name: string;

  @ManyToOne(() => User, (owner) => owner.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: BoardColumn[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'boards_users',
    joinColumn: {
      name: 'board_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];
}
