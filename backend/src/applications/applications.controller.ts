import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationDto } from './dto/updateApplication.dto';
import { ApplicationStatus } from './enum/applicationStatus.enum';
import { CreateApplicationDto } from './dto/createApplication.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  //* ---------------- Create application -------------------------
  @Post()
  async create(@Body() dto: CreateApplicationDto) {
    const application = await this.applicationsService.create(dto);
    return {
      success: true,
      message: 'Application is created successfully.',
    };
  }

  //* ----------------- Update Application ---------------------
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    const updated = await this.applicationsService.update(id, dto);
    return {
      success: true,
      message: `Application with id ${id} is updated successfully.`,
    };
  }

  //* --------------- Get all application ----------

  @Get()
  async findAll(
    @Query('status') status: ApplicationStatus,
    @Query('search') search: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return await this.applicationsService.getAll(
      status,
      search,
      parseInt(page),
      parseInt(limit),
    );
  }
}
