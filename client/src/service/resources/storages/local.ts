import StorageClient from './index';

class LocalStorage extends StorageClient {
  private static classInstance?: LocalStorage;

  private constructor() {
    super(window.localStorage);
  }

  static getInstance() {
    if (this.classInstance) {
      return this.classInstance;
    }
    this.classInstance = new LocalStorage();
    return this.classInstance;
  }

  getToken(): null | string {
    return this.getItem('token');
  }

  saveToken(token: string): void {
    this.setItem('token', token);
  }

  removeToken(): void {
    this.removeItem('token');
  }

  clear(): void {
    this.clear();
  }
}

const localStorageService = LocalStorage.getInstance();

export { localStorageService };
