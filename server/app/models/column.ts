import mongoose, { Schema } from 'mongoose';

export interface ColumnData extends mongoose.Document {
  name: string;
  position: number;
}

export interface ColumnInDB extends mongoose.Document {
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
        required: true,
        unique: true
      }
    }
  ]
});

export default mongoose.model<ColumnInDB>('columns', ColumnSchema);
