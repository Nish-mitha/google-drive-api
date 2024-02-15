import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { GoogleDriveService } from './google-drive.service';

@Injectable()
export class DownloadApiService {

  private readonly logger = new Logger(DownloadApiService.name);

  constructor(private readonly googleDriveService: GoogleDriveService) {}

  async downloadVideo(fileId: string, destinationFolderId: string): Promise<void> {
    const drive = this.googleDriveService.initialize();
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
      this.processDownloadedFile(response.data, response.headers['content-length'])
      
    } catch(err) {
      if(err.response?.data) {
        const errorRes = JSON.parse(err.response.data);
        throw new HttpException(errorRes.error.message, errorRes.error.code);
      }
      throw new HttpException("Something went wrong, Please check your network.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  private async processDownloadedFile(fileData: any, fileLength: number) {
    const fileStream = fs.createWriteStream('file.mp4');
    fileData.pipe(fileStream);
  }
}
