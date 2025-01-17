import prisma from "../prisma/prisma.js";
import { formatName } from "../normalizations/formatName.js";
import { slugify } from "../normalizations/slugify.js";

export const getCountries = async (req, res) => {
  const countries = await prisma.country.findMany();
  return res.json(countries);
  /*
    Aqui, estamos criando uma função chamada getCountries. O async significa que essa função é assíncrona, ou seja, ela pode realizar operações que demoram, como acessar o banco de dados, sem bloquear o fluxo de execução do código.

    await faz a função esperar o resultado da operação assíncrona antes de continuar. Aqui, estamos dizendo para o Prisma buscar todos os países no banco de dados.

    prisma.pais.findMany(): O Prisma irá buscar todos os registros da tabela country no banco de dados.
*/
};

export const createCountry = async (req, res) => {
  let { name } = req.body;
  //Aqui estamos extraindo o campo name do corpo da requisição que o cliente enviou
  if (!name) {
    throw new Error("O nome do país é obrigatório.");
  }
  // Normalizar o nome do país
  name = formatName(name.trim());
  const slug = slugify(name);

  // Verificar se já existe um país com o mesmo nome ou slug
  const existingCountry = await prisma.country.findFirst({
    where: {
      OR: [{ slug }, { name }],
    },
  });
  if (existingCountry) {
    return res.status(409).json({ error: "Este país já está cadastrado." });
  }

  const newCountry = await prisma.country.create({ data: { name, slug } });
  /*Essa linha cria um novo país no banco de dados usando o nome fornecido. O Prisma usa a tabela pais para criar um novo registro.
  data: { name }: Passa o name do país comoo dado para ser inserido no banco de dados.
  */

  return res.status(201).json(newCountry);
};

export const updateCountry = async (req, res) => {
  const { slug } = req.params;
  /*req.params contém os parâmetros da URL da requisição. Neste caso, 
    estamos extraindo o slug(name) do país que será atualizado. O slug(name) será passado como parte da URL.*/
  let { newName } = req.body; //pegando o novo nome na requisição

  // Normalizar o nome do país
  newName = formatName(newName.trim());
  const newSlug = slugify(newName);

  //verificar se o país já existe pelo slug enviado
  const country = await prisma.country.findUnique({ where: { slug } });

  if (!country) {
    throw new Error("País fornecido não encontrado.");
  }

  //Verificar se já existe um país com esse novo nome
  const existingCountry = await prisma.country.findFirst({
    where: {
      OR: [{ name: newName }, { slug: newSlug }],
      NOT: { id: country.id },
    },
  });
  if (existingCountry) {
    return res.status(409).json({ error: "Já existe um país com esse nome!" });
  }

  const updatedCountry = await prisma.country.update({
    // O Prisma vai buscar o país com o slug(name) fornecido e atualizá-lo com os novos dados.
    where: { slug },
    //Aqui, informamos ao Prisma qual país queremos atualizar, identificando-o pelo slug(name).
    data: { name: newName, slug: newSlug },
    //Aqui, passamos os dados que queremos atualizar. Neste caso, o nome do país será alterado.
  });
  return res.json(updatedCountry);
};

export const deleteCountry = async (req, res) => {
  let { slug } = req.params;
  //Extraímos o slug do país a partir dos parâmetros da URL, assim sabemos qual país queremos excluir.

  // Normalizar o slug fornecido
  slug = slugify(slug.trim());

  const country = await prisma.country.findUnique({ where: { slug } });

  if (!country) {
    throw new Error("País fornecido não encontrado.");
  }

  await prisma.country.delete({ where: { slug } });
  //O Prisma vai deletar o país com o slug fornecido.
  //where: { slug }:Aqui, informamos ao Prisma qual país queremos atualizar, identificando-o pelo name.

  return res.status(204).send();
};
