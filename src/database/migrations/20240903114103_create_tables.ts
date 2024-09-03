import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('assets', (table) => {
    table.uuid('asset_id').primary();
    table.string('ticker', 6).notNullable();
    table.string('contract_address').notNullable();
    });

    await knex.schema.createTable('platform_balance', (table) => {
    table.uuid('balance_id').primary();
    table.decimal('balance_tokens', 20, 8).notNullable().defaultTo(0.0);
    table.decimal('balance_sol', 20, 8).notNullable().defaultTo(0.0);
    table.date('last_updated').notNullable().defaultTo(knex.fn.now());
    });
    // Создаем таблицу clients (если она еще не была создана)
  await knex.schema.createTable('clients', (table) => {
    table.uuid('client_id').primary(); // Первичный ключ
    table.string('name').notNullable(); // Имя клиента
    table.decimal('balance_quote', 20, 8).notNullable().defaultTo(0.0); // Баланс SOL
    table.decimal('balance_tokens', 20, 8).notNullable().defaultTo(0.0); // Баланс токенов
  });

  // Создаем таблицу transactions
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('transaction_id').primary(); // Первичный ключ для транзакции
    table.uuid('user_id').notNullable(); // Ссылка на клиента (foreign key)
    table.uuid('asset_id').notNullable(); // Идентификатор актива
    table.enum('transaction_type', ['open_position', 'close_position']).notNullable(); // Тип транзакции
    table.enum('position_type', ['long', 'short']).notNullable(); // Тип позиции
    table.decimal('amount_token', 20, 8).notNullable(); // Количество токенов
    table.decimal('quote_amount', 20, 8).notNullable(); // Количество SOL
    table.enum('status', ['pending', 'successful', 'failed']).notNullable(); // Статус транзакции
    table.timestamp('date').defaultTo(knex.fn.now()); // Дата и время транзакции
    table.string('dex_transaction_id'); // Идентификатор транзакции на DEX
    table.decimal('platform_balance_before', 20, 8); // Баланс платформы до транзакции
    table.decimal('platform_balance_after', 20, 8); // Баланс платформы после транзакции

    // Добавляем внешний ключ
    table
      .foreign('user_id') // Указываем поле, которое будет внешним ключом
      .references('client_id') // Указываем на какое поле ссылается внешний ключ
      .inTable('clients') // Указываем в какой таблице находится поле, на которое ссылается внешний ключ
      .onDelete('CASCADE'); // Указываем поведение при удалении записи в связанной таблице (в данном случае каскадное удаление)

    // Добавляем внешний ключ
    table
      .foreign('asset_id') // Указываем поле, которое будет внешним ключом
      .references('asset_id') // Указываем на какое поле ссылается внешний ключ
      .inTable('assets') // Указываем в какой таблице находится поле, на которое ссылается внешний ключ
      .onDelete('CASCADE'); // Указываем поведение при удалении записи в связанной таблице (в данном случае каскадное удаление)
  });
}


export async function down(knex: Knex): Promise<void> {
  // Удаление таблицы transactions (таблица с внешними ключами)
  await knex.schema.dropTableIfExists('transactions');

  // Удаление таблицы clients (таблица, на которую ссылаются внешние ключи из transactions)
  await knex.schema.dropTableIfExists('clients');

  // Удаление таблицы assets (таблица, на которую ссылаются внешние ключи из transactions)
  await knex.schema.dropTableIfExists('assets');

  // Удаление таблицы platform_balance  
  await knex.schema.dropTableIfExists('platform_balance');
}
