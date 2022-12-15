$(function () {
  var nowhash
  window.onbeforeunload = function () {
    location.hash = nowhash
  };
  location.hash = '/'
  onHashChange()
  window.addEventListener('hashchange', onHashChange)
  async function onHashChange(e) {
    $(window).unbind('scroll'); 
    //promise版jqueryajax
    const jqAjaxP = params => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: params.url,
          type: params.type || 'get',
          headers: params.headers || {},
          data: params.data || {},
          success(res) {
            resolve(res)
          },
          error(err) {
            reject(err)
          }
        })
      })
    }
    nowhash = location.hash
    const header = await jqAjaxP({ url: '../views/header.ejs' })
    switch (location.hash) {
      case '#/':
        location.hash = '#/login'
        break;
      //登录页
      case '#/login':
        const login = await jqAjaxP({ url: '../views/login.ejs' })
        $('body').html(login)
        $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/login.css">`)
        $('#viewjs').replaceWith(`<script id="viewjs" src="./js/login.js"></script>`)
        break;
      // 主页
      case '#/home':
        $('body').html(header) // 问题，后面每次都要去渲染头？封装一个函数，判断是否为空，为空才渲染
        const home = await jqAjaxP({ url: '../views/home.ejs' })
        //以下到时候也要封装一个函数
        $('#center_body').html(home)
        $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/home.css">`)
        $('#viewjs').replaceWith(`<script id="viewjs" src="./js/home.js"></script>`)
        break;
      case '#/teas':
        $('body').html(header)
        const teas = await jqAjaxP({ url: '../views/teas.ejs' })
        $('#center_body').html(teas)
        $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/teas.css">`)
        $('#viewjs').replaceWith(`<script id="viewjs" src="./js/teas.js"></script>`)
        break;
      case '#/tec':
        $('body').html(header)
        const tec = await jqAjaxP({ url: '../views/tec.ejs' })
        $('#center_body').html(tec)
        $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/tec.css">`)
        $('#viewjs').replaceWith(`<script id="viewjs" src="./js/tec.js"></script>`)
        break;
      case '#/rec':
        $('body').html(header)
        const rec = await jqAjaxP({ url: '../views/rec.ejs' })
        $('#center_body').html(rec)
        $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/rec.css">`)
        $('#viewjs').replaceWith(`<script id="viewjs" src="./js/rec.js"></script>`)
        break;
      case '#/about':
        $('body').html(header)
        const about = await jqAjaxP({ url: '../views/about.ejs' })
        $('#center_body').html(about)
        $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/about.css">`)
        $('#viewjs').replaceWith(`<script id="viewjs" src="./js/about.js"></script>`)
        break;
    }
  }


})

