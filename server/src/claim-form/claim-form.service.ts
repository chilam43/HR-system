import { Injectable } from '@nestjs/common';
import { CreateClaimFormDto } from './dto/create-claim-form.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class ClaimFormService {
  constructor(@InjectModel() private knex: Knex) { }

  async create(createClaimFormDto: CreateClaimFormDto, file?: any) {

    let insertInfo = await this.knex
      .insert({
        staff_id: +createClaimFormDto.staff_id,
        approved_staff_id: +createClaimFormDto.submitTo,
        date: createClaimFormDto.date,
        type: createClaimFormDto.type,
        amount: +createClaimFormDto.amount,
        remark: createClaimFormDto.remark,
        status: 'pending',
      })
      .into('claim_request')
      .returning('id');

    if (file) {
      await this.knex
        .insert({
          req_id: insertInfo[0].id,
          pic: file,
        })
        .into('pic_request_claim')
        .returning('id');
    }
    return {
      insertInfo,
      status: true,
    };
  }

  async findManagerList() {
    let managerList = await this.knex('users')
      .select(
        'users.name as users_name',
        'department.department_name as department_name',
        'users.id as users_id',
      )
      .join('department', 'users.department_id', 'department.id')
      .where('users.access_level_id', '<=', '2');
    return managerList;
  }

  async findOne(id: number) {
    let myClaimForm = await this.knex('claim_request')
      .select('type', 'date', 'amount', 'remark', 'status')
      .where('staff_id', '=', id);
    return myClaimForm;
  }

  async findAllClaimForms() {
    let AllApplications = await this.knex
      .select(
        'claim_request.id as id',
        'pic_request_claim.id as claim_pic_id',
        'approved_staff_id as submit_staff_id',
        'amount as amount',
        'remark as remark',
        'status as status',
        'type as type',
        'date as date',
        'pic',
        'users.name as user_name',
      )
      .from('claim_request')
      .join('pic_request_claim', 'pic_request_claim.req_id', 'claim_request.id')
      .join('users', 'users.id', 'claim_request.staff_id');
    return AllApplications;
  }

  async accept(id: number) {

    let acceptClaimForm = await this.knex('claim_request')
      .update({ status: 'approved' })
      .where('id', '=', id);
    return acceptClaimForm;
  }

  async reject(id: number) {
    let rejectClaimForm = await this.knex('claim_request')
      .update({ status: 'reject' })
      .where('id', '=', id);
    return rejectClaimForm;
  }
}
