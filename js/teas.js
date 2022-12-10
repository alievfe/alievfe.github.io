$(function () {
  pannelani()
  load()
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
  // $('.oneCat').click(function (e) {
  //     e.stopPropagation();
  //     $(this).parent('li').siblings('li').children('.oneCat').removeClass('chooseinfo')
  //     $(this).addClass('chooseinfo')
  // })
  
  //点击滑出显示茶简介
  $('#lv, #hong, #bai, #huang').on('click', '.oneCat', function (e) {
    e.stopPropagation();
    $('.chooseinfo').removeClass('chooseinfo')
    $(this).addClass('chooseinfo')
  })
  //阻止a链接冒泡
  $('.oneCat a').click(function (e) {
    e.stopPropagation();
  })
  //点击边上空白，li简介滑回
  $('.detailCat').click(function (e) {
    e.stopPropagation();
    $('.chooseinfo').removeClass('chooseinfo')
  })

  //对select表单的警告
  $("select").change(function () {
    if ($(this).val() != '0')
      $('.warningnull').css('opacity', '0')
    else
      $('.warningnull').css('opacity', '1')

  });

  //表单add
  $('.submit').click(function (e) {
    e.stopPropagation()
    let params = $('#addtea').serializeObject()
    if (params.teacate === '0') {
      $('.warningnull').css('opacity', '1')
      return ''
    }
    if (!params.teaimgurl){
      let timeStamp = new Date().getTime()
      params.teaimgurl = `https://bing.ioliu.cn/v1/rand?time=${timeStamp}`
    }
    let data = getLocalStorage()
    let lastid = local[data.length-1].id
    params.id = lastid+1
    data.push(params)
    saveData(data)
    $('#addtea')[0].reset()
    load()
  })

  //修改
  $('#lv, #hong, #bai, #huang').on('click', 'i.edit', function (e) {
    e.stopPropagation()
    let idToEdit = $(this).attr('data-id')
    let data = getLocalStorage()
    const indexToEdit = data.findIndex(obj => obj.id == idToEdit);
    console.log(data[indexToEdit]);
  })

  //删除
  $('#lv, #hong, #bai, #huang').on('click', 'i.delete', function (e) {
    e.stopPropagation()
    // 小技巧：删除前先隐藏对应元素，可防止重新渲染导致闪动
    $(this).parent('.oneli').hide()
    let idToDelete = $(this).attr('data-id')

    let data = getLocalStorage()
    const indexToDelete = data.findIndex(obj => obj.id == idToDelete);
    data.splice(indexToDelete, 1);
    saveData(data)
    load()
  })

  //保存数据
  function saveData(data) {
    localStorage.setItem('teaproject', JSON.stringify(data))
  }


  //加载数据
  function load() {
    //遍历之前清空
    $('#lv, #hong, #bai, #huang').html('')
    let data
    if (getLocalStorage().length === 0) {
      $.get('../data/teasdata.json', function (rs) {
        saveData(rs)
        load()
        return ''
      })
    }
    data = getLocalStorage()
    $.each(data, function (i, n) {
      $.get('../tpl/teali.ejs', function (rs) {
        let li = ejs.compile(rs)(n)
        switch (n.teacate) {
          case '绿茶':
            $('#lv').append(li)
            break;
          case '红茶':
            $('#hong').append(li)
            break;
          case '白茶':
            $('#bai').append(li)
            break;
          case '黄茶':
            $('#huang').append(li)
            break;
        }
      })
    })
  }

  //读取本地存储
  function getLocalStorage() {
    let data = localStorage.getItem('teaproject')
    if (data !== null) {
      return JSON.parse(data)
    } else {
      return []
    }
  }


  //serializeObject方法序列化表单
  $.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  function pannelani() {
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
      $(".tea").each(function (index, item) {
        if ($(item).hasClass("current")) {
          $('.tea').eq(index).click();
        }
      })
      $('.chooseinfo').removeClass('chooseinfo')
    })
  }
})
