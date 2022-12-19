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
    const header = await jqAjaxP({ url: '../views/header.ejs' })
    async function renderBase(target,router){
      if(router !=='login'){
        $('body').html(header)
        $(target).html(`
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
        </div>`)
      }
      const html = await jqAjaxP({ url: `../views/${router}.ejs` })
      $(target).html(html)
      $('#viewstyle').replaceWith(`<link id="viewstyle" rel="stylesheet" href="./css/${router}.css">`)
      $('#viewjs').replaceWith(`<script id="viewjs" src="./js/${router}.js"></script>`)
    }
    nowhash = location.hash
    switch (location.hash) {
      case '#/':
        location.hash = '#/login'
        break;
      case '#/login':
        renderBase('body','login')
        break;
      case '#/home':
        renderBase('#center_body','home')
        break;
      case '#/teas':
        renderBase('#center_body','teas')
        break;
      case '#/tec':
        renderBase('#center_body','tec')
        break;
      case '#/rec':
        renderBase('#center_body','rec')
        break;
      case '#/about':
        renderBase('#center_body','about')
        break;
    }

  }


})

