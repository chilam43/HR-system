import { hashPassword } from '../hash';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('claim_request').del();
  await knex('leave_request').del();
  await knex('users').del();
  await knex('access_level').del();
  await knex('job_title').del();
  await knex('department').del();

  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE access_level_id_seq RESTART WITH 1');

  await knex.raw('ALTER SEQUENCE job_title_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE department_id_seq RESTART WITH 1');

  // Inserts seed entries
  await knex('department').insert([
    { department_name: 'Boss' },
    { department_name: 'HR', father_department_id: 1 },
    { department_name: 'MK', father_department_id: 1 },
    { department_name: 'IT', father_department_id: 1 },
  ]);

  await knex('job_title').insert([
    { job_title_type: 'Boss', department_id: 1 },
    { job_title_type: 'HR Manager', department_id: 2 },
    { job_title_type: 'MK Manager', department_id: 3 },
    { job_title_type: 'IT Manager', department_id: 4 },
  ]);

  await knex('access_level').insert([
    { access_level_type: 'Admin' },
    { access_level_type: 'Manager' },
    { access_level_type: 'Staff' },
  ]);
  await knex('users').insert([
    {
      gender: '女',
      name: 'admin',
      email: 'admin@gmail.com',
      address: 'address, 226-1162',
      job_nature: 'boss',
      password: await hashPassword('admin'),
      birthday: '1993-08-16',
      employ_date: '2009-03-01',
      working_time: '0900-1200',
      salary: 1000000,
      annual_leave_fixed: 365,
      sick_leave_fixed: 200,
      bank_account: '84-58-88',
      phone: 12345678,
      access_level_id: 1,
      job_title_id: 1,
      department_id: 1,
    },
  ]);

}
