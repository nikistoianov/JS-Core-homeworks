// let counter = (function () {
//     let i = 0
//     return function () {
//         console.log(++i)
//     }
// })()
//
// counter()
// counter()
// counter()

function solve(arr) {
    let max = Math.max(...arr)
    console.log(max);
    let hh = [...arr]
    console.log(hh);
}

solve([1, 2, 3, 45])