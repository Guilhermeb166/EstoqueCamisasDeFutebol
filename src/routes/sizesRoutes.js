import { Router } from "express";
import { getSizes,createSize,deleteSize } from "../controllers/sizesController.js";

const router = Router()

router.get('/',getSizes)  // Listar países
router.post('/create', createSize) // Criar um país
//router.put('/:id', updateShirt) // Atualizar um país
router.delete('/:slug', deleteSize) // Deletar um país

export { router as sizesRoutes };