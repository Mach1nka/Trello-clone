import mongoose from 'mongoose';

const { Schema } = mongoose;

const CardSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  column: {
    ref: 'columns',
    type: Schema.Types.ObjectId,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
});

export default mongoose.model('cards', CardSchema);
