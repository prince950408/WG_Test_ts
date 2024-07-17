import { Router } from 'express';
import { deposit, withdraw, getBalance } from '../controllers/walletController';

const router = Router();

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/balance', getBalance);

export default router;
