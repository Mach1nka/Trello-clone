import mongoose from 'mongoose';

const { Schema } = mongoose;

const ColumnSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  board: {
    ref: 'boards',
    type: Schema.Types.ObjectId,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
});

export default mongoose.model('columns', ColumnSchema);
