
// ToDo - refactor with map
export const mapMatrix = (matrix: number[][]): number[][] => {

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




    return [];
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



