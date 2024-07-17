import { Request, Response } from 'express';
import { deposit } from '../../src/controllers/walletController';
import { getPlayerData, updatePlayerBalance } from '../../src/services/playerService';

jest.mock('../../src/services/playerService');

const mockPlayerData = {
  id: 0,
  balance: 0,
  totalBets: 0,
  totalWinnings: 0,
};

describe('Wallet Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { body: { amount: 50 } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle deposit', async () => {
        (getPlayerData as jest.Mock).mockResolvedValue(mockPlayerData);
        await deposit(req as Request, res as Response);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ balance: 50 });
        expect(updatePlayerBalance).toHaveBeenCalledWith(50);
    });

    it('should handle invalid deposit amount', async () => {
        req.body.amount = -10;

        await deposit(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Invalid deposit amount');
        expect(updatePlayerBalance).not.toHaveBeenCalled();
    });
});
