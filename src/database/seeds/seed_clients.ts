import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('clients').del();
    await knex('assets').del();
    await knex('platform_balance').del();
    await knex('transactions').del();


  // Вставьте тестовые данные
  await knex('clients').insert([
    { client_id: '1f5b5a20-8979-4c69-8514-fd0a2175cb7e', name: 'Alice', balance_quote: 100.0, balance_tokens: 50.0 },
    { client_id: '7b94c1ed-c8d4-4a1d-8351-7c2c6d61bcb2', name: 'Bob', balance_quote: 200.0, balance_tokens: 30.0 },
  ]);

  await knex('assets').insert([
    { asset_id: 'e6b0c7a1-f7f5-4d4b-a44a-536a3e9a54b2', ticker: 'BTC', contract_address: '0x1234567890abcdef' },
    { asset_id: 'a6c0d7b1-f7f5-4d4b-b44a-636a4e8b55b3', ticker: 'ETH', contract_address: '0xabcdef1234567890' },
  ]);

  await knex('platform_balance').insert([
    { balance_id: 'a1234567-1234-1234-1234-1234567890ab', balance_tokens: 10000.0, balance_sol: 5000.0, last_updated: new Date() },
  ]);

  await knex('transactions').insert([
    { transaction_id: 'f1234567-1234-1234-1234-1234567890ab', user_id: '1f5b5a20-8979-4c69-8514-fd0a2175cb7e', asset_id: 'e6b0c7a1-f7f5-4d4b-a44a-536a3e9a54b2', transaction_type: 'open_position', position_type: 'long', amount_token: 10.0, quote_amount: 50.0, status: 'pending', date: new Date() },
  ]);
};
