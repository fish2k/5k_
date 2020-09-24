$(document).ready(function () {

    $('#selectDate').datepicker({
        classes: 'custom-picker',
        onSelect: function (formattedDate, date, inst) {
            $('.addr-map-time').addClass('active')
            $('.addr-day').text(formattedDate)
            $('.select-time').removeClass('disabled')
        }
    })

    $('.select-point').click(function () {
        $('.addr-bar-step-1').removeClass('active')
        $('.addr-overlay, .addr-bar-step-2, .app-step-3, .addr-date').addClass('active')
        $('.app-step-2').find('.app-step-name').text('Горьковское шоссе, 49')
    })

    $('.addr-map-change-point').click(function () {
        $('.addr-bar-step-1').addClass('active')
        $('.addr-overlay, .addr-bar-step-2, .app-step-3, .addr-date').removeClass('active')
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