import { Request, Response } from 'express';
import { playGame } from '../../src/controllers/gameController';
import { getPlayerData, updatePlayerBalance, updateTotalBets, updateTotalWinnings } from '../../src/services/playerService';
import { generateMatrix, calculateWinnings } from '../../src/utils/game';

jest.mock('../../src/services/playerService');
jest.mock('../../src/utils/game');

describe('Game Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: { bet: 10 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle playGame', async () => {
    (getPlayerData as jest.Mock).mockReturnValueOnce({ balance: 100 });
    (generateMatrix as jest.Mock).mockReturnValueOnce([['A', 'A', 'A'], ['B', 'B', 'B'], ['C', 'C', 'C']]);
    (calculateWinnings as jest.Mock).mockReturnValueOnce(50);

    await playGame(req as Request, res as Response);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ matrix: [['A', 'A', 'A'], ['B', 'B', 'B'], ['C', 'C', 'C']], winnings: 500 });
    expect(updatePlayerBalance).toHaveBeenCalledWith(-10);
    expect(updateTotalBets).toHaveBeenCalledWith(10);
    expect(updateTotalWinnings).toHaveBeenCalledWith(500);
  });

  it('should handle insufficient balance', async () => {
    (getPlayerData as jest.Mock).mockReturnValueOnce({ balance: 5 });
    req.body.bet = 10;

    await playGame(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient balance or invalid player' });
    expect(updatePlayerBalance).not.toHaveBeenCalled();
  });
});
