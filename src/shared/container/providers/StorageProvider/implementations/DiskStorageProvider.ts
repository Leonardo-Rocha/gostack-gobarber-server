import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import StorageProvider from '../models/StorageProvider';

class DiskStorageProvider implements StorageProvider {
  public async saveFile(fileName: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, fileName),
      path.resolve(uploadConfig.uploadsFolder, fileName),
    );

    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, fileName);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
