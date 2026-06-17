import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationStatus } from './enum/applicationStatus.enum';
import { CreateApplicationDto } from './dto/createApplication.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
  ) {}

  //* -------------------------Create application -----------------------
  async create(dto: CreateApplicationDto) {
    const application = this.applicationRepo.create(dto);
    return await this.applicationRepo.save(application);
  }

  //* -------------------------Update application -----------------------
  async update(id: string, dto: UpdateApplicationDto) {
    const application = await this.applicationRepo.findOne({
      where: { id },
    });

    if (!application)
      return new NotFoundException(`Application with id ${id} not found.`);

    const updated = Object.assign(application, dto);
    return await this.applicationRepo.save(updated);
  }

  //* -------------------------Get all application -----------------------
  async getAll(
    status?: ApplicationStatus,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const where: FindOptionsWhere<Application>[] = [];

    if (status && search) {
      where.push({ status, company_name: Like(`%${search}%`) });
      where.push({ status, job_title: Like(`%${search}%`) });
    } else if (status) {
      where.push({ status });
    } else if (search) {
      where.push({ company_name: Like(`%${search}%`) });
      where.push({ job_title: Like(`%${search}%`) });
    }

    const [data, total] = await this.applicationRepo.findAndCount({
      where: where.length > 0 ? where : undefined,
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  //* -------------------------Get application by id -----------------------
  async findOne(id: string) {
    return this.applicationRepo.findOne({
      where: { id },
    });
  }

  //* -------------------------Delete application by id -----------------------
  async delete(id: string) {
    const application = await this.applicationRepo.findOne({
      where: { id },
    });

    if (!application)
      return new NotFoundException(`Application with id ${id} not found.`);

    return await this.applicationRepo.remove(application);
  }
}
