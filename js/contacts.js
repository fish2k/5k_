var addressButton = $('.addr-map-button');

var myCollection = [];
ymaps.ready(function () {
    // var city_coords_1 = $('input[name="city_coords_1"]').val();
    // var city_coords_2 = $('input[name="city_coords_2"]').val();

    var contactMap = new ymaps.Map('contactMap',  {
        center: [55.797211, 49.157461],
        zoom: 11,
        // controls: ['zoomControl'],
        // behaviors: ['drag','ScrollZoom']
    });

    var city_id = $('input[name="city_id"]').val();

    $.ajax({
        //type: "POST",
        //url: '/ajax/get-offices?city_id='+city_id,
        url: '/5k_/city.json',
        data: ({}),
        dataType: 'json',
        complete:function(){},
        success: function (response) {
            var data = response;
            //console.log(response);
            var getOffices = data.offices;
            getOffices.forEach(function(key) {
                //console.log(key);
                var point = new ymaps.Placemark([key.pt1, key.pt2],{
                    key_my:key.id,
                    addr:key.addr,
                    id:key.id,
                    sh:key.pt1,
                    d:key.pt2,
                },{
                    iconLayout: "default#image",
                    iconImageHref: key.register_enabled ? "/5k_/images/5k-blue.svg" : "/5k_/images/5k-red.svg",
                    iconImageSize: [21, 21],
                    iconImageOffset: [0, 0],

                });
                myCollection.push(point);
                window.addEventListener("resize", function() {
                    return contactMap.container.fitToViewport()
                });

                $('.contacts-addr-list').append([
                    `<div class="contacts-addr-item addr-item" data-city-id="${key.id}">
                        <div class="contacts-addr-name">${key.addr}</div>
                        <div class="contacts-addr-btns">
                            <div class="contacts-addr-button button-tel"></div>
                            <div class="contacts-addr-button"></div>
                        </div>
                    </div>`
                ]);

                point.events.add("click", function(e) {
                    window.activeMapMark && window.activeMapMark.options.set({
                        iconImageSize: [21, 21],
                        iconImageOffset: [0, 0]
                    });
                        window.activeMapMark = point;
                        // перехват точки по ключу key.addr
                        $('.addr-map-city').text(key.addr);
                        addressButton.removeClass('disabled');
                        addressButton.attr('data-id',key.id);

                        $('.addr-step-1').addClass('active');
                        $('.addr-step-2').removeClass('active');

                        $('.contacts-addr-item').removeClass('active');
                        $('.contacts-addr-item[data-city-id="' + key.id + '"]').addClass('active')

                        $('.contacts-addr-list').stop()
                            .animate({
                                scrollTop: 0
                            }, 0)
                            .animate({
                                scrollTop: $('.addr-item.active').position().top
                            }, 500);

                        $('.dg-link').attr('href', 'https://2gis.ru/kazan/search/' + key.addr + ',' + response.name)
                        $('.gg-link').attr('href', 'https://google.ru/maps/place/' + key.addr + ',' + response.name)
                        $('.ym-link').attr('href', 'https://yandex.ru/maps/43/kazan/?mode=search&source=morda&text='+ key.addr + ',' + response.name)

                    point.options.set({
                        iconImageSize: [35, 35],
                        iconImageOffset: [-7, -7]
                    });
                });
                key.pt1 && key.pt2 && contactMap.geoObjects.add(point)
            })
        },
    });

    $(document).on('click', '.contacts-addr-item.addr-item', function () {
        var th = $(this);
        var city_id = th.attr('data-city-id');
        var addr = th.attr('data-city-id');


        for (let value of myCollection) {
            if (city_id == value.properties.get('key_my')){
                window.activeMapMark && window.activeMapMark.options.set({
                    iconImageSize: [21, 21],
                    iconImageOffset: [0, 0]
                });
                window.activeMapMark = value;
                // перехват точки по ключу key.addr
                $('.addr-map-city').text(value.properties.get('addr'));
                addressButton.removeClass('disabled');
                addressButton.attr('data-id',value.properties.get('addr'));

                $('.addr-step-1').addClass('active');
                $('.addr-step-2').removeClass('active');

                $('.contacts-addr-item').removeClass('active');
                $('.contacts-addr-item[data-city-id="' + value.properties.get('id') + '"]').addClass('active')

                $('.dg-link').attr('href', 'https://2gis.ru/kazan/search/' + value.properties.get('addr'))
                $('.gg-link').attr('href', 'https://google.ru/maps/place/' + value.properties.get('addr'))
                $('.ym-link').attr('href', 'https://yandex.ru/maps/43/kazan/?mode=search&source=morda&text='+ value.properties.get('addr'))

                value.options.set({
                    iconImageSize: [35, 35],
                    iconImageOffset: [-7, -7]
                });

                contactMap.setCenter([value.properties.get('sh'), value.properties.get('d')]);
            }
        }


        return false;
    });
});

addressButton.click(function () {
    $(this).addClass('disabled');

    $('.addr-step-1').removeClass('active');
    $('.addr-step-2').addClass('active');
});

