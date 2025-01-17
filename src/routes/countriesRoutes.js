import { Router } from "express";
import { getCountries, createCountry, updateCountry, deleteCountry } from '../controllers/countriesController.js';

const router = Router()

router.get('/',getCountries)  // Listar países
router.post('/create', createCountry) // Criar um país
router.put('/:slug', updateCountry) // Atualizar um país
router.delete('/:slug', deleteCountry) // Deletar um país

export { router as countriesRoutes };