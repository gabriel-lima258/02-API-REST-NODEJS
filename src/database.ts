// importando a interface Knex para usar dentro da config
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

// configurando o knex com os padrões do knex
export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL, // importando a variável de env
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

// passando a config para dentro do knex
export const knex = setupKnex(config)
