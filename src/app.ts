/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

// criando um fastify
export const app = fastify()

// adicionando o cookie na aplicação
app.register(cookie)

// chamando um plugin de rotas do fastify
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
