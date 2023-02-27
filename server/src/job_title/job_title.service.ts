import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class JobTitleService {
  constructor(@InjectModel() private knex: Knex) { }

  async getDepartmentid() {
    try {
      let result = await this.knex.select().from('department');
      return result;
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  async getAllJobTitle() {
    try {
      let result = await this.knex.select("*")
        .from('job_title')
        .join('department', { 'department.id': 'job_title.department_id' });

      return result;
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  async createNewJobTitle(body) {
    try {
      await this.knex
        .insert({
          job_title_type: body.type,
          department_id: body.departmentId,
        })
        .into('job_title');
    } catch (error) {
      return JSON.stringify(error)
    }
  }
}
