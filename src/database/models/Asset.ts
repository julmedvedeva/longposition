import { Knex } from 'knex';
import { Asset } from '../../common/interfaces/asset';

export class AssetModel {
  constructor(private knex: Knex) {}

  async create(assetData: Asset) {
    return this.knex('assets').insert(assetData).returning('*');
  }

  async getById(assetId: string) {
    return this.knex('assets').where({ asset_id: assetId }).first();
  }

  async update(assetId: string, data: Partial<Asset>) {
    return this.knex('assets').where({ asset_id: assetId }).update(data).returning('*');
  }

  async delete(assetId: string) {
    return this.knex('assets').where({ asset_id: assetId }).del();
  }
}
