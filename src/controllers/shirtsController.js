import prisma from "../prisma/prisma.js";
import { formatTeamName } from "../normalizations/formatName.js";
import { slugify } from "../normalizations/slugify.js";
export const getShirts = async (req,res) =>{
    const shirts = await prisma.shirt.findMany({
        select:{
            name:true,//nome da camisa do time
            description:true, //descrição da camisa
            price:true,//preço da camisa
            size:true,//tamanho da camisa
            team:{ select:{name:true}} //nome do time que  a camisa pertence
        }
    })
    return res.json(shirts)
}

export const createShirt = async (req,res)=>{
    const {name, description, price, imageUrl, teamName, size} = req.body

     // Verificar se os campos estão presentes e lançar erros específicos
     if (!name) {
        throw new Error('O campo "name" (nome da camisa) é obrigatório.');
    }
    if (!description) {
        throw new Error('O campo "description" (descrição) é obrigatório.');
    }
    if (!price) {
        throw new Error('O campo "price" (preço) é obrigatório.');
    }
    if (!imageUrl) {
        throw new Error('O campo "imageUrl" (URL da imagem) é obrigatório.');
    }
    if (!teamName) {
        throw new Error('O campo "teamName" (nome do time) é obrigatório.');
    }
    if(!size){
        throw new Error ('O campo "size" (tamanho da camisa) é obrigatório')
    }

    const team = await prisma.team.findUnique({
        where:{slug: slugify(teamName)}
    })
    if(!team) {
        throw new Error ("O time fornecido não existe no banco de dados!")
    }

    const newShirt = await prisma.shirt.create({
        data:{
            name,description,price,imageUrl,size,teamId: team.id,slug:slugify(name),
        }
    })

    return res.status(201).json(newShirt)
}

export const updateShirt = async (req,res) =>{
    let {slug} = req.params
    let {name,description,price,imageUrl,size} = req.body

    const updatedShirt = await prisma.shirt.update({
        where:{slug: slugify(slug) },
        data:{name,description,price,imageUrl,size, slug:name ? slugify(name) : undefined}
    })
    return res.json(updatedShirt)
}

export const deleteShirt = async (req,res)=>{
    const {slug} = req.params

    if (!slug) {
        throw new Error("O slug da camisa é obrigatório!");
      }
    await prisma.shirt.delete({
        where: { slug },
      });
    
      return res.status(204).send();
}