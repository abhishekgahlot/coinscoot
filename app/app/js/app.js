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


var myApp = angular.module('coinscoot', ['ui.router']);

myApp.config(function($stateProvider) {
  var homeState = {
    name: 'home',
    url: '/home',
    template: require('../../partials/body.html'),
    controller: function($scope) {
      $scope.hello = 'Hello World!';
    }
  }

  var ordersState = {
    name: 'orders',
    url: '/orders',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var tradeState = {
    name: 'trade',
    url: '/trade',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var bitcoinState = {
    name: 'bitcoin',
    url: '/bitcoin',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var bitcoincashState = {
    name: 'bitcoincash',
    url: '/bitcoincash',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var etherState = {
    name: 'ether',
    url: '/ether',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var exchangeState = {
    name: 'exchange',
    url: '/exchange',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var profileState = {
    name: 'profile',
    url: '/profile',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  var settingsState = {
    name: 'settings',
    url: '/settings',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(ordersState);
  $stateProvider.state(tradeState);
  $stateProvider.state(bitcoinState);
  $stateProvider.state(bitcoincashState);
  $stateProvider.state(etherState);
  $stateProvider.state(exchangeState);
  $stateProvider.state(profileState);
  $stateProvider.state(settingsState);
});

// //Routes 
// /** @ngInject */
// function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
//   $locationProvider.html5Mode(true).hashPrefix('!');
//   $urlRouterProvider.otherwise('/');

//   $stateProvider
//     .state('app', {
//       url: '/app/',
//       component: 'app'
//     });
  
//     $stateProvider
//       .state('newTempl', {
//         url: '/orders',
//         component: 'newTempl'
//       });
// }

// const app = 'app';

// const bodyTmpl = {
//   template: require('../../partials/body.html'),
//   controller() {
//     this.hello = 'Hello World!';
//   }
// };

// const newTempl = {
//   template: require('../../partials/body.html'),
//   controller() {
//     this.hello = 'Hello aaaaa!';
//   }
// }

// const angularApp = angular
//   .module(app, ['ui.router'])
//   .config(routesConfig)
//   .component('app', bodyTmpl)
//   .component('newTempl', newTempl);