import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Player extends Model {
    public id!: number;
    public balance!: number;
    public totalBets!: number;
    public totalWinnings!: number;
}

Player.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1000,
    },
    totalBets: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    totalWinnings: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Player',
});

export default Player;
