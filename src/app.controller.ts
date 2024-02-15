import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { ResponseDTO } from './common/dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { videoStreamSchema } from './swagger/video-stream.schema';
import { downloadStatusSchema } from './swagger/download-status.schema';
import { uploadStatusSchema } from './swagger/upload-status.schema';
import { commonResponseSchema } from './swagger/common.schema';

@ApiResponse(commonResponseSchema.responses[401])
@ApiResponse(commonResponseSchema.responses[500])
@ApiResponse(commonResponseSchema.responses[503])
@Controller('videos')
export class AppController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  /**
   * Route to handle download and upload of video file
   * @param fileId 
   * @param destinationFolderId 
   * @returns 
   */
  @ApiTags(videoStreamSchema.tags)
  @ApiParam(videoStreamSchema.parameters[0])
  @ApiParam(videoStreamSchema.parameters[1])
  @ApiResponse(videoStreamSchema.responses[200])
  @ApiResponse(videoStreamSchema.responses[400])
  @Get('download/:fileId/:destinationFolderId')
  async downloadVideo(@Param('fileId') fileId: string, @Param('destinationFolderId') destinationFolderId: string): Promise<ResponseDTO> {
    // this.googleDriveService.downloadVideo(fileId, destinationFolderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Video download is in progress',
    };
  }

  @ApiTags(downloadStatusSchema.tags)
  @ApiParam(downloadStatusSchema.parameters[0])
  @ApiParam(downloadStatusSchema.parameters[1])
  @ApiResponse(downloadStatusSchema.responses[200])
  @ApiResponse(downloadStatusSchema.responses[400])
  @Get('downloadStatus/:fileId/:destinationFolderId')
  async checkDownloadFileStatus(@Param('fileId') fileId: string, @Param('destinationFolderId') destinationFolderId: string): Promise<void> {
    // return await this.googleDriveService.checkFileStatus(fileId);
  }


  @ApiTags(uploadStatusSchema.tags)
  @ApiParam(uploadStatusSchema.parameters[0])
  @ApiResponse(uploadStatusSchema.responses[200])
  @ApiResponse(uploadStatusSchema.responses[400])
  @Get('uploadStatus/:fileId')
  async checkUploadFileStatus(@Param('fileId') fileId: string): Promise<void> {
    // return await this.googleDriveService.checkFileStatus(fileId);
  }
}
