# Gerenciador de Filmes

Este é um projeto full-stack simples para gerenciar uma lista de filmes, construído com Node.js no backend e React no frontend.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/)

## Como Executar o Projeto

O projeto é dividido em duas partes: `backend` e `frontend`. Cada uma precisa ser executada em um terminal separado.

### 1. Backend (Servidor e Banco de Dados)

O backend é responsável pela API e pela conexão com o banco de dados PostgreSQL, que roda em um contêiner Docker.

```bash
# 1. Abra um terminal e navegue até a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Inicie o banco de dados em segundo plano com Docker
# (Certifique-se de que o Docker Desktop esteja em execução)
docker-compose up -d

# 4. Rode as migrações para criar as tabelas no banco
npm run migrate

# 5. Inicie o servidor do backend
npm run dev
```

O servidor estará rodando em `http://localhost:3333`.

### 2. Frontend (Interface do Usuário)

O frontend é uma aplicação React que consome a API do backend.

```bash
# 1. Abra um NOVO terminal e navegue até a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie a aplicação de desenvolvimento
npm run dev
```

A aplicação estará disponível no seu navegador, geralmente em `http://localhost:5173`.

---

## Encerrando o Ambiente

Quando terminar de usar o projeto, você pode parar os serviços:

1.  Pressione `Ctrl + C` nos terminais onde o backend e o frontend estão rodando.
2.  Para desligar o contêiner do banco de dados e liberar recursos, execute:

```bash
# Navegue até a pasta do backend
cd backend

docker-compose down
```
