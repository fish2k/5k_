$(document).ready(function() {
    const body            = $('body'),
          burger          = $('.header-burger'),
          overlay         = $('.overlay'),
          headerMain      = $('.header'),
          headerOffset    = headerMain.innerHeight(),
          headerNavItem   = $('.header-nav-drop')

    headerNavItem.hover(
        function() {
            $(this).addClass('hover')
        },
        function () {
            $(this).removeClass('hover')
        }
    )

    burger.click(function () {
        body.toggleClass('state-nav')
    })

    overlay.on("click", function () {
        body.removeClass("state-nav")
    })

    const responsiveHooks = function (getWidth) {
        // fixed header
        if ( getWidth >= 991 ) {
            $(window).scroll(function () {
                var st = $(this).scrollTop()

                if (st >= headerOffset) {
                    // $('.header-fixed-placeholder').css({
                    //     height: headerOffset + 'px'
                    // })
                    headerMain.addClass('header-fixed')
                } else {
                    // $('.header-fixed-placeholder').css({
                    //     height: 0
                    // })
                    headerMain.removeClass('header-fixed')
                }
            })
        }
    }

    $(window).resize(function () {
        var currentWidth = $(this).innerWidth();

        responsiveHooks(currentWidth)
    });

    responsiveHooks($(this).innerWidth());
})