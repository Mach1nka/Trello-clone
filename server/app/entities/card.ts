import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BoardColumn } from './column';

@Entity({ name: 'cards' })
export class Card {
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

  @Column({
    type: 'varchar',
    default: ''
  })
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'column_id' })
  column: BoardColumn;
}
