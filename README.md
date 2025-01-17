# Projeto: Sistema de Gerenciamento de Estoque de Camisas de Futebol

Este projeto é uma aplicação backend desenvolvida em **Node.js**, utilizando o **Prisma ORM** para manipulação de banco de dados e **PostgreSQL** como banco de dados relacional. O objetivo do sistema é simular um CRUD para gerenciar um estoque de camisas de times de futebol, permitindo cadastrar, atualizar, listar e excluir países, times, camisas e tamanhos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Prisma ORM**: Ferramenta para mapeamento objeto-relacional.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento das informações.
- **Express.js**: Framework para criação de rotas e APIs RESTful.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.

## Funcionalidades

1. **Gerenciamento de Países**
   - Cadastrar novos países.
   - Listar países cadastrados.
   - Atualizar informações de um país.
   - Excluir países.

2. **Gerenciamento de Times**
   - Cadastrar times vinculados a países.
   - Listar times cadastrados.
   - Atualizar informações de um time.
   - Excluir times.

3. **Gerenciamento de Camisas**
   - Cadastrar camisas vinculadas a times.
   - Listar camisas cadastradas.
   - Atualizar informações de uma camisa.
   - Excluir camisas.

4. **Gerenciamento de Tamanhos**
   - Cadastrar tamanhos disponíveis para camisas (ex.: P, M, G).
   - Listar tamanhos cadastrados.
   - Atualizar tamanhos.
   - Excluir tamanhos.

## Modelos do Banco de Dados

Abaixo está uma visão geral dos principais modelos do banco de dados:

### **Country (País)**
- `id`: Identificador único (UUID).
- `name`: Nome do país (único).
- `slug`: Identificador único amigável baseado no nome.
- Relação: Um país pode ter vários times.

### **Team (Time)**
- `id`: Identificador único (UUID).
- `name`: Nome do time (único).
- `slug`: Identificador único amigável baseado no nome.
- `countryId`: Referência ao país do time.
- Relação: Um time pode ter várias camisas.

### **Shirt (Camisa)**
- `id`: Identificador único (UUID).
- `name`: Nome da camisa (ex.: "Camisa Home 2024").
- `description`: Descrição detalhada da camisa.
- `price`: Preço da camisa.
- `imageUrl`: URL de uma imagem da camisa.
- `teamId`: Referência ao time dono da camisa.
- `sizeId`: Referência ao tamanho da camisa.
- Relação: Uma camisa pertence a um time e possui um tamanho.

### **Size (Tamanho)**
- `id`: Identificador único (UUID).
- `size`: Nome do tamanho (ex.: "P", "M", "G").
- `slug`: Identificador único amigável baseado no nome.
- Relação: Um tamanho pode ser associado a várias camisas.

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-estoque-camisas.git
