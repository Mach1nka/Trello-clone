import { getConnectionOptions, createConnection, ConnectionOptions } from 'typeorm';

const connectToDB = async (): Promise<void> => {
  try {
    const connectionOptions: ConnectionOptions = await getConnectionOptions();
    await createConnection(connectionOptions);
    console.log('DB is connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
