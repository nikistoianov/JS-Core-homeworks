function search() {
    let searchText = $('#searchText').val();
    if (searchText.trim() === "") {
        $('#result').text("type something to match!");
    } else {
        let matches = 0;
        $("#towns li").each((index, item) => {
            if (item.textContent.includes(searchText)) {
                $(item).css("font-weight", "bold");
                matches++;
            } else
                $(item).css("font-weight", "");
        });
        $('#result').text(matches + " matches found.");
    }
}