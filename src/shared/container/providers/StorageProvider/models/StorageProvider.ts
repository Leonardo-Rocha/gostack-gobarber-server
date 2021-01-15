interface StorageProvider {
  saveFile(fileName: string): Promise<string>;
  deleteFile(fileName: string): void;
}

export default StorageProvider;
