jQuery(document).ready(function(){

	jQuery('.show_nav').click(function() {
		jQuery('.nav_top').slideToggle(100);
		jQuery(this).toggleClass('open');
		return false;
	});



	jQuery('.mashink_show').click(function() {
		jQuery('.mashink_mod').hide(100);
		jQuery(this).next('.mashink_mod').fadeToggle(100);
		jQuery(this).toggleClass('open');
		jQuery('.home_top_m').toggleClass('open');
		return false;
	});
	jQuery('.mashink_close').click(function() {
		jQuery('.mashink_mod').hide(100);
		jQuery('.mashink_show').removeClass('open');
		jQuery('.home_top_m').removeClass('open');
		return false;
	});



	if (typeof cdd !=="undefined"){
		jQuery("#countdown").countdown({
			date: cdd,
			format: "on"
		});
	}



	jQuery('input, select').styler();



	jQuery('.rews_slider').slick({
		dots: true,
		arrows: false,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 760,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});



    jQuery(window).scroll(function () {
        var s = jQuery(window).scrollTop();
        if (s > 150 && !jQuery('.popup_header').hasClass('visible'))
            jQuery('.popup_header').addClass('visible');
        else if (s <= 150 && jQuery('.popup_header').hasClass('visible'))
            jQuery('.popup_header').removeClass('visible');
    }).scroll();



	jQuery('.errs_lists').on( "click", ".errs_cod", function() {
		jQuery('.errs_mod').hide(100);
		jQuery(this).next('.errs_mod').fadeToggle(100);
		jQuery(this).toggleClass('open');
		return false;
	});
	jQuery('.errs_lists').on( "click", ".errs_mod_close", function() {
		jQuery('.errs_mod').hide(100);
		jQuery('.errs_cod').removeClass('open');
		return false;
	});


	jQuery(document).on('change','#errs_brend select', function(){
		var parentCat=jQuery(this).val();
		jQuery.ajax({
			url:"/wp-admin/admin-ajax.php",
			type:'POST',
			data:'action=ajax_mod_action&parent_cat_ID=' + parentCat,
			success:function(results)
			{
				jQuery("#errs_mod").html(results);
				jQuery('#errs_mod select').styler();
			}
		});

		var data2 = {
			'action': 'workinc',
			'cat' : parentCat
		};
		jQuery.ajax({
			url: '/wp-admin/admin-ajax.php',
			data: data2,
			type:'POST',
			success:function(data){
				if( data ) {
					jQuery('.errs_lists').html(data);
				}
			}
		});
	});


	jQuery('.bot_text').detach().appendTo('#bot_text');

	jQuery('.bot_text_more a').click(function() {
		jQuery('.bot_text_hide').addClass('open');
		jQuery('.bot_text_more').hide();
		return false;
	});



	jQuery(document).click( function(event){
		if(jQuery(event.target).closest('.errs_mod').length) {
			return;
		} else {
			jQuery('.errs_mod').fadeOut(100);
			jQuery('.errs_cod').removeClass('open');
			event.stopPropagation();
		}
		if(jQuery(event.target).closest('.mashink_mod').length) {
			return;
		} else {
			jQuery('.mashink_mod').fadeOut(100);
			jQuery('.mashink_show').removeClass('open');
			jQuery('.home_top_m').removeClass('open');
			event.stopPropagation();
		}
	});



	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 500) {
			jQuery('#back_top').fadeIn();
		} else {
			jQuery('#back_top').fadeOut();
		}
	});
	jQuery('#back_top').click(function () {
		jQuery('body,html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});



	jQuery(document).on('click','a.modal', function(){
		var id = jQuery(this).attr('href');
		var maskHeight = jQuery(document).height();
		var maskWidth = jQuery(document).width();
		var winH = jQuery(window).height();
		var winHt = jQuery(document).scrollTop();
		var modh = jQuery(id).innerHeight();
		var modTitle = jQuery(this).data('title'),
			modButton = jQuery(this).data('button');
		if (modh > winH) {
			jQuery(id).css('top', winHt);
		} else {
			jQuery(id).css('top', winHt + winH/2-modh/2);
		}
		jQuery('.modal_mask').css({'width':maskWidth,'height':maskHeight}).fadeIn(200);
		if(typeof modTitle === "undefined")
			jQuery(id).find('.modal_title').html('Вызвать мастера');
		else
			jQuery(id).find('.modal_title').html(modTitle);
		if(typeof modButton === "undefined")
			jQuery(id).find('[type="submit"]').val('Вызвать мастера');
		else
			jQuery(id).find('[type="submit"]').val(modButton);
		jQuery(id).fadeIn(200);
		return false;
	});

	jQuery('.modal_close, .modal_mask').click(function() {
		jQuery('.modal_mask, .modal_win').hide();
		return false;
	});



	jQuery('a.go_slow, .go_slow a').click(function () { 
		elementClick = this.hash;
		destination = jQuery(elementClick).offset().top;
		jQuery('body,html').animate( { scrollTop: destination }, 300 );
		return false;
	});



	jQuery.fn.getTitle = function() {
		var arr = jQuery('a.fancybox');
		jQuery.each(arr, function() {
			var title = jQuery(this).children('img').attr('title');
			jQuery(this).attr('title',title);
		})
	}
	var thumbnails = 'a:has(img)[href$=".bmp"],a:has(img)[href$=".gif"],a:has(img)[href$=".jpg"],a:has(img)[href$=".jpeg"],a:has(img)[href$=".png"],a:has(img)[href$=".BMP"],a:has(img)[href$=".GIF"],a:has(img)[href$=".JPG"],a:has(img)[href$=".JPEG"],a:has(img)[href$=".PNG"]';
	jQuery(thumbnails).each(function(){
		if(jQuery(this).has('img')) {
			if(jQuery(this).hasClass('fancybox')) {
				jQuery(this).getTitle();
			} else {
				jQuery(this).addClass('fancybox').attr('rel','fancybox').getTitle();
			}
		}
	});  
	jQuery('a.fancybox').fancybox();

	 jQuery('.price_zak .btn, .akciya_go .btn, .top_zoz .btn').mousedown(function(){
		 target = jQuery(this).data('target');
	 });
	 jQuery('.vizov .btn').mousedown(function(){
		 target = jQuery(this).closest('.vizov').data('target');
	 });
	 jQuery('input[type="tel"]').mask('+7 (999) 999-99-99');
});
var target = '';