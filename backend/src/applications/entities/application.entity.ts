import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobType } from '../enum/jobType.enum';
import { ApplicationStatus } from '../enum/applicationStatus.enum';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  company_name!: string;

  @Column({ name: 'job_title', type: 'varchar', length: 255 })
  job_title!: string;

  @Column({
    type: 'enum',
    enum: JobType,
  })
  job_type!: JobType;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.APPLIED,
  })
  status!: ApplicationStatus;

  @Column({ name: 'applied_date', type: 'date' })
  applied_date!: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
