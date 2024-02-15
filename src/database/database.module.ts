import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoStats } from 'src/entities/video-stats.entity';
import { DatabaseService } from './database.service';

@Module({
    imports: [ 
      TypeOrmModule.forFeature([VideoStats]) 
    ],
    providers: [ DatabaseService ],
    exports: [DatabaseService]
})
export class DatabaseModule {}
