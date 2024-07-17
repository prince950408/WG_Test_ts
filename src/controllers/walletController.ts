import { Request, Response } from 'express';
import { getPlayerData, updatePlayerBalance } from '../services/playerService';

const deposit = async (req: Request, res: Response): Promise<Response> => {
    let { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json('Invalid deposit amount');
    }

    const playerData = await getPlayerData();
    if (!playerData) {
        return res.status(400).json('Player not found');
    }

    await updatePlayerBalance(amount);

    return res.json({ balance: playerData.balance + amount });
};

const withdraw = async (req: Request, res: Response): Promise<Response> => {
    let { amount } = req.body;
    const playerData = await getPlayerData();

    if (!amount || amount <= 0 || (playerData && amount > playerData.balance)) {
        return res.status(400).json('Invalid withdraw amount');
    }

    if (!playerData) {
        return res.status(400).json('Player not found');
    }

    await updatePlayerBalance(-amount);
    return res.json({ balance: playerData.balance - amount });
};

const getBalance = async (req: Request, res: Response): Promise<Response> => {
    const playerData = await getPlayerData();

    if (playerData) {
        return res.json({ balance: playerData.balance });
    }

    return res.status(400).json('Player not found');
};

export {
    deposit,
    withdraw,
    getBalance
};
