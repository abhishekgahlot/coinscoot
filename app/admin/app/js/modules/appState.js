import {menuIconState} from './sidebars';
import {backDrops} from './backdrops';
//
// Module to toggle state
// ----------------------------------
var toggleState = () => {
	var $toggleElement = $('[data-toggle-state]');
	$('[data-toggle-state]').on('click', function(e) {
		e.stopPropagation();
		var $body = $('body'),
		element = $(this),
		className = element.data('toggleState'),
		key = element.data('key'),
		$target = $body;
		if (className) {
			if ($target.hasClass(className)) {
				$target.removeClass(className);
				if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(min-width: 1280px)')) {
					appConfig.localStorage.set(key, '');
				};
			} else {
				if(className === 'app_sidebar-menu-collapsed' && $('#profile-menu').length > 0 && $('#profile-menu').hasClass('open')){
					$('#profile-menu').removeClass('open');
					$('#profile-menu .submenu').css({'display':'none'})
				}
				$target.addClass(className);
				if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(min-width: 1280px)')) {
					appConfig.localStorage.set(key, className);
				};
			}
		}
		menuIconState(element);
		if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(max-width: 1280px)') || typeof localStorage !== 'undefined' && window.app.persist && className === 'sidebar-overlay-open') {
			backDrops(className, element, $target);
			appConfig.localStorage.set(key, '');
		}
	});
};
var toggleExpand = () => {
	var $toggleExpanded = $('[data-toggle-expand]');
	$toggleExpanded.on('click', function(e) {
		e.stopPropagation();
		var $appWrapper = $('#app_wrapper'),
		element = $(this),
		elementIcon = element.children('i'),
		className = element.data('toggleExpand'),
		key = element.data('key'),
		$target = $appWrapper;
		if (className) {
			if ($target.hasClass(className)) {
				$target.removeClass(className);
					elementIcon.toggleClass('zmdi-fullscreen-exit zmdi-fullscreen');
			} else {
				$target.addClass(className);
					elementIcon.toggleClass('zmdi-fullscreen zmdi-fullscreen-exit');
			}
		}
	});
};
export {toggleState, toggleExpand}
