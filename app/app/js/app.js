/*
*
* MaterialLab
* Author: http://authenticgoods.co
*
*/
//import the JavaScript modules to run
import {toggleState, toggleExpand} from './modules/appState';
import {toggleDrawer} from './modules/drawers';
import {navBarSearch} from './modules/search';
import {
  cardRefresh,
  cardCollapse,
  cardOffCanvas,
  cardTask,
  cardToggleHighlighter,
  cardSearch,
  cardReveal
} from './modules/cards';

import {loadThemes,swapLayoutMode} from './modules/demo';
import {initSubMenu, closeOpenState, switchMenuState,openProfileMenu,openProfile,openThemeSettingPanel} from './modules/sidebars';
import {
  scrollBar,
  otherScrollbarOptions
} from './modules/initPlugins';


var MaterialLab = window.MaterialLab || (window.MaterialLab = {});

(function(window) {
  if (window.Package) {
    Materialize = {};
  } else {
    window.Materialize = {};
  }
})(window);
// Unique ID
Materialize.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
})();
$(function() {
  $.material.init();
  scrollBar();
  initSubMenu();
  toggleState();
  toggleExpand();
  navBarSearch();
  cardRefresh();
  cardToggleHighlighter();
  switchMenuState();
  openProfileMenu();
	openProfile();
  openThemeSettingPanel();
  cardOffCanvas();
  toggleDrawer();
  cardCollapse();
  closeOpenState();
  otherScrollbarOptions();
  cardSearch();
  cardReveal();
  cardTask();
  loadThemes();
  swapLayoutMode();
});


//Routes 
/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/app/',
      component: 'app'
    });
}

export const app = 'app';

const bodyTmpl = {
  template: require('../../partials/body.html'),
  controller() {
    this.hello = 'Hello World!';
  }
};


angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', bodyTmpl);