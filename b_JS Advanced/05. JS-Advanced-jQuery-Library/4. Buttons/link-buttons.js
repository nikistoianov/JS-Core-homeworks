function attachEvents() {
    $('a.button').on('click', buttonClicked);
    function buttonClicked() {
        var button = $(this)
        var buttonClass = button.attr("class")
        if (buttonClass === "button selected"){
            $(this).removeClass('selected');
        } else {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    }
}
