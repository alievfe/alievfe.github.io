$(function () {
    $('.coverimg').addClass('spin-begin')
    $('.coverbox').on('click', function(){
        $(this).css('opacity','1')
        setTimeout(animationlogin, 1510)
    })

    let user = [
        {
            name: 'root',
            password: '1234'
        }
    ]
    let userlogin = $.cookie('userlogin')
    if (userlogin) {
        $('input#username').val(userlogin.split('&')[0].split('=')[1])
        $('input#password').val(userlogin.split('&')[1].split('=')[1])
    }
    $('#f0').on('submit', function (e) {
        e.preventDefault()
        let data = $('#f0').serialize();
        let username = data.split('&')[0].split('=')[1]
        let password = data.split('&')[1].split('=')[1]
        if (username === user[0].name && password === user[0].password) {
            $.cookie('userlogin', data, { expires: 7, path: '/' });
            location.href = './home.html'
        }
    })

    function animationlogin() {
        $('.coverimg, .coverbox').css({display: 'none'})
        $('.login').css({
            display: 'block',
            animation: 'animMoveDown 1s'
        })
        let allToAnimation = $('.login').find('*').not('.leftimg')
        allToAnimation.css('opacity', '0')
        allToAnimation.css('position', 'relative')
        //animation
        let piMax = allToAnimation.length;
        let pi = 0;
        let timer = setInterval(function () {
            allToAnimation.eq(pi).css({
                opacity: 1,
                animation: 'animMoveDownFast 1s',
            });
            pi++;
            if (pi === piMax) {
                clearInterval(timer);
            }
        }, 30);
    }
})