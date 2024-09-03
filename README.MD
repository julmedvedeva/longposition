# Pong position

## Описание

Этот проект предназначен для управления финансовыми транзакциями и балансами. Использует Express.js и PostgreSQL для реализации бэкенда и базы данных.

## Установка

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/julmedvedeva/longposition.git
   cd longposition
   ```

2. **Установите зависимости:**

   Убедитесь, что у вас установлен Node.js и npm. Затем выполните:

   ```bash
   npm install
   ```

3. **Настройте PostgreSQL:**

   Убедитесь, что PostgreSQL установлен и запущен. Если PostgreSQL еще не установлен, следуйте [официальным инструкциям по установке](https://www.postgresql.org/download/).

## Создание базы данных

1. **Создайте базу данных:**

   Создайте базу данных с именем `your_database_name`. Для этого используйте команду в терминале:

   ```bash
   createdb your_database_name
   ```

   или выполните это через любой инструмент для работы с базами данных, такой как DBeaver.

2. **Настройте файл конфигурации `knexfile.ts`:**

   В файле `knexfile.ts`, замените параметры подключения на свои:

   ```typescript
   import type { Knex } from 'knex';

   const config: { [key: string]: Knex.Config } = {
     development: {
       client: 'pg',
       connection: {
         host: 'localhost',
         user: 'your_username',
         password: 'your_password',
         database: 'your_database_name'
       },
       migrations: {
         directory: './migrations',
       },
       seeds: {
         directory: './seeds',
       },
     },
     // другие конфигурации (если есть)
   };

   export default config;
   ```

3. **Настройка строки подключения:**

В файле src/index.ts используйте следующую строку подключения:

```javascript
const db = pgp('jdbc:postgresql://localhost:5432/postgres');
```

Замените localhost на нужный хост (если используется другой) и 5432 на порт PostgreSQL (если используется другой). Также замените postgres на имя вашей базы данных, если оно отличается.

## Накат миграций

1. **Создайте миграции:**

   Если вы хотите создать новую миграцию, выполните команду:

   ```bash
   npx knex migrate:make migration_name --knexfile src/database/knexfile.ts --env development
   ```

   Замените `migration_name` на название вашей миграции.

2. **Примените миграции:**

   Чтобы накатить миграции, выполните команду:

   ```bash
   npx knex migrate:latest --knexfile src/database/knexfile.ts --env development
   ```

   Эта команда применит все миграции, которые еще не были применены, и создаст необходимые таблицы в базе данных.

3. **Откат миграций (если необходимо):**

   Если вам нужно откатить последнюю миграцию, выполните команду:

   ```bash
   npx knex migrate:rollback --knexfile src/database/knexfile.ts --env development
   ```

   Для полного отката всех миграций можно использовать:

   ```bash
   npx knex migrate:rollback --all --knexfile src/database/knexfile.ts --env development
   ```

## Примечания

- Убедитесь, что PostgreSQL запущен и база данных доступна перед запуском миграций.
- Проверьте права доступа к базе данных, чтобы убедиться, что ваш пользователь имеет права на создание и изменение таблиц.

---

Для дополнительной информации обратитесь к [документации Knex](http://knexjs.org/#Migrations) и [документации PostgreSQL](https://www.postgresql.org/docs/).

Nota bene: перед реализацией кода была проведена подготовительная работа:
анализ, построение логики запросов. Это можно найти по [ссылке](https://www.figma.com/design/bLB1fdLLaLB6Fm6WU1L7MJ/long-posiiton?node-id=0-1&t=rVRtEtVLOlwMK9lL-1)
