function createBook(selector, title, author, isbn) {
    let bookgenerator = (function () {
        let id = 1
        return function (selector, bookTitle, authorName, isbn){
            let container = $(selector)
            let div = $('<div>')
            div.attr('id', `book${id}`)
            div.css('border', 'none')

            div.append($('<p>').addClass('title').text(bookTitle))
            div.append($('<p>').addClass('author').text(authorName))
            div.append($('<p>').addClass('isbn').text(isbn))

            let selectBtn = $('<button>')
            selectBtn.text('Select')
            selectBtn.on('click', function () {
                div.css('border', '2px solid blue')
            })
            div.append(selectBtn)

            div.append($('<button>').text('Deselect').on('click', () => { div.css('border', 'none') }))

            container.append(div)
            id++
        }
    }())

    bookgenerator(selector, title, author, isbn)
    // bookgenerator(selector, title, author, isbn)
}