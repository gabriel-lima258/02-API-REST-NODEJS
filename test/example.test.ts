import { expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
// execSync permite que possamos rodar o terminal dentro do node
import { execSync } from 'node:child_process'
// quando separo o app do arquivo server posso usar o server no teste
import { app } from '../src/app'

/* A função describe permite agrupar testes relacionados em blocos para melhorar a legibilidade
e manutenção dos códigos de testes. Além disso, é possível utilizar a função describe para criar
estruturas de testes hierárquicas e repetir o setup em blocos de testes comuns. */
describe('Transactions routes', () => {
  // espera o app executar o server antes dos testes
  beforeAll(async () => {
    await app.ready()
  })

  // fecha o server de testes assim que acabar
  afterAll(async () => {
    await app.close()
  })

  // rodando as migrations para que o banco de testes possa funcionar
  beforeEach(() => {
    // zerando todo o banco de dados para depois fazer o teste novamente
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  // ao invés de usar test podemos usar id também
  test('user can create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New test transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  // nunca podemos depender de outro teste para rodar outro!
  test('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New test transaction',
        amount: 5000,
        type: 'credit',
      })

    // pegando o cookie criado do header
    const cookies = createTransactionResponse.get('Set-Cookie')

    // criando a rota de listagem
    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) // set permite passar uma informação da requisição
      .expect(200)

    // dentro da lista de transactions eu espero um objeto contendo as seguintes respostas
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New test transaction',
        amount: 5000,
      }),
    ])
  })

  test('should be able to list a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New test transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    // pegando o id da transaction criada
    const transactionId = listTransactionsResponse.body.transactions[0].id

    // passando o parâmetro junto com id
    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New test transaction',
        amount: 5000,
      }),
    )
  })

  test('should be able to list the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    // criando um post de debito da conta
    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    // esperando uma rota de summary
    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    // esperando que resultado seja igual a 3000
    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
