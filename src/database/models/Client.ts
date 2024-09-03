import { Knex } from 'knex';
import { Client } from '../../common/interfaces/client';

export class ClientModel {
  constructor(private knex: Knex) {}

  async create(clientData:Client) {
    return this.knex('clients').insert(clientData).returning('*');
  }

  async getById(clientId: string) {
    return this.knex('clients').where({ client_id: clientId }).first();
  }

  async update(clientId: string, data: Partial<Client>) {
    return this.knex('clients').where({ client_id: clientId }).update(data).returning('*');
  }

  async delete(clientId: string) {
    return this.knex('clients').where({ client_id: clientId }).del();
  }
}
