import mongoose, { Schema } from 'mongoose';

interface ClientErrorAttrs {
  error: string;
  errorInfo: string;
}

export interface ClientErrorInDB extends mongoose.Document {
  error: string;
  errorInfo: string;
}

interface ClientErrorModel extends mongoose.Model<ClientErrorInDB> {
  build(attrs: ClientErrorAttrs): ClientErrorInDB;
}

const ClientErrorSchema = new Schema({
  error: {
    type: String,
    required: true
  },
  errorInfo: {
    type: String,
    required: true
  }
});

ClientErrorSchema.statics.build = (attrs: ClientErrorModel) => new ClientError(attrs);

const ClientError = mongoose.model<ClientErrorInDB, ClientErrorModel>('errors', ClientErrorSchema);

export default ClientError;
