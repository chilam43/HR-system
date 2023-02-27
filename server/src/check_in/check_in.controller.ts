import { Body, Controller, Get, Ip, Post, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from 'env';
import { CheckInService } from './check_in.service';

@Controller('checkin')
export class CheckInController {
  constructor(private checkinService: CheckInService) { }
  @Post('in')
  async checkIn(@Req() request: Request, @Body() body) {

    if (request.ip == process.env.WifiIP) {
      await this.checkinService.checkin(body, request.ip);
      return { result: 'Success' };
    } else {
      await this.checkinService.checkin(body, request.ip);
      return { result: 'Fail' };
    }
  }

  @Post('out')
  async checkOut(@Body() body) {
    await this.checkinService.checkOut(body);
    return { result: 'Success' };
  }

  @Post('getRecord')
  async getCheckInOutRecord(@Body() body) {
    let result = await this.checkinService.getCheckInOutRecord(body);

    return result;
  }
}
