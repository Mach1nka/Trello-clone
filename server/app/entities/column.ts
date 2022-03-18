import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { Board } from './board';
import { Card } from './card';

@Entity({ name: 'columns' })
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 30
  })
  name: string;

  @Column({
    type: 'smallint'
  })
  position: number;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
