import Player from '../models/playerModel';

const getPlayerData = async (): Promise<Player | null> => {
    return await Player.findOne();
};

const updatePlayerBalance = async (amount: number): Promise<void> => {
    const player = await getPlayerData();
    if (player) {
        player.balance += amount;
        await player.save();
    }
};

const updateTotalBets = async (amount: number): Promise<void> => {
    const player = await getPlayerData();
    if (player) {
        player.totalBets += amount;
        await player.save();
    }
};

const updateTotalWinnings = async (amount: number): Promise<void> => {
    const player = await getPlayerData();
    if (player) {
        player.totalWinnings += amount;
        await player.save();
    }
};

export {
    getPlayerData,
    updatePlayerBalance,
    updateTotalBets,
    updateTotalWinnings,
};
