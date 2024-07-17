import sequelize from './config/database';
import Player from './models/playerModel';

async function initializeDatabase() {
    try {
        await sequelize.sync();
        const count = await Player.count();

        if (count === 0) {
            await Player.create({
                balance: 1000,
                totalBets: 0,
                totalWinnings: 0,
            });
            console.log('Default player data inserted.');
        } else {
            console.log('Player data already exists.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

initializeDatabase();
