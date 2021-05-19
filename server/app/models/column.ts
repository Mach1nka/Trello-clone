import mongoose, { Schema } from 'mongoose';

export interface ColumnData extends mongoose.Document {
  name: string;
  position: number;
}

export interface ColumnsInDB extends mongoose.Document {
  boardId: string;
  columns: ColumnData[];
}

const ColumnSchema = new Schema({
  boardId: {
    ref: 'boards',
    type: Schema.Types.ObjectId,
    required: true
  },
  columns: [
    {
      name: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      }
    }
  ]
});

export default mongoose.model<ColumnsInDB>('columns', ColumnSchema);