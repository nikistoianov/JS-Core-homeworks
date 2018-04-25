function increment_my(selector) {
    let element = $(selector)
    // let textArea = $('<textarea class="counter" disabled="disabled">')
    let textArea = $('<textarea>')
    textArea.addClass('counter')
    textArea.attr('disabled', true)
    textArea.val(0)

    let buttonIncr = $('<button class="btn" id="incrementBtn">').text('Increment')
    buttonIncr.on('click', function () {
        textArea.val(Number(textArea.val()) + 1)
    })

    let buttonAdd = $('<button class="btn" id="addBtn">').text('Add')
    buttonAdd.on('click', function () {
        ul.append($('<li>').text(textArea.val()))
    })

    // let ul = $('<ul class="results">').append($('<li>').text('2')).append($('<li>').text('4'))
    let ul = $('<ul>')
    ul.addClass('results')


    element.append(textArea)
        .append(buttonIncr)
        .append(buttonAdd)
        .append(ul)

    // console.log(element)
}

function increment(selector) {
    let container = $(selector)
    let fragment = document.createDocumentFragment()
    let textArea = $('<textarea>')
    let incrementBtn = $('<button>').text('Increment')
    let addBtn = $('<button>').text('Add')
    let list = $('<ul>')

    // Textarea formation
    textArea.addClass('counter')
    textArea.attr('disabled', true)
    textArea.val(0)

    // Buttons formation
    incrementBtn.addClass('btn')
    incrementBtn.attr('id', 'incrementBtn')
    addBtn.addClass('btn')
    addBtn.attr('id', 'addBtn')

    // List formation
    list.addClass('results')

    // Events
    incrementBtn.on('click', function () {
        textArea.val(+textArea.val() + 1)
    })
    addBtn.on('click', function () {
        list.append($('<li>').text(textArea.val()))
    })

    textArea.appendTo(fragment)
    incrementBtn.appendTo(fragment)
    addBtn.appendTo(fragment)
    list.appendTo(fragment)

    container.append(fragment)
}
