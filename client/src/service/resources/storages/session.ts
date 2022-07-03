import StorageClient from './index';

class SessionStorage extends StorageClient {
  private static classInstance?: SessionStorage;

  private constructor() {
    super(window.sessionStorage);
  }

  static getInstance() {
    if (this.classInstance) {
      return this.classInstance;
    }
    this.classInstance = new SessionStorage();
    return this.classInstance;
  }

  clear(): void {
    this.clear();
  }
}

const sessionStorageService = SessionStorage.getInstance();

export { sessionStorageService };
