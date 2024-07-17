const symbols: string[] = ['A', 'B', 'C', 'D', 'E'];
const rows: number = 3;
const cols: number = 3;
const winMultiplier: number = 5;

const generateMatrix = (): string[][] => {
    let matrix: string[][] = [];
    for (let i = 0; i < rows; i++) {
        let row: string[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        matrix.push(row);
    }
    return matrix;
};

const calculateWinnings = (matrix: string[][]): number => {
    let winnings: number = 0;
    for (let row of matrix) {
        if (row.every(symbol => symbol === row[0])) {
            winnings += winMultiplier;
        }
    }
    return winnings;
};

export {
    generateMatrix,
    calculateWinnings
};
