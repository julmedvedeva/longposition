import { Knex } from "knex";
import { PlatformBalance } from '../../common/interfaces/platformbalance';
export class  PlatformBalanceModel {
  constructor(private knex: Knex) { }
    async create(platformBalanceData: PlatformBalance) {
    return this.knex('platform_balance').insert(platformBalanceData).returning('*');
  }

  async getById(balanceId: string) {
    return this.knex('platform_balance').where({ balance_id: balanceId }).first();
  }

  async update(balanceId: string, data: Partial<PlatformBalance>) {
    return this.knex('platform_balance').where({ balance_id: balanceId }).update(data).returning('*');
  }

  async delete(balanceId: string) {
    return this.knex('platform_balance').where({ balance_id: balanceId }).del();
  }
}
