import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UploadStatusService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUploadStatus(fileId: string): Promise<ResponseDTO> {
    try {
      const [data , count] = await this.databaseService.countBy(fileId, "UPLOAD");
      const init = await this.databaseService.fetchByFileId(fileId, "DOWNLOAD");

      if(count == 0) {
        if(init) {
          return {
            statusCode: HttpStatus.OK,
            message: `Download process is still in progress for File ${fileId}.`,
          }
        }
        return {
          statusCode: HttpStatus.OK,
          message: `${fileId} is not requested for download.`,
        }
      }

      let megaBytes = data[0].fileLength / (1024 * 1024);
      let percentage = Math.min(100, (count * 10) /  megaBytes * 100);

      return {
        statusCode: HttpStatus.OK,
        message: `${percentage}% upload is completed for ${fileId}.`,
      }
    } catch(err) {
      throw new HttpException("Something went wrong, Please check your network.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
