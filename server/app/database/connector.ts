import { getConnectionOptions, createConnection, ConnectionOptions, Connection } from 'typeorm';

class DBConnector {
  public connector: Connection;

  async establishConnection(): Promise<void> {
    try {
      const connectionOptions: ConnectionOptions = await getConnectionOptions();
      this.connector = await createConnection(connectionOptions);
      console.log('DB is connected');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DBConnector();
