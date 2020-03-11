var id;
var password;

$(document).ready(function () {
  id = $('#id').attr('value');
  password = $('#password').attr('value')
  var data;

  $.ajax({
    url: `/api/applications?id=${id}&password=${password}`,
    method: 'GET'
  }).done(function (response) {
    render(response)
  }).fail(function (response) {
    alert(response.responseText)
  })

  $('#goto-main').on('click', function () {
    window.location.replace('/recruit/main')
  })

  $('#password').focus(function () {
    $('#password').attr('type', 'text')
  })
  $('#password').focusout(function () {
    $('#password').attr('type', 'password')
  })

  // 지원 영역 선택하기
  $('.mua-select .field-button').on('click', function () {
    $(this).toggleClass('field-active')
    if ($(this).attr('id') == 'videoteam') {
      $('.form-group.video-team').slideToggle({
        duration: 400,
        easing: 'swing'
      })
    }
  })

  // 가능한 시간 선택하기
  $('.avtime').on('click', function () {
    $(this).toggleClass('avtime-not');
    if ($(this).hasClass('avtime-not')) {
      $(this).text('불가')
    } else {
      $(this).text('가능')
    }
  })

  // 요청 보내고 처리하기
  $('#save-application').on('click', function () {
    // validation
    var request = parse();
    if (!(request.email && request.password && request.name && request.major && request.phone && request.field && request.introduction && request.avtime)) {
      alert('항목을 빠짐없이 작성해주세요!')
      return;
    }
    $.ajax({
      url: "/api/applications/",
      data: request,
      method: 'PUT'
    })
      .done(function (response) {
        alert('성공적으로 등록되었습니다')
        window.location.replace(`/recruit/main`)
      })
      .fail(function (xhr) {
        alert(xhr.responseText)
      })
  })

})

function render(data) {
  $('#email').val(data.email)
  $('#name').val(data.name)
  $('#major').val(data.major)
  $('#phone').val(data.phone)

  var fields = data['field[]'];
  if (Array.isArray(fields)) {
    fields.foreach(element => {
      $(`#${element}`).toggleClass('field-active')
    });
  } else {
    $(`#${fields}`).toggleClass('field-active');
  }

  if ($('#videoteam').hasClass('field-active')) {
    $('.form-group.video-team').show();
  } else {
    $('.form-group.video-team').hide();
  }

  $('#introduction').val(data.introduction)
  if (data.videolink) {
    $('#videolink').val(data.videolink)
  }

  var avtimes = data['avtime[]'];
  if (Array.isArray(avtimes)) {
    data['avtime[]'].forEach(element => {
      $(`.avtime[data-time=${element}]`).click();
    })
  } else {
    $(`.avtime[data-time=${avtimes}]`).click();
  }
  $(`.avtime`).click();
}


function parse() {
  var data = {};
  data._id = $('#id').val()
  data.email = $('#email').val()
  data.password = $('#password').val()
  data.name = $('#name').val()
  data.major = $('#major').val();
  data.phone = $('#phone').val();

  data.field = []
  if ($('#vocal').hasClass('field-active')) {
    data.field.push('vocal')
  }
  if ($('#guitar').hasClass('field-active')) {
    data.field.push('guitar')
  }
  if ($('#keyboard').hasClass('field-active')) {
    data.field.push('keyboard')
  }
  if ($('#percussion').hasClass('field-active')) {
    data.field.push('percussion')
  }
  if ($('#videoteam').hasClass('field-active')) {
    data.field.push('videoteam')
  }

  data.introduction = $('#introduction').val();
  data.videolink = $('#videolink').val();

  data.avtime = [];
  var avtimeElements = document.querySelectorAll('.avtime:not(.avtime-not)')

  avtimeElements.forEach(function (element) {
    var time = element.getAttribute('data-time');
    data.avtime.push(time);
  })

  return data
}