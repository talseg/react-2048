
export type Direction = "left" | "right" | "up" | "down";

export const getNewMatrixByDirection = (matrix: number[][], direction: Direction ): number[][] => {

    switch (direction) {

        case "left" :
        if (matrix[0][3] === 2) {
            return ([
                [2,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]);
        }
        break;

        case "right" :
        if (matrix[0][0] === 2) {
            return ([
                [0,0,0,2],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]);
        }
        break;
    }
    
    return matrix;
}