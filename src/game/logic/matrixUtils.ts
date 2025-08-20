
// ToDo - refactor with map
export const mapMatrix = (matrix: number[][]): number[][] => {

  const newMatrix: number[][] = [[], [], [], []];
  for (let row: number = 0; row < matrix.length; row++) {
        for (let col: number = 0; col < matrix[row].length; col++) {
            newMatrix[row][col] = matrix[row][col];
        }
    }
  return newMatrix;
};

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


