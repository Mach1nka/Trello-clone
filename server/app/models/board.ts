import mongoose, { Schema } from 'mongoose';

export interface BoardsInDB extends mongoose.Document {
  name: string;
  user: string;
}

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    required: true
  }
});

export default mongoose.model<BoardsInDB>('boards', BoardSchema);
