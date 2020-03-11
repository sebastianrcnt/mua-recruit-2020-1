$(document).ready(function () {
  // video-team 숨기기
  $('.form-group.video-team').toggle();

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
  $('#save-application').on('click', function() {
    // validation
    var request = parse();
    if (!(request.email && request.password && request.name && request.major && request.phone && request.field && request.introduction && request.avtime)) {
      alert('항목을 빠짐없이 작성해주세요!')
      return;
    }

    $.ajax({
      url: "http://localhost:2020/api/applications/",
      data: request,
      method: 'POST'
    })
    .done(function(response) {
      alert('성공적으로 등록되었습니다')
    })
    .fail(function(xhr) {
      alert('실패했습니다. ' + xhr.responseText)
    })


  })
})

function parse() {
  var data = {};
  data.email = $('#email').val()
  data.password = $('#password').val()
  data.name = $('#name').val()
  data.major = $('#major').val();
  data.phone = $('#phone').val();

  data.field = []
  if($('#vocal').hasClass('field-active')) {
    data.field.push('vocal')
  }
  if($('#guitar').hasClass('field-active')) {
    data.field.push('guitar')
  }
  if($('#keyboard').hasClass('field-active')) {
    data.field.push('keyboard')
  }
  if($('#percussion').hasClass('field-active')) {
    data.field.push('percussion')
  }
  if($('#videoteam').hasClass('field-active')) {
    data.field.push('videoteam')
  }

  data.introduction = $('#introduction').val();
  data.videolink = $('#videolink').val();

  data.avtime = [];
  var avtimeElements = document.querySelectorAll('.avtime:not(.avtime-not)')

  avtimeElements.forEach(function(element) {
    var time = element.getAttribute('data-time');
    data.avtime.push(time);
  })

  return data
}