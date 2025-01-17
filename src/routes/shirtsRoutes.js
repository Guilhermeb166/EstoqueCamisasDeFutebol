import { Router } from "express";
import { getShirts,createShirt,updateShirt,deleteShirt } from "../controllers/shirtsController.js";

const router = Router()

router.get('/',getShirts)  // Listar países
router.post('/create', createShirt) // Criar um país
router.put('/:slug', updateShirt) // Atualizar um país
router.delete('/:slug', deleteShirt) // Deletar um país

export { router as shirtsRoutes };