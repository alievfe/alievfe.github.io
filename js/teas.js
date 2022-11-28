$(function () {
    let piMax = $('.pannel').length
    let pi = 1
    $('.pannel').eq(0).css({
        opacity: 1,
        animation: 'animMoveDown 0.5s',
    });
    let timer = setInterval(function () {
        $('.pannel').eq(pi).css({
            opacity: 1,
            animation: 'animMoveDown 0.5s',
        });
        pi++;
        if (pi === piMax) {
            clearInterval(timer);
        }
    }, 200);
    //常驻的document点击，关闭所有面板
    $(document).click(function (e) {
        $(".tea").each(function(index, item){
            if ($(item).hasClass("current")){
                $('.tea').eq(index).click();
            }
        })
    })
    //每一种茶叶面板的点击
    $('.tea').click(function (e) {
        e.stopPropagation();
        let selected;
        if ($(this).hasClass("current"))
            selected = 0;
        else
            selected = 1;

        if (selected) {
            $(this).children('.detailCat').stop().slideDown();

            $(this).addClass("current");
            $(this).siblings(".tea").removeClass("current").children('.detailCat').stop().slideUp();
        } else {
            $(this).removeClass("current");
            $(this).children('.detailCat').stop().slideUp();
        }
    })
    $('.oneCat').click(function(e){
        e.stopPropagation();
    })
})
