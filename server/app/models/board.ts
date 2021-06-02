import mongoose, { Schema } from 'mongoose';

export interface BoardsInDB extends mongoose.Document {
  name: string;
  users: Schema.Types.ObjectId[];
}

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [{ ref: 'users', type: Schema.Types.ObjectId, required: true }]
});

export default mongoose.model<BoardsInDB>('boards', BoardSchema);
