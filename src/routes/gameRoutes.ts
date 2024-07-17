import { Router } from 'express';
import { playGame, simulateGames, getRTP } from '../controllers/gameController';

const router = Router();

router.post('/play', playGame);
router.post('/sim', simulateGames);
router.get('/rtp', getRTP);

export default router;
