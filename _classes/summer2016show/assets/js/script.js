$(document).ready(function() {
  setTimeout(function() {
    blink();
    function blink() {
      $('body > .header .title span:nth-child(1)').fadeIn(1000).delay(2000).fadeOut(1000, function() {
        $('body > .header .title span:nth-child(2)').fadeIn(1000).delay(2000).fadeOut(1000, function() {
          blink();
        });
      });
    }
    $('body > .header').on('click', function() {
      setTimeout(function() {
        $('body').removeClass('fixed');
        $('body > .header').fadeOut(1000);
      }, 1000);
    });
  }, 2000);
  $('.power').each(function() {
    $(this).css('animation-duration', Math.floor(Math.random() * 5000) + 1000 + 'ms');
  });
  $('.nav a[href*=\\#]').on('click', function(e) {     
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 'slow');
  });
  $(window).scroll(function() {
    if ($(window).scrollTop() >= $(window).height() / 2) {
      $('.gradient').fadeIn(1000);
    } else {
      $('.gradient').hide(0);
    }
  });
});