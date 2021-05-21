import mongoose, { Schema } from 'mongoose';

export interface CardsInDB extends mongoose.Document {
  columnId: string;
  name: string;
  description: string;
  position: number;
}

const CardSchema = new Schema({
  columnId: {
    ref: 'columns',
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
});

export default mongoose.model<CardsInDB>('cards', CardSchema);
