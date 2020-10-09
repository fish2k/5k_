$(document).ready(function () {

    $('#selectDate').datepicker({
        classes: 'custom-picker',
        onSelect: function (formattedDate, date, inst) {
            $('.addr-map-time').addClass('active')
            $('.addr-day').text(formattedDate)
            $('.select-time').removeClass('disabled')
        }
    })

    $('.addr-service-item-btn').click(function () {
        $('.addr-service-item-btn').removeClass('active');
        $(this).addClass('active');
        
        $('.addr-srv, .srv-selected').text($(this).text());
        $('.select-srv').removeClass('disabled')
    })

    $('.select-srv').click(function () {
        $('.addr-bar-step-0').removeClass('active')
        $('.addr-service').removeClass('active')
        $('.addr-bar-step-1, .addr-map-select').addClass('active')
        $('.app-step-2').addClass('active')

        ymaps.ready(function () {
            var cartMap = new ymaps.Map('addSelectPoint',  {
                center: [55.797211, 49.157461],
                zoom: 11,
                controls: [],
                behaviors: ['drag']
            })
    
            // var t = new ymaps.control.Button({
            //     data: {
            //         content: ""
            //     },
            //     options: {
            //         layout: ymaps.templateLayoutFactory.createClass('<div class="custom-layout">1</div>')
            //     }
            // });
    
            $.ajax({
                url: '/5k_/city.json'
            }).done(function (data) {
                //console.log(data);
                var getOffices = data.offices;
    
                getOffices.forEach(function(key) {
                    var point = new ymaps.Placemark([key.pt1, key.pt2],{},{
                        iconLayout: "default#image",
                        iconImageHref: key.register_enabled ? "/5k_/images/5k-blue.svg" : "/5k_/images/5k-red.svg",
                        iconImageSize: [21, 21],
                        iconImageOffset: [0, 0]
                    });
                    window.addEventListener("resize", function() {
                        return cartMap.container.fitToViewport()
                    });
                    
                    point.events.add("click", function(e) {
                        window.activeMapMark && window.activeMapMark.options.set({
                            iconImageSize: [21, 21],
                            iconImageOffset: [0, 0]
                        }),
                        window.activeMapMark = point,
                        
                        // перехват точки по ключу key.addr
                        $('.addr-map-city, .point-city, .final-city').text(key.addr);
                        $('.select-point').removeClass('disabled')
    
                        point.options.set({
                            iconImageSize: [35, 35],
                            iconImageOffset: [-7, -7]
                        }),
                        $(".custom-layout").animate({
                            opacity: "1",
                            "margin-right": "20px"
                        }, "slow")
                    }),
                    key.pt1 && key.pt2 && cartMap.geoObjects.add(point)
                })
            })
        })
    })

    $('.select-point').click(function () {
        $('.addr-bar-step-1, .addr-map-select').removeClass('active')
        $('.addr-overlay, .addr-bar-step-2, .app-step-3, .addr-date').addClass('active')
    })

    $('.addr-map-change-point').click(function () {
        $('.addr-bar-step-1, .addr-map-select').addClass('active')
        $('.addr-bar-step-2, .app-step-3, .addr-date').removeClass('active')
        $('.app-step-2').find('.app-step-name').text('Выберите точку обслуживания')
    });

    $('.select-time').click(function () {
        $('.addr-bar-step-2').removeClass('active')
        $('.addr-bar-step-3').addClass('active')
        $('.addr-date').removeClass('active')
        $('.addr-time').addClass('active')

        //$('.addr-')
    })

    $('.addr-map-change-date').click(function () {
        $('.addr-bar-step-3').removeClass('active')
        $('.addr-bar-step-2').addClass('active')
        $('.addr-date').addClass('active');
        $('.addr-time').removeClass('active');
    })

    $('.addr-time-item').click(function () {
        $('.addr-time-item').removeClass('active')
        $(this).addClass('active')
        $('.addr-time-get').text(`в ${$(this).text()}`)
        $('.app-step-3').find('.app-step-name').text(`${$('.addr-day').eq(0).text()} в ${$(this).text()}`)
        $('.get-time').removeClass('disabled')
    })

    $('.get-time').click(function () {
        $('.addr-bar-step-3').removeClass('active')
        $('.addr-bar-step-4').addClass('active')

        $('.app-step-4').addClass('active')

        $('.addr-time').removeClass('active')
        $('.addr-collectData').addClass('active')
    })

    $('.zapisForm').submit(function (event) {
        event.preventDefault();

        $('.addr-bar-step-4').removeClass('active')
        $('.addr-bar-step-5').addClass('active')
        $('.addr-collectData').removeClass('active')

        $('.zapis-name').text($('#zapisName').val())

        $('.addr-success').addClass('active')
        $('.app-zapis').addClass('success')

        $('.app-step-4').find('.app-step-name').text('Запись подтверждена!')
    })

})