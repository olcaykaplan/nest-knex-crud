import { Injectable } from '@nestjs/common';
import { CreateGenderDto, UpdateGenderDto } from './dto';

@Injectable()
export class GenderService {
  getGenders() {
    return { data: [] };
  }

  createGender({ name }: CreateGenderDto) {
    console.log('name: ', name);
    return { data: 'Gender is created' };
  }

  updateGenderById(genderId: number, dto: UpdateGenderDto) {
    console.log('Update genderId: ', genderId);
    console.log('dto', dto);
    return { data: 'Gender is updated' };
  }

  deleteGenderById(genderId: number) {
    console.log('Delete genderId: ', genderId);
    return { data: 'Gender is Deleted' };
  }
}
