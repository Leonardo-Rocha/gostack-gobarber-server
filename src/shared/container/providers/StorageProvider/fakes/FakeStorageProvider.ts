import StorageProvider from '../models/StorageProvider';

class FakeStorageProvider implements StorageProvider {
  private storage: string[] = [];

  public async saveFile(fileName: string): Promise<string> {
    this.storage.push(fileName);
    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const foundIndex = this.storage.findIndex(file => file === fileName);

    this.storage.splice(foundIndex, 1);
  }
}

export default FakeStorageProvider;
