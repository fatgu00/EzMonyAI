const app = window.Telegram.WebApp;
app.ready()
app.expand();
app.isVerticalSwipesEnabled = false;

$(document).ready(function(){
  $('.go-menu').on('click', function(){
    var prev_app = $('.app-container.active');
    // var next_app = $(this).attr('data-prev');
    toggle_app(prev_app, 'main_menu_container');
  });
  $('.instruction-app').on('click', function(){
    var prev_app = $('.app-container.active');
    toggle_app(prev_app, 'instruction_container')
  });
  $('.mines-start-app').on('click', function(){
    var prev_app = $('.app-container.active');
    toggle_app(prev_app, 'mines_menu_container')
  });
  $('.mines-app').on('click', function(){
    var prev_app = $('.app-container.active');
    $('.mines_field_cell').removeClass('star').html('');
    toggle_app(prev_app, 'mines_app_container')
  });
  $('.mines-app-get-signal').on('click', function(){
    var this_btn = $(this);
    if (!this_btn.hasClass('disabled')){
      this_btn.addClass('disabled');
      var field = $('#mines_field');
      var field_cells = field.find('.mines_field_cell');
      field_cells.removeClass('star').html('');

      var star =
      '<svg width="64" height="60" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">'+
        '<path d="M14.0722 38.6162C14.1225 38.6666 14.1729 38.7673 14.1225 38.8177L11.5528 54.0346C11.2001 56.1005 11.5024 57.8136 12.359 58.8717C12.9636 59.5772 13.8202 59.9299 14.8783 59.9299C15.8861 59.9299 17.0954 59.5772 18.355 58.9221L32.0099 51.7168C32.0603 51.6664 32.1611 51.6664 32.2618 51.7168L45.9167 58.8717C47.1764 59.5268 48.3353 59.8795 49.343 59.8795C50.4011 59.8795 51.2577 59.5268 51.8624 58.8214C52.719 57.8136 53.0213 56.1004 52.6182 53.9842L49.9477 38.7673C49.9477 38.6666 49.9477 38.6162 49.9981 38.5658L61.0328 27.783C62.8467 26.0194 63.6025 24.2055 63.0987 22.7443C62.5948 21.2327 60.932 20.2249 58.4631 19.8722L43.1958 17.7056C43.095 17.7056 43.0447 17.6552 42.9943 17.5544L36.1416 3.7484C35.0331 1.48099 33.5215 0.221313 31.9595 0.221313C30.3975 0.221313 28.9363 1.48099 27.7774 3.7484L20.9752 17.6048C20.9248 17.6552 20.8744 17.7056 20.7736 17.756L5.50637 20.0234C2.98702 20.3761 1.37464 21.4342 0.870769 22.8954C0.366899 24.3567 1.1227 26.1202 2.88625 27.8838H2.93663C2.98702 27.8838 2.98702 27.9341 3.03741 27.9845L14.0722 38.6162Z" fill="#FFC52F" stroke="#000000" stroke-width="1"/>'+
      '</svg>';

      var duration = 1000;
      var isset_numbers = [];
      var count_stars = 0;
      for (var i=0; i<5; i++){
        setTimeout(function(){
          var star_cell = Math.floor(Math.random() * 25);
          var isset_star = 1;
          while (isset_star == 1) { // выводит 0, затем 1, затем 2
            if ($.inArray(star_cell, isset_numbers) != -1){
              star_cell = Math.floor(Math.random() * 25);
            } else {
              isset_star = 0;
            }
          }
          isset_numbers.push(star_cell);
          field_cells.eq(star_cell).addClass('star').html(star);
        }, duration*i);
        count_stars++;
      }
      setTimeout(function(){
        this_btn.removeClass('disabled');
      }, duration*5);
    }
  });

  var ts;
  $('.mines_select').bind('touchstart', function (e){
    ts = e.originalEvent.touches[0].clientY;
  });
  $('.mines_select').bind('touchend', function (e){
    var mines_select = $(this);
    var this_scroll_top = mines_select.scrollTop();
    var te = e.originalEvent.changedTouches[0].clientY;

    if (ts > te+5){
      // slide_down();
      var next_item = $('.mines_select_item.active').next();
      this_scroll_top+=62;
      if (next_item.is('div')){
        mines_select.animate({scrollTop: this_scroll_top}, 150, function() {
          $('.mines_select_item').removeClass('active');
          next_item.addClass('active');
        });
      }
    } else if (ts < te-5){
      // slide_up();
      var prev_item = $('.mines_select_item.active').prev();
      this_scroll_top-=62;
      if (prev_item.is('div')){
        mines_select.animate({scrollTop: this_scroll_top}, 150, function() {
          $('.mines_select_item').removeClass('active');
          prev_item.addClass('active');
        });
      }
    }
  });
  $('.mines_select').bind('mousewheel', function(e){
    var mines_select = $(this);
    var this_scroll_top = mines_select.scrollTop();
    var wheelDelta = (e.originalEvent.wheelDelta /120) * -1;

    if (wheelDelta > 0) {
      // scrolling up
      var next_item = $('.mines_select_item.active').next();
      this_scroll_top+=62;
      if (next_item.is('div')){
        mines_select.animate({scrollTop: this_scroll_top}, 150, function() {
          $('.mines_select_item').removeClass('active');
          next_item.addClass('active');
        });
      }
    } else {
      // scrolling down
      var prev_item = $('.mines_select_item.active').prev();
      this_scroll_top-=62;
      if (prev_item.is('div')){
        mines_select.animate({scrollTop: this_scroll_top}, 150, function() {
          $('.mines_select_item').removeClass('active');
          prev_item.addClass('active');
        });
      }
    }
  });

  $('.luckyjet-start-app').on('click', function(){
    var prev_app = $('.app-container.active');
    toggle_app(prev_app, 'luckyjet_container')
  });
  $('.luckyjet-app').on('click', function(){
    var prev_app = $('.app-container.active');
    // $('.mines_field_cell').removeClass('star').html('');
    toggle_app(prev_app, 'luckyjet_app_container')
    $(".luckyjet_field").html('x00.00');
  });

  $('.luckyjet-app-get-signal').on('click', function(){
    var this_btn = $(this);
    if (!this_btn.hasClass('disabled')){
      this_btn.addClass('disabled');

      var rand_range = (Math.random() * 10).toFixed(2);
      if (rand_range == 10){
        var rand_num = (Math.random() * (24.99 - 16) + 16).toFixed(2);
      }
      if (rand_range > 8 && rand_range < 10){
        var rand_num = (Math.random() * (15.99 - 10) + 10).toFixed(2);
      }
      if (rand_range > 1 && rand_range <= 8){
        var rand_num = (Math.random() * (9.99 - 1) + 1).toFixed(2);
      }
      if (rand_range <= 1){
        var rand_num = (Math.random() * (0.99 - 0.01) + 0.01).toFixed(2);
      }


      $({numberValue: 0}).animate({numberValue: rand_num}, {
  			duration: 3000,
  			easing: "linear",
  			step: function(rand_num) {
          var number_round = rand_num.toFixed(2);
          if (number_round < 10){ number_round = '0'+number_round; }
          var number_str = 'x'+number_round;
  				$(".luckyjet_field").html(number_str);
  			}
  		});

      setTimeout(function(){
        this_btn.removeClass('disabled');
      }, 3000);
    }
  });

  $('.coinflip-start-app').on('click', function(){
    var prev_app = $('.app-container.active');
    toggle_app(prev_app, 'coinflip_app_container');
    $('.coin').removeClass('dollar').removeClass('euro');
  });

  $('.coinflip-app-get-signal').on('click', function(){
    var this_btn = $(this);
    if (!this_btn.hasClass('disabled')){
      this_btn.addClass('disabled');
      $('.coin').removeClass('dollar').removeClass('euro');

      var rand_num = Math.floor(Math.random() * 2);
      $('.coin').addClass('anim');
      setTimeout(function(){
        $('.coin').removeClass('anim');
        if (rand_num == 0){ $('.coin').addClass('dollar'); }
        if (rand_num == 1){ $('.coin').addClass('euro'); }

        this_btn.removeClass('disabled');
      }, 3000);
    }
  });
})
function toggle_app(prev_app, next_app){
  var next_app = $('.'+next_app);
  prev_app.css({'transition':'0.25s'});
  prev_app.css({'opacity':'0'});
  setTimeout(function(){
    prev_app.removeClass('active');
    prev_app.css({'transition':'', 'opacity':''});

    next_app.css({'opacity':'0'}).css({'transition':'0.25s'});
    next_app.addClass('active');

    next_app.css({'opacity':'1'});
    setTimeout(function(){
      next_app.css({'transition':'', 'opacity':''});
    }, 250);
  }, 250);



}
