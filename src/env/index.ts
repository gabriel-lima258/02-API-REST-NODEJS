// importando todas as configurações do arquivo .env
import { config } from 'dotenv'
// importando o zod para manipular as env
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' }) // passa um banco de teste
} else {
  config() // se não segue as config padrões
}

// dentro do schema podemos informar qual tipo de variável será recebida
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

// o método safeParse vai fazer uma validação dentro do schema, caso dê erro será disparado auto
const _env = envSchema.safeParse(process.env)

// se disparar um erro de env, vai tratar a sua exceção
// usando o _env.error.format vamos saber qual variável esta com erro
if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  // joga um erro para parar o código
  throw new Error('Invalid environment variables.')
}

// criando uma variável env com os valores de teste
export const env = _env.data
