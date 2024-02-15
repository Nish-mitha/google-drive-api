import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DownloadStatusService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getDownloadStatus(fileId: string): Promise<ResponseDTO> {
    try {
      const [data , count] = await this.databaseService.countBy(fileId, "DOWNLOAD");
      if(count == 0) {
        return {
          statusCode: HttpStatus.OK,
          message: `${fileId} is not requested for download.`,
        }
      }

      const contentLength = data[0].fileLength;
      const percentage = Math.ceil((100/((contentLength / (1024 * 1024))/ 10)));

      return {
        statusCode: HttpStatus.OK,
        message: `${percentage.toString().slice(0,2)}% download is completed for ${fileId}.`,
      }
    } catch(err) {
      throw new HttpException("Something went wrong, Please check your network.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
