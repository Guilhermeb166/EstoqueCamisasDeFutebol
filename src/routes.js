import { Router } from 'express';
//importa a funcionalidade Router que permite criar um conjunto de rotas organizadas
// Importação das rotas específicas
import { countriesRoutes } from './routes/countriesRoutes.js'
import { teamsRoutes } from './routes/teamsRoutes.js';
import { sizesRoutes } from './routes/sizesRoutes.js';
import { shirtsRoutes } from './routes/shirtsRoutes.js';
const router = Router()

// Rota de exemplo - Raiz da API
router.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API de camisas de futebol!' });
  });

// Define os caminhos específicos e conecta as rotas importadas
router.use('/countries', countriesRoutes); // Rota para países
router.use('/teams', teamsRoutes); // Rota para times
router.use('/sizes', sizesRoutes); // Rota para tamanhos
router.use('/shirts', shirtsRoutes); // Rota para camisas*/

export { router };
