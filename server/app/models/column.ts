import mongoose, { Schema } from 'mongoose';

interface ColumnAttrs {
  boardId: string;
  name: string;
  position: number;
}

export interface ColumnInDB extends mongoose.Document {
  boardId: string;
  name: string;
  position: number;
}

interface ColumnModel extends mongoose.Model<ColumnInDB> {
  build(attrs: ColumnAttrs): ColumnInDB;
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

const Column = mongoose.model<ColumnInDB, ColumnModel>('columns', ColumnSchema);

ColumnSchema.statics.build = (attrs: ColumnModel) => new Column(attrs);

export default mongoose.model<ColumnInDB>('columns', ColumnSchema);
