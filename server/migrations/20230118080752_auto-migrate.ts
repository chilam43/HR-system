import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('department'))) {
    await knex.schema.createTable('department', (table) => {
      table.increments('id');
      table.string('department_name', 255).notNullable();
      table.integer('father_department_id').references('department.id');
    });
  }

  if (!(await knex.schema.hasTable('job_title'))) {
    await knex.schema.createTable('job_title', (table) => {
      table.increments('id');
      table.string('job_title_type', 255).notNullable();
      table.integer('department_id').references('department.id');
    });
  }

  if (!(await knex.schema.hasTable('access_level'))) {
    await knex.schema.createTable('access_level', (table) => {
      table.increments('id');
      table.string('access_level_type', 255).notNullable();
    });
  }

  if (!(await knex.schema.hasTable('users'))) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('gender', 50).notNullable();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('address', 255).notNullable();
      table.string('job_nature', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('contract', 255);
      table.string('mpf', 255);
      table.string('birthday').notNullable();
      table.string('employ_date').notNullable();
      table.string('termination_date');
      table.string('working_time').notNullable();
      table.integer('salary').notNullable();
      table.integer('annual_leave_fixed').notNullable();
      table.integer('sick_leave_fixed').notNullable();
      table.string('bank_account').notNullable();
      table.integer('phone').notNullable();
      table
        .integer('access_level_id')
        .unsigned()
        .notNullable()
        .references('access_level.id');
      table
        .integer('job_title_id')
        .unsigned()
        .notNullable()
        .references('job_title.id');
      table
        .integer('department_id')
        .unsigned()
        .notNullable()
        .references('department.id');
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('department_approver'))) {
    await knex.schema.createTable('department_approver', (table) => {
      table.increments('id');
      table
        .integer('department_id')
        .unsigned()
        .notNullable()
        .references('department.id');
      table.integer('user_id').unsigned().notNullable().references('users.id');
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('leave_type'))) {
    await knex.schema.createTable('leave_type', (table) => {
      table.increments('id');
      table.string('type', 255).notNullable();
      table.string('short_form', 255).notNullable();
      table.boolean('one_time_day_off').notNullable();
      table.boolean('pay_leave').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('leave_request'))) {
    await knex.schema.createTable('leave_request', (table) => {
      table.increments('id');
      table.integer('staff_id').unsigned().notNullable().references('users.id');
      table
        .integer('approved_staff_id')
        .unsigned()
        .notNullable()
        .references('users.id');
      table
        .integer('leave_type_id')
        .unsigned()
        .notNullable()
        .references('leave_type.id');
      table.timestamp('start_date').notNullable();
      table.integer('total_date').notNullable();
      table.string('remark', 1000).notNullable();
      table.enum('status', ['pending', 'approved', 'rejected']).notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('pic_request_leave'))) {
    await knex.schema.createTable('pic_request_leave', (table) => {
      table.increments('id');
      table
        .integer('req_id')
        .unsigned()
        .notNullable()
        .references('leave_request.id');
      table.string('pic').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('claim_request'))) {
    await knex.schema.createTable('claim_request', (table) => {
      table.increments('id');
      table.integer('staff_id').unsigned().notNullable().references('users.id');
      table
        .integer('approved_staff_id')
        .unsigned()
        .notNullable()
        .references('users.id');
      table.string('type');
      table.string('date');
      table.integer('amount').notNullable();
      table.string('remark', 1000).notNullable();
      table.string('status');
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('pic_request_claim'))) {
    await knex.schema.createTable('pic_request_claim', (table) => {
      table.increments('id');
      table
        .integer('req_id')
        .unsigned()
        .notNullable()
        .references('claim_request.id');
      table.string('pic').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('schedule_list'))) {
    await knex.schema.createTable('schedule_list', (table) => {
      table.increments('id');
      table.integer('staff_id').unsigned().notNullable().references('users.id');
      table.timestamp('start_date');
      table.timestamp('end_date');
      table.string('title', 255);
      table.string('remark', 255);
      table.string('label', 255);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('check_in_record'))) {
    await knex.schema.createTable('check_in_record', (table) => {
      table.increments('id');
      table.integer('staff_id').unsigned().notNullable().references('users.id');
      table.string('ip_address').notNullable();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('check_in_record');
  await knex.schema.dropTableIfExists('schedule_list');
  await knex.schema.dropTableIfExists('pic_request_claim');
  await knex.schema.dropTableIfExists('claim_request');
  await knex.schema.dropTableIfExists('claim_type');
  await knex.schema.dropTableIfExists('pic_request_leave');
  await knex.schema.dropTableIfExists('leave_request');
  await knex.schema.dropTableIfExists('leave_type');
  await knex.schema.dropTableIfExists('department_approver');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('department_relation');
  await knex.schema.dropTableIfExists('access_level');
  await knex.schema.dropTableIfExists('job_title');
  await knex.schema.dropTableIfExists('department');
}
