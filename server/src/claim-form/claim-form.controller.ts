import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { ClaimFormService } from './claim-form.service';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/multerOptions';

@Controller('claim-form')
export class ClaimFormController {
  constructor(private readonly claimFormService: ClaimFormService) { }

  @Post('apply')
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createClaimFormDto: CreateClaimFormDto,
  ) {
    try {
      let result: any;
      if (file) {
        result = await this.claimFormService.create(
          createClaimFormDto,
          file.filename,
        );
      } else {
        result = await this.claimFormService.create(createClaimFormDto);
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

  @Get('list')
  async findManagerList() {
    return await this.claimFormService.findManagerList();
  }

  @Get('showPersonalClaimForm/:id') //睇自己
  async findOne(@Param('id') id: string) {
    return await this.claimFormService.findOne(+id);
  }

  @Get('allClaimForms')
  async findAllClaimForms() {
    return await this.claimFormService.findAllClaimForms();
  }

  @Patch('accept')
  async accept(@Body() { id }: { id: number }) {

    return await this.claimFormService.accept(id);
  }

  @Put('reject')
  async reject(@Body() { id }: { id: number }) {

    return await this.claimFormService.reject(id);
  }
}
