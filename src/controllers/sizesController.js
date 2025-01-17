import prisma from "../prisma/prisma.js";
import { slugify } from "../normalizations/slugify.js";
import { formatName } from "../normalizations/formatName.js";
// Lista de tamanhos permitidos
const allowedSizes = ["PP", "P", "M", "G", "GG", "XG", "XL", "XXL"];

export const getSizes = async (req,res) => {
    const sizes = await prisma.size.findMany({
        include: {
            shirts: {
                select: { name: true }, // Apenas o nome das camisas
            },
        },
    });

    return res.json(sizes)
    /*
    Aqui, estamos criando uma função chamada getTeams. O async significa que essa função é assíncrona, ou seja, ela pode realizar operações que demoram, como acessar o banco de dados, sem bloquear o fluxo de execução do código.

    await faz a função esperar o resultado da operação assíncrona antes de continuar. Aqui, estamos dizendo para o Prisma buscar todos os países no banco de dados.

    prisma.team.findMany(): O Prisma irá buscar todos os registros da tabela team no banco de dados.
    */
}

export const createSize = async (req,res) =>{
    let {size} = req.body
    if(!size){
        throw new Error ("O valor do tamanho é obrigatório!")
    }

    size = formatName(size)

    // Verificar se o tamanho está na lista de permitidos
    if (!allowedSizes.includes(size.toUpperCase())) {
        return res.status(400).json({ error: `O tamanho "${size}" não é permitido. Tamanhos válidos: ${allowedSizes.join(", ")}` });
    }

    // Verificar se o tamanho já existe
    const existingSize = await prisma.size.findUnique({
        where: { slug: slugify(size) },
    });
    if (existingSize) {
        return res.status(409).json({ error: "Este tamanho já está cadastrado." });
    }

    const newSize = await prisma.size.create({
        data:{
            size,
            slug: slugify(size)
        }
    })

    return res.status(201).json(newSize)
}


export const deleteSize = async (req,res) =>{
    let {slug } = req.params
    if(!slug){
        throw new Error ("O slug do tamanho é obrigatório")
    }
    slug = slugify(slug)

    await prisma.size.delete({
        where:{slug}
    })
    return res.status(204).send();
}