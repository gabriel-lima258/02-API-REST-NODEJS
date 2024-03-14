<div align="center">
  <h1>
    <img src="https://user-images.githubusercontent.com/71537090/214130327-4d796169-1ae2-43aa-bbc5-4b0131d80083.png" />
  </h1>
  
  > 💰 Uma aplicação de uma API Rest para gerenciamento de transações pessoais ajudando na gestão de gastos
  
  <p align="center">
    <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-requisições">Requisições</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-anotações-das-aulas">Anotações das aulas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-contatos">Contatos</a>
  </p>
</div>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- NodeJS
- Typescript
- Fastify
- Vitest
- Supertest
- Knex (SQLite e Postgresql)
- TSUP
- ESBuild

## 🧪 Projeto

Nesse módulo do Ignite NodeJS desenvolvemos uma API RestFull com Nodejs para gerenciamento de transações onde um usuário pode criar uma transação com um valor
específico, seja ela de débito ou crédito. O usuário pode cadastrar uma transação de adição de valor ou retirada de valor.

Além disso, é possível utilizar dos endpoints para listar todas as transações, buscar uma transação específica e gerar um resumo das transações mostrando a soma dos valores.

## 🤿 Requisições

Abaixo todos os exemplos de requisições usadas no projeto.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fgithub.com%2FAzanniel%2Fapi-rest-nodejs-fastify%2Fblob%2Fmain%2Finsomnia.json)

## 📋 Anotações das aulas

### Cookies

É uma forma de manter contexto entre requisições. Utilizamos principalmente por redes sociais.
Também usado como forma de armazenar informações sem o usuário estar logado ou ter criado uma conta ainda.

### Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

### Regras de Negócio

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;

### Sobre os testes

- Unitários: Testam uma unidade isolada da aplicação
- Integração: Testam a comunicação entre duas ou mais unidades da aplicação
- E2E (Ponta a ponta): Simulam um usuário operando na nossa aplicação

Para os testes E2E:

No Frontend seria exatamente a ação do usuário de abrir uma página de login por exemplo e realizar
todas as operações para se autenticar na aplicação.

No backend é testado as portas de comunicação com a aplicação, desde a requisição até o banco de dados.
Seja por meio de protocolo HTTP ou WebSockets

### Melhores opções de Deploy [14/04/2023]

- [Render.com](https://render.com/)
- [Fly.io](https://fly.io/)
- [Railway.app](https://railway.app/)

## ☕ Contatos

Você vai me encontrar em qualquer uma das redes sociais abaixo:

<a href = "mailto: gabriel58221@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23EA4335?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" margin-right="10px"></a>
<a href="https://www.linkedin.com/in/gabriel-lima258/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://api.whatsapp.com/send?phone=5561992632007" target="_blank"><img src="https://img.shields.io/badge/-WhatsApp-%25D366?style=for-the-badge&logo=whatsapp&logoColor=white" target="_blank"></a>


<p align="center">Aplicação construída com muito ☕ por Gabriel Lima</p>
