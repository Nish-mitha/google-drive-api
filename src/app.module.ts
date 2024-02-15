import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { DownloadApiService } from './google-drive/download-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoStats } from './entities/video-stats.entity';
import { DatabaseService } from './common/database.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: 'postgres://admin:GA2IVp7KhDkNZV6pOASeGNlxCXPJjwL2@dpg-cn71bgi1hbls73a13380-a.oregon-postgres.render.com/video_storage',
    //   synchronize: true,
    //   ssl: true,
    //   entities: [VideoStats],
    // }),
    // TypeOrmModule.forFeature([VideoStats])
  ],
  controllers: [AppController],
  providers: [GoogleDriveService, DownloadApiService],
})
export class AppModule {}
