function insideVolume(arr) {
    for (let i = 0; i < arr.length; i += 3) {
        let x = arr[i];
        let y = arr[i+1];
        let z = arr[i+2];

        if (isInside(x, y, z)) {
            console.log('inside');
        } else {
            console.log('outside');
        }

        function isInside(x, y, z) {
            let x1 = 10, x2 = 50;
            let y1 = 20, y2 = 80;
            let z1 = 15, z2 = 50;

            if (x >= x1 && x <= x2) {
                if (y >= y1 && y <= y2) {
                    if (z >= z1 && z <= z2) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}

function roadRadar(arr) {
    let [speed, area]  = arr;
    let limits = {'motorway': 130, 'interstate': 90, 'city': 50, 'residential': 20};
    let overSpeed = speed - limits[area];
    if (overSpeed > 40) {
        return 'reckless driving';
    } else if (overSpeed > 20) {
        return 'excessive speeding';
    } else if (overSpeed > 0) {
        return 'speeding';
    }
}

function templateFormat(arr) {

    console.log('<?xml version="1.0" encoding="UTF-8"?>\n<quiz>')
    for (let i = 0; i < arr.length; i += 2) {
        let question = arr[i];
        let answer = arr[i+1];

        console.log(getXml(question, answer));;
    }
    console.log('</quiz>')
    
    function getXml(question, answer) {
        return `<question>
    ${question}
  </question>
  <answer>
    ${answer}
  </answer>`
    }
}

function cookingByNumbers(arr) {

    let num = arr[0];
    for (let i = 1; i < arr.length; i++) {
        num = makeOperation(num, arr[i]);
        console.log(num);
    }

    function makeOperation(num, operation) {
        switch (operation) {
            case 'chop': return num / 2;
            case 'dice': return Math.sqrt(num);
            case 'spice': return num + 1;
            case 'bake': return num * 3;
            case 'fillet': return num - 0.2 * num;
        }
    }
}

function modifyAverage(num) {

    while (!validateNumber(num)) {
        num += '9';
    }
    return num;

    function validateNumber(num) {
        num += "";
        let sum = 0;

        for (let char of num) {
            sum += Number(char);
        }
        if (sum / num.length <= 5) {
            return false;
        } else {
            return true;
        }
    }
}

function validityChecker(arr) {
    let [x1, y1, x2, y2] = arr;

    let d1 = isInt(getDist(x1, y1, 0, 0));
    printOutput(x1, y1, 0, 0, d1)

    d1 = isInt(getDist(x2, y2, 0, 0));
    printOutput(x2, y2, 0, 0, d1)

    d1 = isInt(getDist(x1, y1, x2, y2));
    printOutput(x1, y1, x2, y2, d1)

    function printOutput(x1, y1, x2, y2, isInt) {
        if (isInt) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }

    function getDist(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    }

    function isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }
}

function treasureLocation(arr) {
    for (let i = 0; i < arr.length; i += 2) {
        let x = arr[i];
        let y = arr[i+1];

        if (!isOnCook(x, y) && !isOnSamoa(x, y) && !isOnToga(x, y) && !isOnTokelau(x, y) && !isOnTuvalu(x, y)) {
            console.log('On the bottom of the ocean');
        }

    }

    function isOnTuvalu(x, y) {
        if (x >= 1 && x <= 3 && y >= 1 && y <= 3) {
            console.log('Tuvalu');
            return true;
        }
        return false;
    }
    function isOnToga(x, y) {
        if (x >= 0 && x <= 2 && y >= 6 && y <= 8) {
            console.log('Tonga');
            return true;
        }
        return false;
    }
    function isOnSamoa(x, y) {
        if (x >= 5 && x <= 7 && y >= 3 && y <= 6) {
            console.log('Samoa');
            return true;
        }
        return false;
    }
    function isOnCook(x, y) {
        if (x >= 4 && x <= 9 && y >= 7 && y <= 8) {
            console.log('Cook');
            return true;
        }
        return false;
    }
    function isOnTokelau(x, y) {
        if (x >= 8 && x <= 9 && y >= 0 && y <= 1) {
            console.log('Tokelau');
            return true;
        }
        return false;
    }
}

function tripLength(arr) {
    let [x1, y1, x2, y2, x3, y3] = arr;

    let p1p2 = getDist(x1, y1, x2, y2);
    let p2p3 = getDist(x2, y2, x3, y3);
    let p1p3 = getDist(x3, y3, x1, y1);

    let output = '';
    let length = 0;
    if (p1p2 <= p1p3 && p1p2 <= p2p3) {
        if (p1p3 <= p2p3) {
            console.log(`1->2->3: ${p1p2 + p1p3}`);
        } else {
            console.log(`1->2->3: ${p1p2 + p2p3}`);
        }
    } else if (p1p3 <= p1p2 && p1p3 <= p2p3) {
        if (p1p2 <= p2p3) {
            console.log(`2->1->3: ${p1p2 + p1p3}`);
        } else {
            console.log(`1->3->2: ${p1p3 + p2p3}`);
        }
    } else {
        if (p1p2 <= p1p3) {
            console.log(`1->2->3: ${p1p2 + p2p3}`);
        } else {
            console.log(`1->3->2: ${p1p3 + p2p3}`);
        }
    }

    function getDist(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    }
}

console.log(tripLength(
    [5, 1, 1, 1, 5, 4]
));