class PublicTransportTable {
    constructor(town) {
        $('table caption').text(`${town}'s Public Transport`)
        this.table = $('.vehicles-info')
        let searchBtn = $('.search-btn')
        searchBtn.click(searchClick)

        $('.clear-btn').click(clearClick)

        function searchClick() {
            let cleared = false
            let queryStr = $('[name=\'type\']').val()

            if (queryStr !== ''){

                // $('.vehicles-info tr')
                //     .toArray()
                //     .filter(item => $(item).hasClass('more-info'))
                //     .forEach(item => $(item).remove());

                $('.vehicles-info tr')
                    .toArray()
                    .filter(item => $(item).hasClass('hide-info'))
                    .filter(item => $(item).children('td')[0].innerHTML.indexOf(queryStr) === -1)
                    .forEach(item => item.style.display = "none");
                cleared = true
            }

            queryStr = $('[name=\'name\']').val()

            if (queryStr !== ''){
                if (!cleared) {
                    $('.vehicles-info tr')
                        .toArray()
                        .filter(item => $(item).hasClass('more-info'))
                        .forEach(item => $(item).remove());
                }

                $('.vehicles-info tr')
                    .toArray()
                    .filter(item => $(item).children('td')[1].innerHTML.indexOf(queryStr) === -1)
                    .forEach(item => item.style.display = "none");
            }
        }

        function clearClick() {
            $('[name=\'type\']').val('')
            $('[name=\'name\']').val('')

            $('.vehicles-info tr')
                .toArray()
                .forEach(item => $(item).removeAttr('style'));
        }
    }

    addVehicle(obj){
        // { type: String, name: String, route: String, price: Number, driver: String }
        let veh = $('<tr class="hide-info">').append($('<td>').text(obj.type)).append($('<td>').text(obj.name))
        let button = $('<button>').text('More Info')

        let inf = $('<tr class="more-info">')
            .append($('<td colspan="3">')
                .append($('<table>')
                    .append($('<tr>').append($('<td>').text(`Route: ${obj.route}`)))
                    .append($('<tr>').append($('<td>').text(`Price: ${obj.price}`)))
                    .append($('<tr>').append($('<td>').text(`Driver: ${obj.driver}`)))
                )
            )

        button.click(infoClick)
        veh.append($('<td>').append(button))

        function infoClick() {
            if (this.innerHTML == 'Less Info') {
                hideInfo(this)
            } else {
                showInfo(this)
            }
            console.log($(this));
        }

        function showInfo(context) {
            $(context).text('Less Info')
            inf.insertAfter(veh)
        }

        function hideInfo(context) {
            $(context).text('More Info')
            inf.remove()
        }

        // let data = $('.vehicles-info')
        // console.log(data);
        this.table.append(veh)
    }
}