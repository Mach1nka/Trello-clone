import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Board } from './board';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50
  })
  login: string;

  @Column({
    type: 'varchar'
  })
  password: string;

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[];

  // Bi-directional relations with board?
  // @ManyToMany(() => Board, (board) => board.users)
  // sharedBoards: Board[];
}
