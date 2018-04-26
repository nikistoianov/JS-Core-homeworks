function extractText() {
//            let jqueryItems = $('ul#items li').toArray()
//            console.log(jqueryItems)
    let items = $("ul#items li")
        .toArray()
        .map(li => li.textContent)
        .join(", ")
    $("#result").text(items)
//            let resultItem = $('#result')
//            console.log(resultItem);
}