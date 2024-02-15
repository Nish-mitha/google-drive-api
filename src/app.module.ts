import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleDriveService } from './google-drive/google-drive.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GoogleDriveService],
})
export class AppModule {}
