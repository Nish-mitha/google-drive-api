import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleDriveService } from './google-drive.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DownloadApiService {

  private readonly logger = new Logger(DownloadApiService.name);
  private readonly chunkSize = 10 * 1024 * 1024;
  private readonly drive;

  constructor(private readonly googleDriveService: GoogleDriveService, private readonly databaseService: DatabaseService) {
    this.drive = this.googleDriveService.initialize();
  }

  async downloadVideo(fileId: string, destinationFolderId: string): Promise<void> {
    
    try {
      /**
       * Check if the file is already present in the destination folder
       */
      const response = await this.drive.files.get(
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
    const folderPath = './src/assets/';
    const filePath = path.join(folderPath, 'video.mp4');
    const fileStream = fs.createWriteStream(filePath);
    fileData.pipe(fileStream);
    
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    this.storeInPostgreSQL(filePath, fileId, fileLength, destinationFolderId);
  }

  async storeInPostgreSQL(filePath: string, fileId: string, fileLength: number, destinationFolderId: string) {
    try {
      const fileSize = (await fs.promises.stat(filePath)).size;
      let offset = 0;
      while (offset < fileSize) {
        const chunk = await this.readChunk(filePath, offset, offset + this.chunkSize - 1);
        await this.databaseService.create({
          fileId: fileId,
          fileContent: chunk.toString('base64'),
          fileLength: fileSize,
          type: "DOWNLOAD"
        });
        offset += this.chunkSize;
      }
      this.logger.log('File stored in PostgreSQL in chunks successfully');
      this.uploadVideo(fileId, destinationFolderId, fileSize, filePath);
    } catch (error) {
      this.logger.error('Error storing file in PostgreSQL:', error);
      throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
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

  async uploadVideo(fileId: string, folderIdId: string, fileSize: number, filePath: string) {

    const chunks = await this.databaseService.fetchByFileId(fileId, "DOWNLOAD");

    const destinationFolder = await this.drive.files.get({ fileId: folderIdId, fields: 'id' });
    if (!destinationFolder) {
      throw new HttpException("Destination folder does not exists.", HttpStatus.BAD_REQUEST);
    }

    const fileMetadata = {
      name: 'video.mp4',
      parents: [folderIdId],
    };
  
    try {
      const media = {
        mimeType: 'video/mp4',
        body: fs.createReadStream(filePath),
      };
      const file = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      });
      for (const chunk of chunks) {
        await this.databaseService.create({
          fileId: fileId,
          fileContent: chunk.fileContent,
          fileLength: fileSize,
          type: "UPLOAD"
        });
      }
    } catch (err) {
      throw new HttpException("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
