import mongoose, { Schema } from 'mongoose';

export interface UserInDB extends mongoose.Document {
  login: string;
  password: string;
}

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model<UserInDB>('users', UserSchema);
