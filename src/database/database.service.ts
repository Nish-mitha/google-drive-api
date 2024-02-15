import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoStats } from 'src/entities/video-stats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(VideoStats)
    private readonly yourEntityRepository: Repository<VideoStats>,
  ) {}

  async countBy(fileId: string, type: string = "DOWNLOAD"): Promise<[VideoStats[], number]> {
    return this.yourEntityRepository.findAndCountBy({ fileId: fileId, type: type});
  }

  async create(entity: VideoStats): Promise<VideoStats> {
    return this.yourEntityRepository.save(entity);
  }
}
