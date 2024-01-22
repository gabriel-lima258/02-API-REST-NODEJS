import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// todo plugin precisa ser async, além de especificar qual o tipo de parâmetro de app
export async function transactionsRoutes(app: FastifyInstance) {
  // método get para pegar todas as transactions
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId) // lista somente as req que o usuário criou
        .select()

      return { transactions }
    },
  )

  // método get para pegar uma transaction pelo id
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // verificando os dados com zod
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      // caso id seja uma string uuid vai passar, caso não vai dar erro
      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      // após a verificação pegar o dado pelo id encontrado, o first() alerta que só tem 1 resultado
      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { transaction }
    },
  )

  // método get para obter o resumo de seu saldo da conta
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, response) => {
    // usando o zod para especificar o tipo de dado a ser criado
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // validando os dados do req.body com o schema de validação do zod
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // chamando o cookie dentro da requisição
    let sessionId = request.cookies.sessionId

    // caso não tenha criar uma key uuid
    if (!sessionId) {
      sessionId = randomUUID()
      // dentro do response entregar o novo cookie
      response.cookie('sessionId', sessionId, {
        path: '/', // path indica que qualquer rota pode obter esse cookie
        maxAge: 60 * 60 * 24 * 7, // 7 dias de expiração
      })
    }

    // criando a criação do dados para o knex
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    // retornando o http code status
    return response.status(201).send()
  })
}
