import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { User } from 'src/Schema/User.schema';
import { IFile } from 'src/Types/file';
import { CrudService } from './services/crud/crud.service';

@Controller('user')
export class UserController {
  constructor(private crudService: CrudService) {}

  @ApiTags('User')
  @ApiParam({ type: String, name: 'id' })
  @Get(':id')
  async getUserbyid(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.getUserByID(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('User')
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({ type: User })
  @Post(':id')
  async createBusiness(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: Partial<User>,
  ) {
    console.log(body);
    const result = await this.crudService.uploadBusinessDetails(
      param['id'],
      body,
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('User')
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({ type: User })
  @Put(':id/images')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: join(process.cwd(), '/pictures'),
    }),
  )
  async uploadImages(
    @Res() res: Response,
    @Param() param: any,
    @UploadedFiles() files: IFile[],
  ) {
    const result = await this.crudService.uploadImages(param['id'], files);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('User')
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({ type: User })
  @Put(':id/profilepic')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: join(process.cwd(), '/pictures'),
    }),
  )
  async uploadDp(
    @Res() res: Response,
    @Param() param: any,
    @UploadedFiles() files: IFile[],
    @Body() body: Partial<User>,
  ) {
    console.log(body);
    const result = await this.crudService.uploadDp(param['id'], files[0]);
    res.status(result.statusCode).send(result);
  }
}
