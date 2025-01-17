import { PrismaClient } from '@prisma/client';
//É a interface principal fornecida pelo Prisma para interagir com o banco de dados. Ele contém métodos para acessar tabelas e executar consultas.

const prisma = new PrismaClient()
//Cria uma nova instância do cliente do Prisma, permitindo que você faça consultas no banco de dados.

export default prisma