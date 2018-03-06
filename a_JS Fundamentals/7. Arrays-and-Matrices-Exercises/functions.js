function printArrayWithDelimiter(arr) {
    let delimiter = arr.pop();
    console.log(arr.join(delimiter));
}

function printArrayWithDelimiter(arr) {
    let step = arr.pop();
    for (let i = 0; i < arr.length; i += Number(step)) {
        console.log(arr[i]);
    }
}

function addAndRemoveElements(input) {
    let arr = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 'add') {
            arr.push(i + 1);
        } else {
            arr.pop();
        }
    }
    if (arr.length == 0) {
        console.log('Empty');
    } else {
        console.log(arr.join('\n'));
    }
}

function addAndRemoveElements_2(input) {
    let arr = [];
    let commands = {
        add: (num) => arr.push(num),
        remove: () => arr.pop()
    }

    for (let i = 0; i < input.length; i++) {
        commands[input[i]](i + 1);
    }

    if (arr.length == 0) {
        console.log('Empty');
    } else {
        console.log(arr.join('\n'));
    }
}

function rotateArray(arr) {
    let num = Number(arr.pop());
    for (let i = 0; i < num % arr.length; i++) {
        arr.unshift(arr.pop());
    }
    console.log(arr.join(' '));
}

function extractNondecreasingSubsequence(input) {
    let arr = [input[0]];
    for (let i = 1; i < input.length; i++) {
        if (input[i] >= arr[arr.length - 1]) {
            arr.push(input[i]);
        }
    }
    console.log(arr.join('\n'));
}

function sortArray(arr) {
    arr = arr.sort((a, b) => a > b).sort((a, b) => a.length > b.length)
    console.log(arr.join('\n'));
}

function magicMatrices(matrix) {
    let sum = -1;
    for (let i = 0; i < matrix.length; i++) {
        let currentSum = matrix[i].reduce((a, b) => a + b, 0)
        if (sum == -1) {sum = currentSum}

        if (sum !== currentSum) {return false}
    }

    let rowsCount = matrix.length
    let colsCount = matrix[0].length
    for (let c = 0; c < colsCount; c++) {
        let colSum = 0
        for (let r = 0; r < rowsCount; r++) {
            colSum += matrix[r][c]
        }
        if (sum !== colSum) {return false}
    }

    return true
}

function spiralMatrix(rows, cols) {
    let matrix = fillMatrixWithZeroes(rows, cols)
    matrix[0][0] = 1

    let cell = [0,0,2]
    let all = rows * cols
    while (cell[2] <= all) {
        cell = fillRow(cell)
        cell = fillCol(cell)
    }
    printMatrix(matrix)

    function printMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            console.log(matrix[i].join(' '))
        }
    }

    function fillMatrixWithZeroes(rows, cols) {
        let matrix = []
        for (let i = 0; i < rows; i++) {
            matrix.push('0'.repeat(cols).split('').map(Number))
        }
        return matrix
    }

    function fillRow(cell) {
        let [row, col, startVal] = cell
        if (col < cols - 1 && matrix[row][col + 1] === 0) {
            let i = col + 1
            for (i = col + 1; i < cols; i++) {
                if (matrix[row][i] != 0) {break}
                matrix[row][i] = startVal++
            }
            col = i - 1
        } else if (col > 0 && matrix[row][col - 1] === 0) {
            let i
            for (i = col - 1; i >= 0; i--) {
                if (matrix[row][i] != 0) {break}
                matrix[row][i] = startVal++
            }
            col = i + 1
        }
        return [row, col, startVal]
    }

    function fillCol(cell) {
        let [row, col, startVal] = cell
        if (row < rows - 1 && matrix[row + 1][col] === 0) {
            let i
            for (i = row + 1; i < rows; i++) {
                if (matrix[i][col] != 0) {break}
                matrix[i][col] = startVal++
            }
            row = i - 1
        } else if (row > 0 && matrix[row - 1][col] === 0) {
            let i
            for (i = row - 1; i >= 0; i--) {
                if (matrix[i][col] != 0) {break}
                matrix[i][col] = startVal++
            }
            row = i + 1
        }
        return [row, col, startVal]
    }
}

function diagonalAttack(arr) {
    let matrix = []
    for (let i = 0; i < arr.length; i++) {
        matrix.push(arr[i].split(' ').map(Number))
    }

    let mainDia = 0, secondDia = 0, num = matrix.length
    for (let i = 0; i < num; i++) {
        mainDia += matrix[i][i]
        secondDia += matrix[i][num - i - 1]
    }

    if (mainDia === secondDia) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (i != j && i != num - j - 1) {
                    matrix[i][j] = mainDia
                }
            }
        }
    }

    printMatrix(matrix);

    function printMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            console.log(matrix[i].join(' '))
        }
    }

}

function orbit(arr) {
    let [width, height, x, y] = arr
    let cols = Math.max(width - x - 1, x)
    let rows = Math.max(height - y - 1, y)

    let matrix = fillMatrixWithZeroes(height, width)
    matrix[x][y] = 1

    for (let i = 1; i <= Math.max(cols, rows); i++) {
        generateOrbit(i)
    }

    printMatrix(matrix)

    function fillMatrixWithZeroes(rows, cols) {
        let matrix = []
        for (let i = 0; i < rows; i++) {
            matrix.push('0'.repeat(cols).split('').map(Number))
        }
        return matrix
    }

    function printMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            console.log(matrix[i].join(' '))
        }
    }
    
    function generateOrbit(orbitId) {
        for (let i = x - orbitId; i <= x + orbitId; i++) {
            setNum(i, y - orbitId, orbitId + 1)
            setNum(i, y + orbitId, orbitId + 1)
        }
        for (let j = y - orbitId; j <= y + orbitId; j++) {
            setNum(x - orbitId, j, orbitId + 1)
            setNum(x + orbitId, j, orbitId + 1)
        }
    }

    function setNum(x, y, val) {
        if (x >=0 && x < width && y >= 0 && y < height) {
            matrix[x][y] = val
        }
    }

}


function escapeChars(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function test(arr) {
    let keys = Object.keys(arr)
    if (arr.hasOwnProperty('name')) {
        console.log('Yes')
    }
}

// test({name: 'Pesho', age: 33})

function countWordsInText(str) {
    let text = str.join('\n')
    let currentWords = text.split(/[^0-9A-Za-z_]+/).filter(x => x !== '')
    console.log(currentWords);
}
countWordsInText(['JS devs use Node.js for server-side JS.-- JS for devs'])