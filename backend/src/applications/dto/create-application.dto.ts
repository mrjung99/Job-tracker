import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { JobType } from '../enum/jobType.enum';
import { ApplicationStatus } from '../enum/applicationStatus.enum';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  @MinLength(2, { message: 'Company name must be at least 2 characters' })
  company_name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Job title is required' })
  job_title!: string;

  @IsEnum(JobType, {
    message: 'Job type must be Internship, Full-time, or Part-time',
  })
  job_type!: JobType;

  @IsEnum(ApplicationStatus, {
    message: 'Status must be Applied, Interviewing, Offer, or Rejected',
  })
  status!: ApplicationStatus;

  @IsDateString({}, { message: 'Applied date must be a valid date' })
  applied_date!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
