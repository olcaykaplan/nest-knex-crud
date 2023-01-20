import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { CreateGenderDto, UpdateGenderDto } from './dto';
import { GenderService } from './gender.service';

@Controller({
  path: 'genders',
  version: '1',
})
export class GenderController {
  constructor(private genderService: GenderService) {}
  @Get()
  getGenders() {
    const { data } = this.genderService.getGenders();
    return { data, message: 'Get Genders' };
  }

  @Post()
  createGender(@Body() dto: CreateGenderDto) {
    const { data } = this.genderService.createGender(dto);
    return { data, message: 'Gender is created' };
  }

  @Put(':id')
  updateGenderById(
    @Param('id', ParseIntPipe) genderId: number,
    @Body() dto: UpdateGenderDto,
  ) {
    const { data } = this.genderService.updateGenderById(genderId, dto);
    return { data, message: 'Gender is updated' };
  }

  @Delete(':id')
  deleteGenderById(@Param('id', ParseIntPipe) genderId: number) {
    const { data } = this.genderService.deleteGenderById(genderId);
    return { data, message: 'Gender is Deleted' };
  }
}
