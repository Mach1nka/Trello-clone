import mongoose, { Schema } from 'mongoose';

export interface BoardsInDB extends mongoose.Document {
  name: string;
  owner: string;
  accessUsers: string[];
}

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: { ref: 'users', type: Schema.Types.ObjectId, required: true },
  accessUsers: [{ ref: 'users', type: Schema.Types.ObjectId, default: [] }]
});

export default mongoose.model<BoardsInDB>('boards', BoardSchema);
