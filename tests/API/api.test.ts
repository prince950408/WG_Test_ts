import request from 'supertest';
import { app, startServer, stopServer } from '../../src/app';
import { getPlayerData } from '../../src/services/playerService';

jest.mock('../../src/services/playerService');

const mockPlayerData = {
  id: 0,
  balance: 1000,
  totalBets: 0,
  totalWinnings: 0,
};

describe('Wallet Endpoints', () => {
  beforeAll(async () => {
    await startServer(3001);
  });

  afterAll(async () => {
    await stopServer();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('POST /wallet/deposit', () => {
    it('should deposit funds into the player wallet', async () => {
      (getPlayerData as jest.Mock).mockResolvedValue(mockPlayerData);

      const response = await request(app)
        .post('/wallet/deposit')
        .send({ amount: 100 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance', 1100);
    });

    it('should return 400 for invalid deposit amount', async () => {
      (getPlayerData as jest.Mock).mockResolvedValue(mockPlayerData);

      const response = await request(app)
        .post('/wallet/deposit')
        .send({ amount: -100 });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /wallet/withdraw', () => {
    it('should withdraw funds from the player wallet', async () => {
      (getPlayerData as jest.Mock).mockResolvedValue(mockPlayerData);

      const response = await request(app)
        .post('/wallet/withdraw')
        .send({ amount: 50 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance', 950);
    });

    it('should return 400 for invalid withdraw amount', async () => {
      (getPlayerData as jest.Mock).mockResolvedValue(mockPlayerData);

      const response = await request(app)
        .post('/wallet/withdraw')
        .send({ amount: 2000 });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /wallet/balance', () => {
    it('should return the current balance', async () => {
      (getPlayerData as jest.Mock).mockResolvedValue(mockPlayerData);

      const response = await request(app).get('/wallet/balance');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance', 1000);
    });
  });
});
