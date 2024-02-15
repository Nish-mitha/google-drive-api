import { HttpException, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { GoogleDriveService } from './google-drive.service';

@Injectable()
export class DownloadApiService {

  private readonly logger = new Logger(DownloadApiService.name);

  constructor(private readonly googleDriveService: GoogleDriveService) {}

  async downloadVideo(fileId: string, destinationFolderId: string): Promise<void> {
    const drive = this.googleDriveService.initialize();
    const fileStream = fs.createWriteStream('file.mp4');

    try {
      /**
       * Check if the file is already present in the destination folder
       */
      const response = await drive.files.get(
        {
          fileId: fileId,
          alt: 'media'
        },
        { responseType: 'stream' },
      );

      return await new Promise<void>((resolve, reject) => {
        response.data
          .on('end', () => {
            this.logger.log('File extracted successfully');
            resolve();
          })
          .on('error', (err) => {
            this.logger.error('Error downloading file', err);
            reject(err);
          })
          .pipe(fileStream);
      });
    } catch(err) {
      console.log(err)
      const errorRes = JSON.parse(err.response.data);
      throw new HttpException(errorRes.error.message, errorRes.error.code);
    }
  }
  
  private async processDownloadedFile() {

  }
}
