function bitcoinMining(arr) {
    let currentDay = 0
    let gold = 0
    let day = 0
    for (let i = 0; i < arr.length; i++) {
        currentDay++
        let grams = Number(arr[i])
        let currentGold = grams * 67.51
        if (currentDay % 3 === 0) {
            currentGold *= 0.7
        }
        gold += currentGold

        if (gold >= 11949.16 && day == 0) {
            day = i + 1
        }
    }

    let bitcoins = Math.floor(gold / 11949.16);
    let money = gold - bitcoins * 11949.16
    console.log(`Bought bitcoins: ${bitcoins}`)
    if (bitcoins > 0) console.log(`Day of the first purchased bitcoin: ${day}`)
    console.log(`Left money: ${money.toFixed(2)} lv.`)

}

//bitcoinMining(['3124.15', '504.212', '2511.124'])

function airPollution(map, forces) {
    map = fillMap(map)
    for (let force of forces) {
        let [forceName, index] = force.split(' ')
        switch (forceName) {
            case 'breeze':
                forceBreeze(index)
                break;
            case 'gale':
                forceGale(index)
                break;
            case 'smog':
                forceSmog(index)
                break;
        }
        //printMatrix(map)
        //console.log('');
    }

    let resultArray = []
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] >= 50) {
                resultArray.push(`[${i}-${j}]`)
            }
        }
    }

    if (resultArray.length === 0) {
        console.log('No polluted areas');
    } else {
        console.log(`Polluted areas: ${resultArray.join(', ')}`);
    }

    //console.log(resultArray);

    function printMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            console.log(matrix[i].join(' '))
        }
    }

    function fillMap(map) {
        let matrix = []
        for (let i = 0; i < map.length; i++) {
            matrix.push(map[i].split(' ').map(Number))
        }
        return matrix
    }

    function forceBreeze(index) {
        for (let i = 0; i < map.length; i++) {
            map[index][i] -= 15
            if (map[index][i] < 0) map[index][i] = 0
        }
    }

    function forceGale(index) {
        for (let i = 0; i < map.length; i++) {
            map[i][index] -= 20
            if (map[i][index] < 0) map[i][index] = 0
        }
    }

    function forceSmog(index) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                map[i][j] += Number(index)
                if (map[i][j] < 0) map[i][j] = 0
            }
        }
    }
}

// airPollution([
//         "5 7 2 14 4",
//         "21 14 2 5 3",
//         "3 16 7 42 12",
//         "2 20 8 39 14",
//         "7 34 1 10 24",
//     ],
//     ["breeze 1", "gale 2", "smog 35"]
// )

function surveyParser(str) {
    let allVotes = 0
    let allRating = 0
    const regex = /<svg>.*?<cat>.*?<text>.*?\[(.*)\].*?<\/cat>.*?<cat>(.*?)<\/cat>.*?<\/svg>/g;
    let matches = regex.exec(str)

    if (matches == null) {
        //throw new Error();
        let mainRegex = /<svg>.*?<\/svg>/g;
        if (mainRegex.test(str)) {
            console.log('Invalid format');
        } else {
            console.log('No survey found');
        }
        return
    }

    let surveyLabel = matches[1]
    if (surveyLabel == null) {
        throw new Error();
    }

    const regex2 = /<g>.*?<val>(.*?)<\/val>(.*?)<\/g>/g;

    let m;
    while ((m = regex2.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex2.lastIndex) {
            regex2.lastIndex++;
        }
        let value = Number(m[1])
        let count = Number(m[2])

        if (m[1] == value && m[2] == count) {
            if (value >= 1 && value <= 10 && count >= 0) {
                let currentRating = value * count
                allRating += currentRating
                allVotes += count
            }
            //console.log(m[1]);
        } else {
            //throw new Error();
        }
    }

    let averageRating = Math.round(allRating / allVotes * 100) / 100
    console.log(`${surveyLabel}: ${averageRating}`);

    //console.log(matches);
}

//console.log(Number('-10'));
// surveyParser('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>NNN</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>')
// surveyParser('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>')
// surveyParser('<svg><cat><text>Which is your favourite meal from our selection?</text></cat><cat><g><val>Fish</val>15</g><g><val>Prawns</val>31</g><g><val>Crab Langoon</val>12</g><g><val>Calamari</val>17</g></cat></svg>')
// surveyParser('<p>How do you suggest we improve our service?</p><p>More tacos.</p><p>It\'s great, don\'t mess with it!</p><p>I\'d like to have the option for delivery</p>')
// surveyParser('<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>')

