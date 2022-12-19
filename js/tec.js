$(function () {

    $('.pannel').css({
        opacity: 0
    });
    let flag = [1, 1, 1, 1];
    $(window).scroll(function () {
        $(".pannel").each(function (i, e) {
            if (flag[i] && $(document).scrollTop() + 600 >= $(e).offset().top) {
                $('.pannel').eq(i).css({
                    opacity: 1,
                    animation: 'animMoveDown .6s',
                });
                flag[i] = 0;
            }
            if ($(document).scrollTop() + 100 >= $(document).height() - $(window).height()) {
                flag[3] = 0;
                $('.pannel').eq(3).css({
                    opacity: 1,
                    animation: 'animMoveDown .6s',
                });
            }
        })
    })
    $(document).scrollTop(1)

})