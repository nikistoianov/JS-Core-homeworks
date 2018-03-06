function triangleOfStarts(n) {
    for (let i = 1; i <= n; i++) {
        console.log("*".repeat(i))
    }
    for (let i = n - 1; i > 0; i--) {
        console.log("*".repeat(i))
    }
}

function squareOfStars(n = 5) {
    for (let i = 1; i <= n; i++) {
        console.log("* ".repeat(n))
    }
}

function palindrome(input) {
    let reversed = input.split('').reverse().join("")
    if (input === reversed){
        return true
    }
    return false
}

function dayOfWeek(input) {
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let result = days.indexOf(input) + 1
    if (result === 0) result = 'error'
    return result
}

function functionalCalculator(a, b, operator) {
    let add = function (a, b) {return a + b}
    let subtract = function (a, b) {return a - b}
    let multiply = function (a, b) {return a * b}
    let divide = function (a, b) {return a / b}
    switch (operator) {
        case '+': return add(a, b)
        case '-': return subtract(a, b)
        case '*': return multiply(a, b)
        case '/': return divide(a, b)
    }
}

function aggregateElements(arr) {
    aggregate(0, (a, b) => {return a + b})
    aggregate(0, (a, b) => {return a + 1 / b})
    aggregate('', (a, b) => {return a + b})
    function aggregate(val, func) {
        for (let i = 0; i < arr.length; i++) {
            val = func(val, arr[i])
        }
        console.log(val)
    }
}

function wordsUppercase(input) {
    let words = extractWords()
    return words.filter(x => x !== '').join(', ')
    function extractWords() {
        return input.toUpperCase().split(/\W+/)
    }
}

console.log(wordsUppercase('Hi, how are you?'));