function epicness(inputKingdoms, matrix) {
    //console.log(inputKingdoms);
    let kingdoms = []
    let match = false;
    for (let obj of inputKingdoms) {
        match = false;
        for (let i = 0; i < kingdoms.length; i++) {
            if (kingdoms[i].kingdom == obj.kingdom) {
                let j = kingdoms[i].generals.indexOf(obj.general)
                if (j > -1) {
                    kingdoms[i].armies[j] += obj.army
                } else {
                    kingdoms[i].generals.push(obj.general)
                    kingdoms[i].armies.push(obj.army)
                    kingdoms[i].wins.push(0)
                    kingdoms[i].loses.push(0)
                }
                match = true;
                break;
            }
        }

        if (!match) {
            let kingdom = {}
            kingdom.kingdom = obj.kingdom

            kingdom.generals = [obj.general]
            kingdom.armies = [obj.army]
            kingdom.wins = [0]
            kingdom.loses = [0]

            // let general = {name: obj.general, army: obj.army, wins: 0, loses: 0}
            // kingdom.generals = [general]

            kingdom.allwins = 0
            kingdom.allloses = 0
            kingdoms.push(kingdom)
        }
    }

    //console.log(kingdoms);

    for (let fight of matrix) {
        let [attackingKingdom, attackingGeneral, defendingKingdom, defendingGeneral] = fight

        if (attackingKingdom == defendingKingdom) {
            continue
        }
        //console.log(attackingKingdom);
        let i1 = findKingdomIndex(attackingKingdom)
        let i2 = findKingdomIndex(defendingKingdom)

        let attackingIndex = kingdoms[i1].generals.indexOf(attackingGeneral)
        let attackingArmy = kingdoms[i1].armies[attackingIndex]

        let defendingIndex = kingdoms[i2].generals.indexOf(defendingGeneral)
        let defendingArmy = kingdoms[i2].armies[defendingIndex]

        if (attackingArmy > defendingArmy) {
            kingdoms[i1].armies[attackingIndex] = Math.floor(1.1 * kingdoms[i1].armies[attackingIndex])
            kingdoms[i1].wins[attackingIndex]++
            kingdoms[i1].allwins++
            kingdoms[i2].armies[defendingIndex] = Math.floor(0.9 * kingdoms[i2].armies[defendingIndex])
            kingdoms[i2].loses[defendingIndex]++
            kingdoms[i2].allloses++
            //console.log(attackingGeneral + ' wins');
        } else if (attackingArmy < defendingArmy) {
            kingdoms[i1].armies[attackingIndex] = Math.floor(0.9 * kingdoms[i1].armies[attackingIndex])
            kingdoms[i1].loses[attackingIndex]++
            kingdoms[i1].allloses++
            kingdoms[i2].armies[defendingIndex] = Math.floor(1.1 * kingdoms[i2].armies[defendingIndex])
            kingdoms[i2].wins[defendingIndex]++
            kingdoms[i2].allwins++
            //console.log(defendingGeneral + ' wins');
        }
        //console.log(`${attackingArmy} -> ${defendingArmy}`)

    }

    kingdoms.sort(dynamicSortAscending('kingdom'))
    kingdoms.sort(dynamicSortAscending('allloses'))
    kingdoms.sort(dynamicSortDescending('allwins'))
    //console.log(kingdoms);

    let winning = kingdoms[0]
    let generals = []
    for (let i = 0; i < winning.generals.length; i++) {
        generals.push({name: winning.generals[i], army: winning.armies[i], wins: winning.wins[i], losses: winning.loses[i]})
    }
    generals.sort(dynamicSortDescending('army'))

    console.log(`Winner: ${winning.kingdom}`);
    for (let i = 0; i < generals.length; i++) {
        console.log(`/\\general: ${generals[i].name}`);
        console.log(`---army: ${generals[i].army}`);
        console.log(`---wins: ${generals[i].wins}`);
        console.log(`---losses: ${generals[i].losses}`);
    }
    //console.log(generals);
    //console.log(winning);

    function dynamicSortAscending(property) {
        var sortOrder = 1;

        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    function dynamicSortDescending(property) {
        var sortOrder = 1;

        return function (a,b) {
            var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    function findKingdomIndex(kingdomName) {
        for (let i = 0; i < kingdoms.length; i++) {
            if (kingdomName == kingdoms[i].kingdom) {
                return i
            }
        }
    }

}

epicness(
    [ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]

)