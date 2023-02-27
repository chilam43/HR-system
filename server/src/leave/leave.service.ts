import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class LeaveService {
  constructor(@InjectModel() private knex: Knex) { }

  async createNewDayoffType(formInfo: {
    dayoff_name: string;
    short_form: string;
    one_time_day_off: string;
    pay_leave: string;
  }) {
    try {
      let id = await this.knex
        .insert({
          type: formInfo.dayoff_name,
          short_form: formInfo.short_form,
          one_time_day_off: formInfo.one_time_day_off === 'Yes',
          pay_leave: formInfo.pay_leave === 'Yes',
        })
        .into('leave_type')
        .returning('id');

      return id;
    } catch (error) {
    }
  }
  async getDayoffType() {
    try {
      let result = await this.knex.select().from('leave_type');
      return result;
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  async submitapplication(
    formInfo: {
      name: string;
      type: string;
      userID: number;
      from: string;
      total: string;
    },
    file?: any,
  ) {
    try {
      let result = await this.knex
        .insert({
          staff_id: formInfo.userID,
          approved_staff_id: 1,
          leave_type_id: formInfo.type,
          start_date: new Date(formInfo.from),
          total_date: formInfo.total,
          remark: '',
          status: 'pending',
        })
        .into('leave_request')
        .returning('id');

      if (file) {
        await this.knex
          .insert({
            req_id: result[0].id,
            pic: file,
          })
          .into('pic_request_leave')
          .returning('id');
      }

    } catch (error) {
      return
    }
  }
  async getapplicationstatuse(formInfo: any) {

    try {
      let result = await this.knex.raw(
        `SELECT leave_request.id,leave_request.created_at,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, remark,staff_id, name,staff_id,type,start_date,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, total_date, status FROM leave_request 
      JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE staff_id=?`,
        [formInfo.id],
      );

      return result.rows;
    } catch (error) {
    }
  }
  async getpendingApplication(formInfo: any) {
    try {
      let result = await this.knex.raw(
        `SELECT leave_request.id,leave_request.created_at,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, remark,staff_id, name,staff_id,type,start_date,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format,total_date, status FROM leave_request 
      JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE (status='pending')AND (staff_id=?)`,
        [formInfo.id],
      );
      return result.rows;
    } catch (error) {
    }
  }
  async getApprovedApplication(formInfo: any) {
    try {
      let result = await this.knex.raw(
        `SELECT leave_request.id,leave_request.created_at,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format, remark,staff_id, name,staff_id,type,start_date,TO_CHAR(start_date,'YYYY-MM-DD')AS Date_Format,total_date, status FROM leave_request 
      JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE (status='approved')AND (staff_id=?)`,
        [formInfo.id],
      );

      return result.rows;
    } catch (error) {
      return JSON.stringify(error)
    }
  }

  async updateApplication(formInfo: any) {
    try {
      for (let i = 0; i < formInfo.length; i++) {
        await this.knex
          .update({ status: 'approved' })
          .from('leave_request')
          .where('id', formInfo[i].id)
          .andWhere('status', 'pending');
      }

      return { status: true };
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  async getdayofftye() {
    try {
      let result = await this.knex.select().from('leave_type');

      return result;
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  ///////////////////////////select group by
  async getstaffalsl(query: string) {
    try {

      let result = await this.knex.raw(
        `SELECT name,type,annual_leave_fixed, sick_leave_fixed, COUNT(type) AS dayoff_count FROM leave_request 
        JOIN users ON staff_id=users.id JOIN leave_type ON leave_type_id=leave_type.id WHERE (name=?) AND (status='approved') 
        GROUP BY type,name,annual_leave_fixed, sick_leave_fixed`,
        [query],
      );

      return result.rows;
    } catch (error: any) {
      return JSON.stringify(error)
      return [];
    }
  }
  async deleteDayOffType(formInfo: any) {
    try {
      for (let i = 0; i < formInfo.length; i++) {
        await this.knex('leave_request')
          .where('leave_type_id', formInfo[i].id)
          .del();

        await this.knex('pic_request_leave')
          .where('req_id', formInfo[i].id)
          .del();

        await this.knex('leave_type').where('id', formInfo[i].id).del();
      }
    } catch (error: any) {
      return JSON.stringify(error)
    }
  }

  async rejectApplication(formInfo: any) {
    try {

      await this.knex
        .update({ status: 'rejected', remark: formInfo.reject })
        .from('leave_request')
        .where('id', formInfo.rejectItem)
        .andWhere('status', 'pending')
        .returning('id');
    } catch (error) {
      return JSON.stringify(error)
    }
  }

}

