$(document).ready(function() {
  var images = new Array ('images/sfpc1.svg', 'images/sfpc2.svg');
  var index = 1;
  function rotateImage() {
    $('.logo').fadeOut('fast', function() {
      $(this).attr('src', images[index]);
      $(this).fadeIn('fast', function() {
        if (index == images.length-1) {
          index = 0;
        } else {
          index++;
        }
      });
    });
  } 
  setInterval(rotateImage, 3000);

  $('.header').click(function() {
    $(this).fadeOut('fast');
    $('.audio-player').fadeIn('fast');
  })
  $('.power').each(function() {
    $(this).css({'animationDelay': Math.random() * .1 + 's'});
  })
  $('.popup').keyup(function(k) {
    if (k.which == 27) {
      $(this).fadeOut('fast');
      $('.button-return').hide();
      $('iframe').each(function() {
        $(this).attr('src', $(this).attr('src'));
      });
    }
  });
  $('#sfpc').click(function() {
    $('#popup-sfpc').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#summer').click(function() {
    $('#popup-summer').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#showcase').click(function() {
    $('#popup-showcase').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#location').click(function() {
    $('#popup-location').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#date').click(function() {
    $('#popup-date').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  /*Artists*/
  $('#brandon').click(function() {
    $('#popup-brandon').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#carmen').click(function() {
    $('#popup-carmen').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#elite').click(function() {
    $('#popup-elite').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#guhong').click(function() {
    $('#popup-guhong').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#helene').click(function() {
    $('#popup-helene').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#jonathan').click(function() {
    $('#popup-jonathan').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#krista').click(function() {
    $('#popup-krista').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#matthew').click(function() {
    $('#popup-matthew').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#max').click(function() {
    $('#popup-max').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#meina').click(function() {
    $('#popup-meina').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#melanie').click(function() {
    $('#popup-melanie').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#nahee').click(function() {
    $('#popup-nahee').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  $('#oren').click(function() {
    $('#popup-oren').fadeIn('fast');
    $('.button-return').fadeIn('fast');
  })
  /*button-return*/
  $('.popup').click(function() {
      $(this).fadeOut('fast');
      $('.button-return').fadeOut('fast');
      $('iframe').each(function() {
        $(this).attr('src', $(this).attr('src'));
      });
    })
  $('.button-return').click(function() {
    $(this).hide()
    $('.popup').fadeOut('fast');
    $('iframe').each(function() {
      $(this).attr('src', $(this).attr('src'));
    });
  })
  $('.button-blue').click(function() {
    $('.power').toggleClass('paused');
    $('.button-return').toggleClass('paused');
    $('body').toggleClass('background-blue');
  });
  $(".button-on-off").click(function() {
    $('.power').toggleClass('paused');
    $('.button-return').toggleClass('paused');
  });
  /*D-DAY*/
  var now = new Date();
  var then = new Date('Aug 5, 2016');
  var gap = now.getTime() - then.getTime();
  gap = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
  $('.d-day').text(gap);
});