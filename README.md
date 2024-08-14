# <p align="center">Sistema de Garagem</p>

<p align="justify">Este projeto tem como intuito exibir uma interface para que o usuário consiga ver todos os seus carros em um servidor de FiveM.</p>

# <p align="center">Demonstração</p>
https://github.com/user-attachments/assets/73a93624-3248-4829-a449-fe7dcbb29cad

# :pushpin: Recursos

## Player
- [x] Visualizar seus carros
- [x] Spawnar carro selecionado

## Admin
- [x] Visualizar carros
- [x] Spawnar carro selecionado
- [x] Spawnar qualquer carro através do comando `/car (placa)`
- [x] Atribuir um carro, executando `assignCar (placa)`

## Carros
- [x] Dados do veículo vinculados ao banco de dados:
    - [x] Placa
    - [x] Cor
    - [x] Dono

# 👨‍💻 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Axios](https://axios-http.com/docs/intro)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [React](https://pt-br.reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Lua](https://www.lua.org/portugues.html)

# Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

# ⚠️ Popular banco de dados ⚠️

Não se esqueça de popular o banco de dados, pois é nele que estão todos os veículos registrados para que o usuário consiga visualizar e executar alguns scripts.

# ▶️ Executando o projeto

## API
```bash
# Navegue até o diretório da API
cd api

# Instale as dependências
npm install

# Gere o cliente prisma
npx prisma generate

# Execute as migrações do banco de dados
npx prisma migrate dev

# Visualize o banco de dados (opcional)
npx prisma studio

# Popule o banco de dados
npm run seed

# Inicie a API
npm run dev
```

## Web
```bash
# Navegue até o diretório da aplicação web
cd web

# Instale as dependências
npm install

# Inicie e faça o build ao mesmo tempo
npm run start:game
```

Por fim, insira `ensure metropole-garage` em seu arquivo `server.cfg`.