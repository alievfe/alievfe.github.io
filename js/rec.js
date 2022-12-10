$(function(){
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
})