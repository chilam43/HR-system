import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileOptions } from 'src/multerOptions';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) { }

  @Post('addDayofftype')
  async createNewDayoffType(
    @Body()
    body: {
      dayoff_name: string;
      short_form: string;
      one_time_day_off: string;
      pay_leave: string;
    },
  ) {
    try {
      let result = await this.leaveService.createNewDayoffType(body);

      return { result };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to add new dayoff type',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Get('getdayofftype')
  async getDayoffType() {
    try {
      let result = await this.leaveService.getDayoffType();

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
  @Post('application')
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {

    try {
      let result;
      if (file) {
        result = await this.leaveService.submitapplication(body, file.filename);
      } else {
        result = await this.leaveService.submitapplication(body);
      }

      return { result };
    } catch (error) {

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to upload file',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post('getapplicationstatus')
  async getapplicationstatus(
    @Body()
    body,
  ) {

    try {
      let result = await this.leaveService.getapplicationstatuse(body);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load application status',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post('getpendingApplication')
  async getpendingApplication(
    @Body()
    body,
  ) {
    try {
      let result = await this.leaveService.getpendingApplication(body);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load application status',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post('getApprovedApplication')
  async getApprovedApplication(
    @Body()
    body,
  ) {
    try {
      let result = await this.leaveService.getApprovedApplication(body);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load application status',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post('updateapplication')
  async updateApplication(
    @Body()
    body: {},
  ) {

    try {
      let result = await this.leaveService.updateApplication(body);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to update application',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('gettype')
  async getdayofftye() {
    try {
      let result = await this.leaveService.getdayofftye();

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to update get dayoff type for selection',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('getstaffalsl')
  async getstaffalsl(@Query() query) {
    try {
      let result = await this.leaveService.getstaffalsl(query.qq);

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to load staff dayoff status',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post('deletedayofftype')
  async deleteDayOffType(
    @Body()
    body: {},
  ) {
    try {

      await this.leaveService.deleteDayOffType(body);
      return { status: true };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to delete dayoff types',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post('reject')
  async reject(
    @Body()
    body: string,
  ) {
    try {

      await this.leaveService.rejectApplication(body);

      return { status: true };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Fail to delete dayoff types',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
