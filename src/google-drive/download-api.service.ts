import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { GoogleDriveService } from './google-drive.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DownloadApiService {

  private readonly logger = new Logger(DownloadApiService.name);
  private readonly chunkSize = 10 * 1024 * 1024; // 10MB

  constructor(private readonly googleDriveService: GoogleDriveService, private readonly databaseService: DatabaseService) {}

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
      this.processDownloadedFile(response.data, response.headers['content-length'], fileId, destinationFolderId);
      
    } catch(err) {
      if(err.response?.data) {
        const errorRes = JSON.parse(err.response.data);
        throw new HttpException(errorRes.error.message, errorRes.error.code);
      }
      throw new HttpException("Something went wrong, Please check your network.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  private async processDownloadedFile(fileData: any, fileLength: number, fileId: string, destinationFolderId: string) {
    const fileStream = fs.createWriteStream('video.mp4');
    fileData.pipe(fileStream);
    this.storeInPostgreSQL('video.mp4', fileId);
  }

  async storeInPostgreSQL(filePath: string, fileId: string) {
    try {
      const fileSize = (await fs.promises.stat(filePath)).size;
      let offset = 0;
      while (offset < fileSize) {
        const chunk = await this.readChunk(filePath, offset, offset + this.chunkSize - 1);
        await this.databaseService.create({
          fileId: fileId,
          fileContent: "string",
          status: "DONE"
        });
        offset += this.chunkSize;
      }
      console.log('File stored in PostgreSQL in chunks successfully');
    } catch (error) {
      console.error('Error storing file in PostgreSQL:', error);
    }
  }

  async readChunk(filePath: string, start: number, end: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath, { start, end });
      const chunks: any[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
