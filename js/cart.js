$(document).ready(function() {
    var delay = 400,
        title = $(".section-heading");

    function toTop() { $("body, html").animate({scrollTop: 0}, delay) }

    $(".cart-order-button").click(function () {
        $(".order-step-1").fadeOut(delay);
        toTop();

        var step2 = setTimeout(() => {
            $(".order-step-2").fadeIn(delay);
            title.text("Оформление заказа");

            clearTimeout(step2);
        }, delay);
    });

    $(".gotocart").click(function () {
        $(".order-step-2").fadeOut(delay);
        toTop();

        var step1 = setTimeout(() => {
            $(".order-step-1").fadeIn(delay);
            title.text("Корзина");

            clearTimeout(step1);
        }, delay);
    });

    $(".order-button").click(function (e) {
        e.preventDefault();

        toTop();
        $(".order-step-2").fadeOut(delay);

        var step3 = setTimeout(() => {
            $(".order-step-3").fadeIn(delay);
            title.text("Заказ №156498");
            title.addClass('heading-success')

            clearTimeout(step3);
        }, delay);
    })

    ymaps.ready(function () {
        var cartMap = new ymaps.Map('cartMap',  {
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
            url: '/5_koleso/city.json'
        }).done(function (data) {
            //console.log(data);
            var getOffices = data.offices;

            getOffices.forEach(function(key) {
                var point = new ymaps.Placemark([key.pt1, key.pt2],{},{
                    iconLayout: "default#image",
                    iconImageHref: key.register_enabled ? "/5_koleso/images/5k-blue.svg" : "/5_koleso/images/5k-red.svg",
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
                    $('.cart-map-city').text(key.addr);
                    $('.cart-map-button').removeClass('btn-disabled')
                    $('.cart-map-button').addClass('button-red')

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

    $('.cart-map-button').click(function () {
        $(this).text('Выбрано');
        $(this).addClass('btn-disabled')
    })
});