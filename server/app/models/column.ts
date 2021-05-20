import mongoose, { Schema } from 'mongoose';

export interface ColumnsInDB extends mongoose.Document {
  boardId: string;
  name: string;
  position: number;
}

const ColumnSchema = new Schema({
  boardId: {
    ref: 'boards',
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
});

export default mongoose.model<ColumnsInDB>('columns', ColumnSchema);
