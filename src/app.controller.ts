import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ResponseDTO } from './common/dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { videoStreamSchema } from './swagger/video-stream.schema';
import { downloadStatusSchema } from './swagger/download-status.schema';
import { uploadStatusSchema } from './swagger/upload-status.schema';
import { commonResponseSchema } from './swagger/common.schema';
import { DownloadApiService } from './google-drive/download-api.service';
import { DownloadStatusService } from './google-drive/download-status.service';
import { UploadStatusService } from './google-drive/upload-status.service';

@ApiResponse(commonResponseSchema.responses[401])
@ApiResponse(commonResponseSchema.responses[404])
@ApiResponse(commonResponseSchema.responses[500])
@ApiResponse(commonResponseSchema.responses[503])
@Controller('videos')
export class AppController {
  constructor(
    private readonly downloadApiService: DownloadApiService,
    private readonly downloadStatusService: DownloadStatusService,
    private readonly uploadStatusService: UploadStatusService) {}

  /**
   * Route to handle download and upload of video file
   * @param fileId 
   * @param destinationFolderId 
   * @returns 
   */
  /**Swagger Documentation Details **/
  @ApiTags(videoStreamSchema.tags)
  @ApiParam(videoStreamSchema.parameters[0])
  @ApiParam(videoStreamSchema.parameters[1])
  @ApiResponse(videoStreamSchema.responses[200])
  @ApiResponse(videoStreamSchema.responses[400])
  @Get('download/:fileId/:destinationFolderId')
  async downloadVideo(@Param('fileId') fileId: string, @Param('destinationFolderId') destinationFolderId: string): Promise<ResponseDTO> {
    await this.downloadApiService.downloadVideo(fileId, destinationFolderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Video download and Upload Task has been initiated.',
    };
  }

  @ApiTags(downloadStatusSchema.tags)
  @ApiParam(downloadStatusSchema.parameters[0])
  @ApiResponse(downloadStatusSchema.responses[200])
  @ApiResponse(downloadStatusSchema.responses[400])
  @Get('downloadStatus/:fileId')
  async checkDownloadFileStatus(@Param('fileId') fileId: string): Promise<ResponseDTO> {
    return await this.downloadStatusService.getDownloadStatus(fileId);
  }


  @ApiTags(uploadStatusSchema.tags)
  @ApiParam(uploadStatusSchema.parameters[0])
  @ApiResponse(uploadStatusSchema.responses[200])
  @ApiResponse(uploadStatusSchema.responses[400])
  @Get('uploadStatus/:fileId')
  async checkUploadFileStatus(@Param('fileId') fileId: string): Promise<ResponseDTO> {
    return await this.uploadStatusService.getUploadStatus(fileId);
  }
}
