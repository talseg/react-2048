
// ToDo - refactor with map
export const mapMatrix = (matrix: number[][]): number[][] => {

    // ToDo - Do this without hard logic
    const newMatrix: number[][] = [[], [], [], []];

    for (let row: number = 0; row < matrix.length; row++) {
        for (let col: number = 0; col < matrix[row].length; col++) {
            newMatrix[row].push(matrix[row][col]);
        }
    }
    return newMatrix;
};

export const getRow = (matrix: number[][], rowIndex: number): number[] => {
    const row = [];
    for (let col = 0; col < matrix[rowIndex].length; col++) {
        row.push(matrix[rowIndex][col]);
    }
    return row;
}

export const getCol = (matrix: number[][], colIndex: number): number[] => {

    const row = new Array(matrix.length);

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        row[rowIndex] = matrix[rowIndex][colIndex];
    }
    return row;
}

export const rowFlip = (row: number[]): number[] => {

    const length = row.length;
    const flipedRow = new Array(length).fill(0);

    for (let index = 0; index < length; index++) {

        flipedRow[index] = row[length - index - 1];
    }
    return flipedRow;
}

export const printRow = (row: number[], header?: string) => {

    let output = header ? `${header}\n` : "";
    for (let index: number = 0; index < row.length; index++) {
        output += row[index] + " ";
    }
    console.log(output);
}

export const printMatrix = (matrix: number[][], header?: string) => {

    let output = header ? `${header}\n` : "";
    for (let row: number = 0; row < matrix.length; row++) {
        for (let col: number = 0; col < matrix[row].length; col++) {
            output += matrix[row][col] + " ";
        }
        output += "\n";
    }
    console.log(output);
}
