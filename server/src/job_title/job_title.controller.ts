import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JobTitleService } from './job_title.service';

@Controller('job-title')
export class JobTitleController {
  constructor(private jobTitleService: JobTitleService) { }

  @Get('getDepartmentid')
  async getDepartmentid() {
    try {
      let result = await this.jobTitleService.getDepartmentid();

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load dayoff type from DataBase',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Get('getAllJobTitle')
  async getAllJobTitle() {
    try {
      let result = await this.jobTitleService.getAllJobTitle();

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load dayoff type from DataBase',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Post('createNewJobTitle')
  async createNewJobTitle(
    @Body()
    body: {
      type: string;
      departmentId: number;
    },
  ) {
    try {
      let result = await this.jobTitleService.createNewJobTitle(body);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load dayoff type from DataBase',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
