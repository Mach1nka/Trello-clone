import 'dotenv/config';
import { getConnectionOptions, createConnection, ConnectionOptions, Connection } from 'typeorm';

import CONFIG from '../../config';

class DBConnector {
  public connector: Connection;

  async establishConnection(): Promise<void> {
    try {
      const connectionOptions: ConnectionOptions = await getConnectionOptions();

      this.connector = await createConnection({
        ...connectionOptions,
        ...CONFIG.ADDITIONAL_DB_OPTIONS
      });
      console.log('DB is connected');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DBConnector();
