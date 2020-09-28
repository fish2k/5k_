$(document).ready(function() {
    const body            = $('body'),
          burger          = $('.header-burger')
          overlay         = $('.overlay, .customize-form-close')

    burger.click(function () {
        body.toggleClass('state-nav')
    })

    overlay.on("click", function () {
        body.removeClass("state-nav")
    })
})