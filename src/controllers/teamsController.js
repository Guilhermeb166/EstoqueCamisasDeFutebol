import prisma from "../prisma/prisma.js";
import { formatTeamName } from "../normalizations/formatName.js";
import { slugify } from "../normalizations/slugify.js";

export const getTeams = async (req, res) => {
  const teams = await prisma.team.findMany(
    {
      select:{
        name:true, //seleciona apenas o nome do time
        slug:true,
        country:{
          select:{
            name:true//seleciona apenas o nome do país relacionado
          }
        }
      }

    }
    //{ include: { country: true } } // Inclui informações do país relacionado
  );

  return res.json(teams);
  /*
    Aqui, estamos criando uma função chamada getTeams. O async significa que essa função é assíncrona, ou seja, ela pode realizar operações que demoram, como acessar o banco de dados, sem bloquear o fluxo de execução do código.

    await faz a função esperar o resultado da operação assíncrona antes de continuar. Aqui, estamos dizendo para o Prisma buscar todos os países no banco de dados.

    prisma.team.findMany(): O Prisma irá buscar todos os registros da tabela team no banco de dados.
*/
};

//criar um novo time
export const createTeam = async (req, res) => {
  let { name, countryName } = req.body;
  //Aqui estamos extraindo o campo name do corpo da requisição que o cliente enviou
  if (!name || !countryName) {
    throw new Error("O nome do time e do país são obrigatórios!");
  }

  //Normalizar e gerar o slug
  name = formatTeamName(name.trim())
  const slug = slugify(name)
  countryName = formatTeamName(countryName)


  //Verificar se o time já existe pelo nome ou slug
  const existingTeam  = await prisma.country.findFirst({
    where: {OR:[{name},{slug}]},
  });

  if (existingTeam) {
    throw new Error("O time já existe no banco de dados!");
  }

  //Verificar se o país existe no banco de dados
  const country = await prisma.country.findUnique({
    where: { name: countryName },
  });

  if (!country) {
    throw new Error("O país fornecido não existe no banco de dados.");
  }

  const newTeam = await prisma.team.create({
    data: {
      name,
      slug,
      countryId: country.id, // associa o time ao país pelo id
    },
  });
  /*Essa linha cria um novo time no banco de dados usando o nome fornecido. O Prisma usa a tabela teams para criar um novo registro.
    data: { name,slug }: Passa o name do país como o dado para ser inserido no banco de dados.
    */
  return res.status(201).json(newTeam);
};

export const updateTeam = async (req, res) => {
  const { slug } = req.params;
  /*req.params contém os parâmetros da URL da requisição. Neste caso, 
  estamos extraindo o id do país que será atualizado. O id será passado como parte da URL.*/
  
  if (!slug) {
    throw new Error("O slug do time é obrigatório!");
  }

  let { name, countryName } = req.body;
  //contém os dados que o cliente enviou no corpo da requisição, como o novo nome do país.

  // Normalizar e gerar novo slug
  if (name) {
    name = formatTeamName(name.trim());
  }
  const newSlug = name ? slugify(name) : undefined;

  countryName = formatTeamName(countryName)

 // Buscar o time pelo slug para garantir que ele existe
  const existingTeam = await prisma.team.findUnique({
    where: { slug },
  });

  if (!existingTeam) {
    return res.status(404).json({ error: "Time não encontrado!" });
  }

  let countryId = existingTeam.countryId;

  // Se um novo país for fornecido, verificar se ele existe no banco de dados
  if (countryName) {
    const country = await prisma.country.findUnique({
      where: { name: countryName },
    });

    if (!country) {
      return res.status(400).json({ error: "O país fornecido não existe no banco de dados." });
    }

    countryId = country.id;
  }
  

  const updatedTeam = await prisma.team.update({
    // O Prisma vai buscar o time com o slug fornecido e atualizá-lo com os novos dados.
    where: { slug  },
    //Aqui, informamos ao Prisma qual time queremos atualizar, identificando-o pelo id.
    data: {
      name : name || existingTeam.name,
      slug: newSlug || existingTeam.slug,
      countryId,
    },
    //Aqui, passamos os dados que queremos atualizar.
  });
  return res.json(updatedTeam);
};

export const deleteTeam = async (req, res) => {
  let { slug } = req.params;
  //Extraímos o id do país a partir dos parâmetros da URL, assim sabemos qual país queremos excluir.

  if (!slug) {
    throw new Error("O slug do time é obrigatório!");
  }

  // Normalizar o slug
  slug = slugify(slug.trim());

  // Verificar se o time existe
  const team = await prisma.team.findUnique({
    where: { slug },
  });

  if (!team) {
    return res.status(404).json({ error: "Time não encontrado!" });
  }


  await prisma.team.delete({ where: { slug } });
  //O Prisma vai deletar o país com o id fornecido.
  //where: { id }:Aqui, informamos ao Prisma qual país queremos atualizar, identificando-o pelo id.

  return res.status(204).send();  
};
