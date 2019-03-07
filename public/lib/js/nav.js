$(document).ready(function() {
	$('.inactive').click(function() {
		if ($(this).siblings('ul').css('display') == 'none') {
			$(this).addClass('inactives');
			$(this).siblings('ul').slideDown(100);

			$(this).parents('li').siblings('li').children('a').removeClass('inactives');
			$(this).parents('li').siblings('li').children('a').next().css('display', 'none');

		} else {
			$(this).removeClass('inactives');
			$(this).siblings('ul').slideUp(100);
		}
	})
});