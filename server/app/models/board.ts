import mongoose from 'mongoose';

const { Schema } = mongoose;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});

export default mongoose.model('boards', BoardSchema);
