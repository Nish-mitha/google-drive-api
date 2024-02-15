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

  async findAll(): Promise<VideoStats[]> {
    return this.yourEntityRepository.find();
  }

  // async findOne(id: number): Promise<VideoStats> {
  //   return this.yourEntityRepository.findOne(id);
  // }

  async create(entity: VideoStats): Promise<VideoStats> {
    return this.yourEntityRepository.save(entity);
  }

  // async update(id: number, entity: VideoStats): Promise<VideoStats> {
  //   await this.yourEntityRepository.update(id, entity);
  //   return this.findOne(id);
  // }

  async delete(id: number): Promise<void> {
    await this.yourEntityRepository.delete(id);
  }
}
