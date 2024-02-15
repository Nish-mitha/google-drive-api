import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import { API_KEY_FILE_NAME, DRIVE_SCOPE } from 'src/common/constant';

@Injectable()
export class GoogleDriveService {
  private readonly drive: any;

  constructor() {
    const authClient = new google.auth.GoogleAuth({
      scopes: [DRIVE_SCOPE],
      keyFilename: API_KEY_FILE_NAME,
    });

    this.drive = google.drive({ version: 'v3', auth: authClient });
  }

  async downloadVideo(fileId: string, destinationFolderId: string): Promise<void> {
    const fileStream = fs.createWriteStream('file.mp4');
    const response = await this.drive.files.get(
      {
        fileId: fileId,
        alt: 'media'
      },
      { responseType: 'stream' },
    );

    new Promise<void>((resolve, reject) => {
      response.data
        .on('end', () => {
          console.log('File downloaded successfully');
          this.uploadFile('file.mp4', destinationFolderId);
          resolve();
        })
        .on('error', (err) => {
          console.error('Error downloading file', err);
          reject(err);
        })
        .pipe(fileStream, console.log(fileStream));
    });
  }

  private async uploadFile(filePath: string, folderId: string): Promise<void> {
    const fileSize = fs.statSync(filePath).size;
    const chunkSize = 10 * 1024 * 1024; // 10MB chunk size
    let startByte = 0;

    while (startByte < fileSize) {
      const endByte = Math.min(startByte + chunkSize, fileSize);
      const chunk = fs.createReadStream(filePath, {
        start: startByte,
        end: endByte - 1,
      });

      await this.drive.files.create({
        requestBody: {
          name: `chunk-${startByte}-${endByte}`,
          parents: [folderId],
        },
        media: {
          mimeType: 'video/mp4',
          body: chunk,
        },
        
      });

      startByte = endByte;
      console.log("Inprogress:", startByte, endByte)
    }
  }

  async checkFileStatus(fileId: string): Promise<number> {
    const { data } = await this.drive.files.get({ fileId: fileId });
    return data.percentCompleted || 0;
  }

  private async getSessionURI(): Promise<void> {

  }

  
}
