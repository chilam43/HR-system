import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class AccessLevelService {
    constructor(@InjectModel() private knex: Knex) { }

    async fetchAccessLevel() {
        try {
            let accessLevel = await this.knex('access_level')
                .select("*")
            return accessLevel
        }
        catch (e) {
            return JSON.stringify(e)
        }
    }

}
