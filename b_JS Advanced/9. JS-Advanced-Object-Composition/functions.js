function orderRects(rectsData) {
    let rects = [];
    for (let [width, height] of rectsData) {
        let rect = createRect(width, height);
        rects.push(rect);
    }
    rects.sort((a,b) => a.compareTo(b));
    return rects;

    function createRect(width, height) {
        let rect = {
            width: width,
            height: height,
            area: () => rect.width * rect.height,
            compareTo: function(other) {
                let result = other.area() - rect.area();
                return result || (other.width - rect.width);
            }
        };
        return rect;
    }
}

// console.log(orderRects([[3, 4], [5, 3], [3, 4], [3, 5], [12, 1]]));

function getFibonator() {
    let f0 = 0, f1 = 1;
    return function() {
        let f2 = f0 + f1;
        f0 = f1;
        f1 = f2;
        return f1;
    };
}

let fib = getFibonator();
console.log(fib()) // 1
console.log(fib()) // 1
console.log(fib()) // 2

function processCommands(commands) {
    let commandProcessor = (function() {
        let list = [];
        return {
            add: (newItem) => list.push(newItem),
            remove: (item) =>
                list = list.filter(x => x != item),
            print: () => console.log(list)
        }
    })();

    for (let cmd of commands) {
        let [cmdName, arg] = cmd.split(' ');
        commandProcessor[cmdName](arg);
    }
}

// let result = processCommands(['add hello', 'add again', 'remove hello', 'add again', 'print'])
// console.log(result)

function processCommands(commands) {
    let map = new Map();
    let cmdExecutor = {
        create: function ([objName, inherits, parent]) {
            parent = parent ? map.get(parent) : null;
            let newObj = Object.create(parent);
            map.set(objName, newObj);
            return newObj;
        },
        set: function ([objName, key, value]) {
            let obj = map.get(objName);
            obj[key] = value;
        },
        print: function ([objName]) {
            let obj = map.get(objName), objects = [];
            for (let key in obj) { objects.push(`${key}:${obj[key]}`); }
            console.log(objects.join(', '));
        }
    };

    for (let command of commands) {
        let commandParameters = command.split(' ');
        let action = commandParameters.shift();
        cmdExecutor[action](commandParameters);
    }
}

// let result = processCommands(['create c1','create c2 inherit c1'])
// console.log(result)

function getModel() {
    let model = {
        init: function(num1Sel, num2Sel, resultSel) {
            model.num1 = $(num1Sel);
            model.num2 = $(num2Sel);
            model.result = $(resultSel);
        },
        add: () => model.action((a, b) => a + b),
        subtract: () => model.action((a, b) => a - b),
        action: function(operation) {
            let val1 = Number(model.num1.val());
            let val2 = Number(model.num2.val());
            model.result.val(operation(val1, val2));
        }
    };

    return model;
}
