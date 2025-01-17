import { Router } from "express";
import { getTeams, createTeam, updateTeam, deleteTeam } from "../controllers/teamsController.js";


const router = Router()

router.get('/', getTeams) //listar times
router.post('/create', createTeam)
router.put('/:slug', updateTeam)
router.delete('/:slug', deleteTeam)

export {router as teamsRoutes}