import { Request, Response } from 'express';
import { getPlayerData, updatePlayerBalance, updateTotalBets, updateTotalWinnings } from '../services/playerService';
import { generateMatrix, calculateWinnings } from '../utils/game';

const playGame = async (req: Request, res: Response) => {
    let { bet } = req.body;
    if (!bet || bet <= 0) {
        return res.status(400).json({ error: 'Invalid bet or playerId' });
    }

    const player = await getPlayerData();

    if (!player || player.balance < bet) {
        return res.status(400).json({ error: 'Insufficient balance or invalid player' });
    }

    await updatePlayerBalance(-bet);
    await updateTotalBets(bet);

    const matrix = generateMatrix();
    const winnings = calculateWinnings(matrix) * bet;

    await updatePlayerBalance(winnings);
    await updateTotalWinnings(winnings);

    res.json({ matrix, winnings });
};

const simulateGames = async (req: Request, res: Response): Promise<Response> => {
    const { count, bet } = req.body;
    const playerData = await getPlayerData();

    if (!count || count <= 0 || !bet || bet <= 0 || (bet * count) > (playerData?.balance ?? 0)) {
        return res.status(400).json('Invalid count or bet amount');
    }

    if (!playerData) {
        return res.status(400).json('Player not found');
    }

    await updatePlayerBalance(-(bet * count));
    await updateTotalBets(bet * count);

    let totalWinnings = 0;

    for (let i = 0; i < count; i++) {
        const matrix = generateMatrix();
        totalWinnings += calculateWinnings(matrix) * bet;
    }

    await updatePlayerBalance(totalWinnings);
    await updateTotalWinnings(totalWinnings);

    return res.json({ totalWinnings, netResult: totalWinnings - (bet * count) });
};

const getRTP = async (req: Request, res: Response): Promise<Response> => {
    const playerData = await getPlayerData();

    if (!playerData) {
        return res.status(400).send('Player not found');
    }

    // For first spin, return 0
    if (playerData.totalBets === 0) {
        return res.json({ rtp: 0 });
    }

    const rtp = (playerData.totalWinnings / playerData.totalBets) * 100;
    return res.json({ rtp });
};

export {
    playGame,
    simulateGames,
    getRTP,
};
