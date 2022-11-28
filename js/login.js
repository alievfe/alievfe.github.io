$(function () {
    let allToAnimation = $('.login').find('*').not('span')
    allToAnimation.css('opacity','0')
    allToAnimation.css('position','relative')
    //animation
    let piMax = allToAnimation.length;
    let pi = 1;
    allToAnimation.eq(0).css({
        opacity: 1,
        animation: 'animMoveDown 0.4s',
    });
    let timer = setInterval(function () {
        allToAnimation.eq(pi).css({
            opacity: 1,
            animation: 'animMoveDown 0.4s',
        });
        pi++;
        if (pi === piMax) {
            clearInterval(timer);
        }
    }, 60);

    let user = [
        {
            name: 'root',
            password: '1q2w3e4r'
        }
    ]
    // console.log($.cookie('userlogin'));
    let userlogin = $.cookie('userlogin')
    if(userlogin){
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
            location.href= './index.html'
        }
    })

})