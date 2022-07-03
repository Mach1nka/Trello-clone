class StorageClient {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  protected getItem(key: string): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : value;
  }

  protected setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  protected removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  protected clear(): void {
    this.storage.clear();
  }
}

export default StorageClient;
