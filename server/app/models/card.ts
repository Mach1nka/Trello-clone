import mongoose, { Schema } from 'mongoose';

export interface CardData extends mongoose.Document {
  description: string;
  position: number;
}

export interface CardsInDB extends mongoose.Document {
  boardId: string;
  cards: CardData[];
}

const CardSchema = new Schema({
  columnId: {
    ref: 'columns',
    type: Schema.Types.ObjectId,
    required: true
  },
  cards: [
    {
      description: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true,
        unique: true
      }
    }
  ]
});

export default mongoose.model<CardsInDB>('cards', CardSchema);
