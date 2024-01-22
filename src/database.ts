// importando a interface Knex para usar dentro da config
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

// configurando o knex com os padrões do knex
export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL, // importando a variável de env
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

// passando a config para dentro do knex
export const knex = setupKnex(config)
