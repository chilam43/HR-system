import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateDepartmentDto } from './dto/create-department.dto';


@Injectable()
export class DepartmentService {
  constructor(@InjectModel() private knex: Knex) { }

  async fetchDepartment() {
    try {
      let departmentList = await this.knex('department')
        .select("*")
      return departmentList
    }
    catch (e) {
      return JSON.stringify(e)
    }
  }

  async createNewDeportment(formInfo: CreateDepartmentDto) {
    try {
      let departmentValue = await this.knex('department')
        .insert({
          department_name: formInfo.data.departmentName,
          father_department_id: formInfo.data.parentDepartment,
        })
      return departmentValue
    }
    catch (e) {
      return JSON.stringify(e)
    }
  }
}
