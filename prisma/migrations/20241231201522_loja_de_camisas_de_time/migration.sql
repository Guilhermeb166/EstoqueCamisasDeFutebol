-- CreateTable
CREATE TABLE "paises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "times" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "paisId" TEXT NOT NULL,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Camisa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "timeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Camisa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tamanho" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "Tamanho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CamisaTamanho" (
    "id" TEXT NOT NULL,
    "camisaId" TEXT NOT NULL,
    "tamanhoId" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,

    CONSTRAINT "CamisaTamanho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paises_name_key" ON "paises"("name");

-- CreateIndex
CREATE UNIQUE INDEX "times_nome_key" ON "times"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tamanho_size_key" ON "Tamanho"("size");

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Camisa" ADD CONSTRAINT "Camisa_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamisaTamanho" ADD CONSTRAINT "CamisaTamanho_camisaId_fkey" FOREIGN KEY ("camisaId") REFERENCES "Camisa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamisaTamanho" ADD CONSTRAINT "CamisaTamanho_tamanhoId_fkey" FOREIGN KEY ("tamanhoId") REFERENCES "Tamanho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
