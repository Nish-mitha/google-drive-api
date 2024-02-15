import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "video_stats" })
export class VideoStats {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  fileId: string;

  @Column()
  fileContent: string;

  @Column()
  status: string;
}