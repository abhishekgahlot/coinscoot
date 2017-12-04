const initSubMenu = () => {
  var subMenu = $('#app_main-menu-wrapper .nav');
  $(subMenu).navgoco({caretHtml: false, accordion: true});
};
const closeOpenState = () => {
  $('#app_sidebar-left').on('mouseleave', function() {
    if ($('body.app_sidebar-menu-collapsed').length > 0) {
      $('.nav-dropdown').each(function() {
        if ($(this).hasClass('open') && !$(this).hasClass('active')) {
          $(this).removeClass('open');
          $(this).children('.nav-sub').removeAttr("style");
        }
      });
			if($('#profile-menu').length > 0 && $('#profile-menu').hasClass('open')){
				$('#profile-menu').removeClass('open');
				$('#profile-menu .submenu').css({'display':'none'})
			}
    }
  });
};
const switchMenuState = () => {
  var $body = $('body');
	var $html = $('html');
  if ($(window).width() < 1280 && !$html.hasClass('backdrop-open')) {
    $body.removeClass('app_sidebar-menu-collapsed');
    $('#content_wrapper').removeClass('toggle-left toggle-right')
  } else if (!$html.hasClass('backdrop-open')){
    $body.removeClass('app_sidebar-left-open');
  }
};
const menuIconState = (element) => {
  //Left Menu
  if (element.context.dataset.toggleState === 'app_sidebar-menu-collapsed') {
    if ($('body.app_sidebar-menu-collapsed').length > 0) {
      $('#app_topnavbar-wrapper .menu-icon a').addClass('is-active');
    } else {
      $('#app_topnavbar-wrapper .menu-icon a').removeClass('is-active');
    };
  };
  //Right Menu
  if (element.context.dataset.toggleState === 'sidebar-overlay-open') {
    if ($('body.sidebar-overlay-open').length > 0) {
      $('[data-toggle-state="sidebar-overlay-open"] i').toggleClass('mdi-playlist-plus mdi-playlist-minus');
    } else {
      $('[data-toggle-state="sidebar-overlay-open"] i').toggleClass('mdi-playlist-minus mdi-playlist-plus');
    };
  }
};
const openProfile = () =>{
	$('[data-toggle-profile]').on('click',function(){
		$('#profile-menu').slideToggle();
	});
}
const openProfileMenu = () => {
  $('[data-profile="open-menu"]').on('click', function() {
    $(this).parents('#profile-menu').toggleClass('open').find('.submenu').slideToggle();
  });
}
const openThemeSettingPanel = () => {
  $('[data-trigger="sidebar-overlay-open"]').on('click', function(e) {
    e.stopPropagation();
    $('[data-toggle-state="sidebar-overlay-open"]').trigger('click');
    $('a[href="#sidebar_settings"]').trigger('click');
  });
};
export {
  initSubMenu,
  closeOpenState,
  switchMenuState,
  menuIconState,
	openProfile,
  openProfileMenu,
  openThemeSettingPanel
}
