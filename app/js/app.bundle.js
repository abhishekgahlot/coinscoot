"use strict";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	/* globals jQuery */
	(function ($) {
	  'use strict';
	  // Selector to select only not already processed elements
	
	  $.expr[":"].notmdproc = function (obj) {
	    if ($(obj).data("mdproc")) {
	      return false;
	    } else {
	      return true;
	    }
	  };
	
	  function _isChar(evt) {
	    if (typeof evt.which == "undefined") {
	      return true;
	    } else if (typeof evt.which == "number" && evt.which > 0) {
	      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 // backspace
	      && evt.which != 9 // tab
	      && evt.which != 13 // enter
	      && evt.which != 16 // shift
	      && evt.which != 17 // ctrl
	      && evt.which != 20 // caps lock
	      && evt.which != 27 // escape
	      ;
	    }
	    return false;
	  }
	
	  function _addFormGroupFocus(element) {
	    var $element = $(element);
	    if (!$element.prop('disabled')) {
	      // this is showing as undefined on chrome but works fine on firefox??
	      $element.closest(".form-group").addClass("is-focused");
	    }
	  }
	
	  function _toggleDisabledState($element, state) {
	    var $target;
	    if ($element.hasClass('checkbox-inline') || $element.hasClass('radio-inline')) {
	      $target = $element;
	    } else {
	      $target = $element.closest('.checkbox').length ? $element.closest('.checkbox') : $element.closest('.radio');
	    }
	    return $target.toggleClass('disabled', state);
	  }
	
	  function _toggleTypeFocus($input) {
	    var disabledToggleType = false;
	    if ($input.is($.material.options.checkboxElements) || $input.is($.material.options.radioElements)) {
	      disabledToggleType = true;
	    }
	    $input.closest('label').hover(function () {
	      var $i = $(this).find('input');
	      var isDisabled = $i.prop('disabled'); // hack because the _addFormGroupFocus() wasn't identifying the property on chrome
	      if (disabledToggleType) {
	        _toggleDisabledState($(this), isDisabled);
	      }
	      if (!isDisabled) {
	        _addFormGroupFocus($i); // need to find the input so we can check disablement
	      }
	    }, function () {
	      _removeFormGroupFocus($(this).find('input'));
	    });
	  }
	
	  function _removeFormGroupFocus(element) {
	    $(element).closest(".form-group").removeClass("is-focused"); // remove class from form-group
	  }
	
	  $.material = {
	    "options": {
	      // These options set what will be started by $.material.init()
	      "validate": true,
	      "input": true,
	      "ripples": true,
	      "checkbox": true,
	      "togglebutton": true,
	      "radio": true,
	      "arrive": true,
	      "autofill": false,
	      "withRipples": [".btn:not(.withoutripple)", '.submenu > li > a', '.submenu > ul > li > a', '.nav-pills li a ', '.fc-button', ".dropdown-alt .list-group", "#leftnav .list-group .list-group-item ", ".navbar a:not(.withoutripple)", ".dropdown-menu li a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","),
	      "inputElements": "input.form-control, textarea.form-control, select.form-control",
	      "checkboxElements": ".checkbox > label > input[type=checkbox], label.checkbox-inline > input[type=checkbox]",
	      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
	      "radioElements": ".radio > label > input[type=radio], label.radio-inline > input[type=radio]"
	    },
	    "checkbox": function checkbox(selector) {
	      // Add fake-checkbox to material checkboxes
	      var $input = $(selector ? selector : this.options.checkboxElements).filter(":notmdproc").data("mdproc", true).after("<span class='checkbox-material'><span class='check'></span></span>");
	
	      _toggleTypeFocus($input);
	    },
	    "togglebutton": function togglebutton(selector) {
	      // Add fake-checkbox to material checkboxes
	      var $input = $(selector ? selector : this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", true).after("<span class='toggle'></span>");
	
	      _toggleTypeFocus($input);
	    },
	    "radio": function radio(selector) {
	      // Add fake-radio to material radios
	      var $input = $(selector ? selector : this.options.radioElements).filter(":notmdproc").data("mdproc", true).after("<span class='circle'></span><span class='check'></span>");
	
	      _toggleTypeFocus($input);
	    },
	    "input": function input(selector) {
	      $(selector ? selector : this.options.inputElements).filter(":notmdproc").data("mdproc", true).each(function () {
	        var $input = $(this);
	
	        // Requires form-group standard markup (will add it if necessary)
	        var $formGroup = $input.closest(".form-group"); // note that form-group may be grandparent in the case of an input-group
	        if ($formGroup.length === 0 && $input.attr('type') !== "hidden" && !$input.attr('hidden')) {
	          $input.wrap("<div class='form-group'></div>");
	          $formGroup = $input.closest(".form-group"); // find node after attached (otherwise additional attachments don't work)
	        }
	
	        // Legacy - Add hint label if using the old shorthand data-hint attribute on the input
	        if ($input.attr("data-hint")) {
	          $input.after("<p class='help-block'>" + $input.attr("data-hint") + "</p>");
	          $input.removeAttr("data-hint");
	        }
	
	        // Legacy - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
	        var legacySizes = {
	          "input-lg": "form-group-lg",
	          "input-sm": "form-group-sm"
	        };
	        $.each(legacySizes, function (legacySize, standardSize) {
	          if ($input.hasClass(legacySize)) {
	            $input.removeClass(legacySize);
	            $formGroup.addClass(standardSize);
	          }
	        });
	
	        // Legacy - Add label-floating if using old shorthand <input class="floating-label" placeholder="foo">
	        if ($input.hasClass("floating-label")) {
	          var placeholder = $input.attr("placeholder");
	          $input.attr("placeholder", null).removeClass("floating-label");
	          var id = $input.attr("id");
	          var forAttribute = "";
	          if (id) {
	            forAttribute = "for='" + id + "'";
	          }
	          $formGroup.addClass("label-floating");
	          $input.after("<label " + forAttribute + "class='control-label'>" + placeholder + "</label>");
	        }
	
	        // Set as empty if is empty (damn I must improve this...)
	        if ($input.val() === null || $input.val() == "undefined" || $input.val() === "") {
	          $formGroup.addClass("is-empty");
	        }
	
	        // Support for file input
	        if ($formGroup.find("input[type=file]").length > 0) {
	          $formGroup.addClass("is-fileinput");
	        }
	      });
	    },
	    "attachInputEventHandlers": function attachInputEventHandlers() {
	      var validate = this.options.validate;
	
	      $(document).on("keydown paste", ".form-control", function (e) {
	        if (_isChar(e)) {
	          $(this).closest(".form-group").removeClass("is-empty");
	        }
	      }).on("keyup change", ".form-control", function () {
	        var $input = $(this);
	        var $formGroup = $input.closest(".form-group");
	        var isValid = typeof $input[0].checkValidity === "undefined" || $input[0].checkValidity();
	
	        if ($input.val() === "") {
	          $formGroup.addClass("is-empty");
	        } else {
	          $formGroup.removeClass("is-empty");
	        }
	
	        // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
	        //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
	        //  the form-group on change.
	        //
	        // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
	        //        BUT, I've left it here for backwards compatibility.
	        if (validate) {
	          if (isValid) {
	            $formGroup.removeClass("has-error");
	          } else {
	            $formGroup.addClass("has-error");
	          }
	        }
	      }).on("focus", ".form-control, .form-group.is-fileinput", function () {
	        _addFormGroupFocus(this);
	      }).on("blur", ".form-control, .form-group.is-fileinput", function () {
	        _removeFormGroupFocus(this);
	      })
	      // make sure empty is added back when there is a programmatic value change.
	      //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
	      .on("change", ".form-group input", function () {
	        var $input = $(this);
	        if ($input.attr("type") == "file") {
	          return;
	        }
	
	        var $formGroup = $input.closest(".form-group");
	        var value = $input.val();
	        if (value) {
	          $formGroup.removeClass("is-empty");
	        } else {
	          $formGroup.addClass("is-empty");
	        }
	      })
	      // set the fileinput readonly field with the name of the file
	      .on("change", ".form-group.is-fileinput input[type='file']", function () {
	        var $input = $(this);
	        var $formGroup = $input.closest(".form-group");
	        var value = "";
	        $.each(this.files, function (i, file) {
	          value += file.name + ", ";
	        });
	        value = value.substring(0, value.length - 2);
	        if (value) {
	          $formGroup.removeClass("is-empty");
	        } else {
	          $formGroup.addClass("is-empty");
	        }
	        $formGroup.find("input.form-control[readonly]").val(value);
	      });
	    },
	    "ripples": function ripples(selector) {
	      $(selector ? selector : this.options.withRipples).ripples();
	    },
	    "autofill": function autofill() {
	      // This part of code will detect autofill when the page is loading (username and password inputs for example)
	      var loading = setInterval(function () {
	        $("input[type!=checkbox]").each(function () {
	          var $this = $(this);
	          if ($this.val() && $this.val() !== $this.attr("value")) {
	            $this.trigger("change");
	          }
	        });
	      }, 100);
	
	      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
	      setTimeout(function () {
	        clearInterval(loading);
	      }, 10000);
	    },
	    "attachAutofillEventHandlers": function attachAutofillEventHandlers() {
	      // Listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
	      var focused;
	      $(document).on("focus", "input", function () {
	        var $inputs = $(this).parents("form").find("input").not("[type=file]");
	        focused = setInterval(function () {
	          $inputs.each(function () {
	            var $this = $(this);
	            if ($this.val() !== $this.attr("value")) {
	              $this.trigger("change");
	            }
	          });
	        }, 100);
	      }).on("blur", ".form-group input", function () {
	        clearInterval(focused);
	      });
	    },
	    "init": function init(options) {
	      this.options = $.extend({}, this.options, options);
	      var $document = $(document);
	
	      if ($.fn.ripples && this.options.ripples) {
	        this.ripples();
	      }
	      if (this.options.input) {
	        this.input();
	        this.attachInputEventHandlers();
	      }
	      if (this.options.checkbox) {
	        this.checkbox();
	      }
	      if (this.options.togglebutton) {
	        this.togglebutton();
	      }
	      if (this.options.radio) {
	        this.radio();
	      }
	      if (this.options.autofill) {
	        this.autofill();
	        this.attachAutofillEventHandlers();
	      }
	
	      if (document.arrive && this.options.arrive) {
	        if ($.fn.ripples && this.options.ripples) {
	          $document.arrive(this.options.withRipples, function () {
	            $.material.ripples($(this));
	          });
	        }
	        if (this.options.input) {
	          $document.arrive(this.options.inputElements, function () {
	            $.material.input($(this));
	          });
	        }
	        if (this.options.checkbox) {
	          $document.arrive(this.options.checkboxElements, function () {
	            $.material.checkbox($(this));
	          });
	        }
	        if (this.options.radio) {
	          $document.arrive(this.options.radioElements, function () {
	            $.material.radio($(this));
	          });
	        }
	        if (this.options.togglebutton) {
	          $document.arrive(this.options.togglebuttonElements, function () {
	            $.material.togglebutton($(this));
	          });
	        }
	      }
	    }
	  };
	})(jQuery);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	!function (a, b, c, d) {
	  "use strict";
	  function e(b, c) {
	    g = this, this.element = a(b), this.options = a.extend({}, h, c), this._defaults = h, this._name = f, this.init();
	  }var f = "ripples",
	      g = null,
	      h = {};e.prototype.init = function () {
	    var c = this.element;c.on("mousedown touchstart", function (d) {
	      if (!g.isTouch() || "mousedown" !== d.type) {
	        c.find(".ripple-container").length || c.append('<div class="ripple-container"></div>');var e = c.children(".ripple-container"),
	            f = g.getRelY(e, d),
	            h = g.getRelX(e, d);if (f || h) {
	          var i = g.getRipplesColor(c),
	              j = a("<div></div>");j.addClass("ripple").css({ left: h, top: f, "background-color": i }), e.append(j), function () {
	            return b.getComputedStyle(j[0]).opacity;
	          }(), g.rippleOn(c, j), setTimeout(function () {
	            g.rippleEnd(j);
	          }, 500), c.on("mouseup mouseleave touchend", function () {
	            j.data("mousedown", "off"), "off" === j.data("animating") && g.rippleOut(j);
	          });
	        }
	      }
	    });
	  }, e.prototype.getNewSize = function (a, b) {
	    return Math.max(a.outerWidth(), a.outerHeight()) / b.outerWidth() * 2.5;
	  }, e.prototype.getRelX = function (a, b) {
	    var c = a.offset();return g.isTouch() ? (b = b.originalEvent, 1 === b.touches.length ? b.touches[0].pageX - c.left : !1) : b.pageX - c.left;
	  }, e.prototype.getRelY = function (a, b) {
	    var c = a.offset();return g.isTouch() ? (b = b.originalEvent, 1 === b.touches.length ? b.touches[0].pageY - c.top : !1) : b.pageY - c.top;
	  }, e.prototype.getRipplesColor = function (a) {
	    var c = a.data("ripple-color") ? a.data("ripple-color") : b.getComputedStyle(a[0]).color;return c;
	  }, e.prototype.hasTransitionSupport = function () {
	    var a = c.body || c.documentElement,
	        b = a.style,
	        e = b.transition !== d || b.WebkitTransition !== d || b.MozTransition !== d || b.MsTransition !== d || b.OTransition !== d;return e;
	  }, e.prototype.isTouch = function () {
	    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	    );
	  }, e.prototype.rippleEnd = function (a) {
	    a.data("animating", "off"), "off" === a.data("mousedown") && g.rippleOut(a);
	  }, e.prototype.rippleOut = function (a) {
	    a.off(), g.hasTransitionSupport() ? a.addClass("ripple-out") : a.animate({ opacity: 0 }, 100, function () {
	      a.trigger("transitionend");
	    }), a.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
	      a.remove();
	    });
	  }, e.prototype.rippleOn = function (a, b) {
	    var c = g.getNewSize(a, b);g.hasTransitionSupport() ? b.css({ "-ms-transform": "scale(" + c + ")", "-moz-transform": "scale(" + c + ")", "-webkit-transform": "scale(" + c + ")", transform: "scale(" + c + ")" }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : b.animate({ width: 2 * Math.max(a.outerWidth(), a.outerHeight()), height: 2 * Math.max(a.outerWidth(), a.outerHeight()), "margin-left": -1 * Math.max(a.outerWidth(), a.outerHeight()), "margin-top": -1 * Math.max(a.outerWidth(), a.outerHeight()), opacity: .2 }, 500, function () {
	      b.trigger("transitionend");
	    });
	  }, a.fn.ripples = function (b) {
	    return this.each(function () {
	      a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b));
	    });
	  };
	}(jQuery, window, document);
	//# sourceMappingURL=ripples.min.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	// GLOBAL CONSTANTS
	// -----------------------------------
	(function (window, document, $, undefined) {
	  "use strict";
	
	  var MaterialLab = window.MaterialLab || (window.MaterialLab = {});
	  if (Modernizr.touchevents) {
	    MaterialLab.APP_TOUCH = true;
	  } else {
	    MaterialLab.APP_TOUCH = false;
	  }
	  MaterialLab.APP_MEDIAQUERY = {
	    'desktopLG': 1280,
	    'desktop': 992,
	    'tablet': 768,
	    'mobile': 480
	  };
	  MaterialLab.APP_COLORS = {
	    'primary': '#ec407a',
	    'success': '#28bebd',
	    'info': '#42a5f5',
	    'warning': '#fdf39e',
	    'danger': '#ef5350',
	    'mw_purple': '#6B79C4',
	    'mw_turquoise': '#00c5dc',
	    'mw_peach': '#feb38d',
	    'mw_salmon': '#EE6E73',
	    'mw_lightGray': '#EEF5F9',
	    'mw_gray': '#8f9eb5',
	    'mw_darkGray': '#707C94',
	    'mw_grayBlue': '#59779B'
	  };
	})(window, document, window.jQuery);
	// Initialize App configurations
	// --------------------------------------------------
	(function (window, document, $, undefined) {
	  //Option to persist settings:
	  var persistSettings = true;
	  var $html = $('html'),
	      $body = $('body'),
	      $appWrapper = $('#app_wrapper'),
	      $sidebarLeft = $('#app_sidebar-left'),
	      $sidebarRight = $('#app_sidebar-right');
	  if (persistSettings) {
	    //Setup some default layout options on app start.
	    //Let's check if localStorage is available and persist our settings,
	    if (typeof localStorage !== 'undefined') {
	      //Global namespace for sessionStorage,localStorage, and cookieStorage
	      window.appConfig = Storages.initNamespaceStorage('appConfig');
	      // If no appConfig key exsist then setup our default settings
	      if (appConfig.localStorage.isEmpty()) {
	        appConfig.localStorage.set({ 'leftSideBar': '', 'contentExpand': '' });
	      };
	      $body.addClass(appConfig.localStorage.get('leftSideBar'));
	      $appWrapper.addClass(appConfig.localStorage.get('contentExpand'));
	    };
	  };
	  window.app = {
	    persist: persistSettings,
	    config: {
	      isTouch: function isTouch() {
	        return $html.hasClass('touch');
	      },
	      isLeftSideBarCollapsed: function isLeftSideBarCollapsed() {
	        return $body.hasClass('app_sidebar-menu-collapsed');
	      },
	      isContentExpand: function isContentExpand() {
	        return $appWrapper.hasClass('content-expanded');
	      }
	    }
	  };
	})(window, document, window.jQuery);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _appState = __webpack_require__(5);
	
	var _drawers = __webpack_require__(8);
	
	var _search = __webpack_require__(10);
	
	var _cards = __webpack_require__(11);
	
	var _demo = __webpack_require__(12);
	
	var _sidebars = __webpack_require__(6);
	
	var _initPlugins = __webpack_require__(9);
	
	var MaterialLab = window.MaterialLab || (window.MaterialLab = {}); /*
	                                                                   *
	                                                                   * MaterialLab
	                                                                   * Author: http://authenticgoods.co
	                                                                   *
	                                                                   */
	//import the JavaScript modules to run
	
	
	(function (window) {
	  if (window.Package) {
	    Materialize = {};
	  } else {
	    window.Materialize = {};
	  }
	})(window);
	// Unique ID
	Materialize.guid = function () {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return function () {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	  };
	}();
	$(function () {
	  $.material.init();
	  (0, _initPlugins.scrollBar)();
	  (0, _sidebars.initSubMenu)();
	  (0, _appState.toggleState)();
	  (0, _appState.toggleExpand)();
	  (0, _search.navBarSearch)();
	  (0, _cards.cardRefresh)();
	  (0, _cards.cardToggleHighlighter)();
	  (0, _sidebars.switchMenuState)();
	  (0, _sidebars.openProfileMenu)();
	  (0, _sidebars.openProfile)();
	  (0, _sidebars.openThemeSettingPanel)();
	  (0, _cards.cardOffCanvas)();
	  (0, _drawers.toggleDrawer)();
	  (0, _cards.cardCollapse)();
	  (0, _sidebars.closeOpenState)();
	  (0, _initPlugins.otherScrollbarOptions)();
	  (0, _cards.cardSearch)();
	  (0, _cards.cardReveal)();
	  (0, _cards.cardTask)();
	  (0, _demo.loadThemes)();
	  (0, _demo.swapLayoutMode)();
	});
	
	var myApp = angular.module('coinscoot', ['ui.router']);
	
	myApp.config(function ($stateProvider) {
	  var homeState = {
	    name: 'home',
	    url: '/home',
	    template: __webpack_require__(13),
	    controller: function controller($scope) {
	      $scope.hello = 'Hello World!';
	    }
	  };
	
	  var ordersState = {
	    name: 'orders',
	    url: '/orders',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var tradeState = {
	    name: 'trade',
	    url: '/trade',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var bitcoinState = {
	    name: 'bitcoin',
	    url: '/bitcoin',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var bitcoincashState = {
	    name: 'bitcoincash',
	    url: '/bitcoincash',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var etherState = {
	    name: 'ether',
	    url: '/ether',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var exchangeState = {
	    name: 'exchange',
	    url: '/exchange',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var profileState = {
	    name: 'profile',
	    url: '/profile',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
	  var settingsState = {
	    name: 'settings',
	    url: '/settings',
	    template: '<h3>Its the UI-Router hello world app!</h3>'
	  };
	
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.toggleExpand = exports.toggleState = undefined;
	
	var _sidebars = __webpack_require__(6);
	
	var _backdrops = __webpack_require__(7);
	
	//
	// Module to toggle state
	// ----------------------------------
	var toggleState = function toggleState() {
		var $toggleElement = $('[data-toggle-state]');
		$('[data-toggle-state]').on('click', function (e) {
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
					if (className === 'app_sidebar-menu-collapsed' && $('#profile-menu').length > 0 && $('#profile-menu').hasClass('open')) {
						$('#profile-menu').removeClass('open');
						$('#profile-menu .submenu').css({ 'display': 'none' });
					}
					$target.addClass(className);
					if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(min-width: 1280px)')) {
						appConfig.localStorage.set(key, className);
					};
				}
			}
			(0, _sidebars.menuIconState)(element);
			if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(max-width: 1280px)') || typeof localStorage !== 'undefined' && window.app.persist && className === 'sidebar-overlay-open') {
				(0, _backdrops.backDrops)(className, element, $target);
				appConfig.localStorage.set(key, '');
			}
		});
	};
	var toggleExpand = function toggleExpand() {
		var $toggleExpanded = $('[data-toggle-expand]');
		$toggleExpanded.on('click', function (e) {
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
	exports.toggleState = toggleState;
	exports.toggleExpand = toggleExpand;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initSubMenu = function initSubMenu() {
	  var subMenu = $('#app_main-menu-wrapper .nav');
	  $(subMenu).navgoco({ caretHtml: false, accordion: true });
	};
	var closeOpenState = function closeOpenState() {
	  $('#app_sidebar-left').on('mouseleave', function () {
	    if ($('body.app_sidebar-menu-collapsed').length > 0) {
	      $('.nav-dropdown').each(function () {
	        if ($(this).hasClass('open') && !$(this).hasClass('active')) {
	          $(this).removeClass('open');
	          $(this).children('.nav-sub').removeAttr("style");
	        }
	      });
	      if ($('#profile-menu').length > 0 && $('#profile-menu').hasClass('open')) {
	        $('#profile-menu').removeClass('open');
	        $('#profile-menu .submenu').css({ 'display': 'none' });
	      }
	    }
	  });
	};
	var switchMenuState = function switchMenuState() {
	  var $body = $('body');
	  var $html = $('html');
	  if ($(window).width() < 1280 && !$html.hasClass('backdrop-open')) {
	    $body.removeClass('app_sidebar-menu-collapsed');
	    $('#content_wrapper').removeClass('toggle-left toggle-right');
	  } else if (!$html.hasClass('backdrop-open')) {
	    $body.removeClass('app_sidebar-left-open');
	  }
	};
	var menuIconState = function menuIconState(element) {
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
	var openProfile = function openProfile() {
	  $('[data-toggle-profile]').on('click', function () {
	    $('#profile-menu').slideToggle();
	  });
	};
	var openProfileMenu = function openProfileMenu() {
	  $('[data-profile="open-menu"]').on('click', function () {
	    $(this).parents('#profile-menu').toggleClass('open').find('.submenu').slideToggle();
	  });
	};
	var openThemeSettingPanel = function openThemeSettingPanel() {
	  $('[data-trigger="sidebar-overlay-open"]').on('click', function (e) {
	    e.stopPropagation();
	    $('[data-toggle-state="sidebar-overlay-open"]').trigger('click');
	    $('a[href="#sidebar_settings"]').trigger('click');
	  });
	};
	exports.initSubMenu = initSubMenu;
	exports.closeOpenState = closeOpenState;
	exports.switchMenuState = switchMenuState;
	exports.menuIconState = menuIconState;
	exports.openProfile = openProfile;
	exports.openProfileMenu = openProfileMenu;
	exports.openThemeSettingPanel = openThemeSettingPanel;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var backDrops = exports.backDrops = function backDrops(className, element, $target) {
	  var $body = $('body');
	  var $html = $('html');
	  if ($target.hasClass(className)) {
	    if (className === 'expand' || className === 'app_sidebar-left-open') {
	      $body.append('<div class="backdrop ' + className + ' top"></div>');
	    } else {
	      $body.append('<div class="backdrop ' + className + '"></div>');
	    }
	    if (MaterialLab.APP_TOUCH === true) {
	      $('.' + className + '.backdrop').hammer().bind('tap', function (e) {
	        e.stopPropagation();
	        element.trigger('click');
	      });
	    } else {
	      $('.' + className + '.backdrop').on('click', function (e) {
	        e.stopPropagation();
	        element.trigger('click');
	      });
	    };
	    if ($('.backdrop').length > 0 && !$html.hasClass('backdrop-open')) {
	      $html.addClass('backdrop-open');
	    }
	  } else {
	    if (className === 'sidebar-overlay-open') {
	      $('#chat_compose_wrapper').removeClass('open');
	    }
	    $('.' + className + '.backdrop').fadeOut(250, function () {
	      $(this).remove();
	      if ($('.backdrop').length === 0) {
	        $html.removeClass('backdrop-open');
	      }
	    });
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleDrawer = undefined;
	
	var _backdrops = __webpack_require__(7);
	
	var _initPlugins = __webpack_require__(9);
	
	//
	// Module to toggle drawers
	// ----------------------------------
	var toggleDrawer = function toggleDrawer() {
	  var $toggleElement = $('[data-drawer]');
	  $toggleElement.off('click');
	  $toggleElement.on('click', function (e) {
	    e.stopPropagation();
	    var $body = $('body'),
	        element = $(this),
	        className = element.data('drawer'),
	        $target = $('#content_wrapper');
	    if (className) {
	      if ($target.hasClass(className)) {
	        $target.removeClass(className);
	      } else {
	        $target.addClass(className);
	      }
	    }
	    if (className === 'open-left' || className === 'open-right' || className === 'open-left-lg' || className === 'open-right-lg') {
	      (0, _backdrops.backDrops)(className, element, $target);
	    } else if (className === 'toggle-left' && Modernizr.mq('(max-width: 992px)') || className === 'toggle-right' && Modernizr.mq('(max-width: 992px)')) {
	      (0, _backdrops.backDrops)(className, element, $target);
	    }
	    setTimeout(function () {
	      if ($('#storeLocations').length > 0) {
	        var storeLocations = window.storeLocations || (window.storeLocations = {});
	        google.maps.event.trigger(storeLocations, 'resize');
	      }
	    }, 200);
	  });
	  var $dismissElement = $('[data-dismiss=drawer]');
	  $dismissElement.on('click', function (e) {
	    e.stopPropagation();
	    $('.backdrop').trigger('click');
	  });
	};
	exports.toggleDrawer = toggleDrawer;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var scrollBar = function scrollBar() {
	  if ($('.scrollbar').length > 0) {
	    $('.scrollbar').mCustomScrollbar({
	      theme: "minimal-dark",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	  $("#app_main-menu-wrapper.scrollbar").mCustomScrollbar("scrollTo", ".nav-dropdown.active", { scrollInertia: 0 });
	};
	var otherScrollbarOptions = function otherScrollbarOptions() {
	  if ($('.scrollbar-minimal-light').length > 0) {
	    $('.scrollbar-minimal-light').mCustomScrollbar({
	      theme: "minimal",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	  if ($('.scrollbar-light').length > 0) {
	    $('.scrollbar-light').mCustomScrollbar({
	      theme: "light",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	  if ($('.scrollbar-dark').length > 0) {
	    $('.scrollbar-dark').mCustomScrollbar({
	      theme: "dark",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	};
	exports.scrollBar = scrollBar;
	exports.otherScrollbarOptions = otherScrollbarOptions;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var navBarSearch = function navBarSearch() {
	    var $openSearch = $('[data-navsearch-open]'),
	        $closeSearch = $('[data-navsearch-close]'),
	        $navbarForm = $('#navbar_form'),
	        $navbarSearch = $('#navbar_search'),
	        $document = $(document);
	    $openSearch.on('click', function (e) {
	        e.stopPropagation();
	        $navbarForm.addClass('open');
	        $navbarSearch.focus();
	    });
	    $closeSearch.on('click', function (e) {
	        e.stopPropagation();
	        $navbarForm.removeClass('open');
	        $navbarSearch.val('');
	    });
	    $document.on('click', function (e) {
	        e.stopPropagation();
	        if (e.target !== $('#navbar_search')) {
	            $navbarForm.removeClass('open');
	            $navbarSearch.val('');
	        }
	    });
	    $navbarSearch.on('click', function (e) {
	        e.stopPropagation();
	    });
	};
	var widgetSearch = function widgetSearch() {
	    var $openSearch = $('[data-widget-search-open]'),
	        $closeSearch = $('[data-widget-search-close]');
	    $openSearch.on('click', function (e) {
	        e.stopPropagation();
	        $navbarForm.addClass('open');
	        $navbarSearch.focus();
	    });
	};
	exports.navBarSearch = navBarSearch;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	//
	// Module for cards
	// ----------------------------------
	var card = {
	  cardClass: ".card",
	  cardHeadingClass: ".card .card-heading",
	  cardBodyClass: ".card .card-body",
	  cardFooterClass: ".card .card-footer",
	  cardRevealClass: ".card .card-reveal",
	  cardRefresh: '.card a[data-toggle="refresh"]',
	  cardClose: '.card a[data-toggle="close"]',
	  cardCollapse: '.card a[data-toggle="collapse"]',
	  cardToggleHighlighter: 'a[data-toggle-view="code"]',
	  cardSearchOpen: 'a[data-card-search="open"]',
	  cardSearchClose: '[data-card-search="close"]',
	  cardRevealToggle: '[data-toggle="reveal"]'
	};
	var cardRefresh = function cardRefresh() {
	  $(document).on("click", card.cardRefresh, function (e) {
	    e.preventDefault();
	    var $card = $(this).closest(card.cardClass);
	    $card.append("<div class=\"load\"></div>");
	    var $loader = $card.find('.load');
	    $loader.load('assets/partials/_preloader.html', function () {
	      setTimeout(function () {
	        $loader.fadeOut('1500', function () {
	          $loader.remove();
	        });
	      }, 1700);
	    });
	  });
	};
	// Card collapse
	var cardCollapse = function cardCollapse() {
	  $(document).on("click", card.cardCollapse, function (e) {
	    e.preventDefault();
	    $(this).children('i').toggleClass('zmdi-chevron-up zmdi-chevron-down');
	    var $cardBody = $(this).closest(".card").children('.card-body');
	    $cardBody.slideToggle();
	  });
	};
	// Toggle Syntax Highlighter
	var cardToggleHighlighter = function cardToggleHighlighter() {
	  $(document).on("click", card.cardToggleHighlighter, function (e) {
	    e.preventDefault();
	    var $cardContianer = $(this).closest(".card").find('.syntax-highlighter');
	    $cardContianer.slideToggle();
	  });
	};
	// Menu off-canvas
	var cardOffCanvas = function cardOffCanvas() {
	  $('[data-card-off-canvas]').on('click', function () {
	    var $this = $(this),
	        cardClass = $this.data('card-off-canvas');
	    $this.toggleClass(cardClass);
	    $this.closest('.card').find('.card-body').toggleClass(cardClass);
	    $this.parents('.card').find('.card-off-canvas').toggleClass(cardClass);
	    if ($('.card-off-canvas.is-active').length > 0) {
	      $this.closest('.card.drawer ').prepend('<div class="card-backdrop"></div>');
	    } else {
	      $this.parents('.drawer').find('.card-backdrop').remove();
	    }
	  });
	  $(document.body).on('click', '.card .card-backdrop', function () {
	    $('[data-card-off-canvas]').trigger('click');
	  });
	};
	
	// Card task
	var cardTask = function cardTask() {
	  $('[data-toggle="input"]').on('click', function () {
	    $(this).toggleClass('open');
	    var $taskForm = $(this).parents('.card-task').find('form');
	    $taskForm.toggleClass('open');
	    $taskForm.find('input').focus();
	  });
	  if ($('.checklist input[type=checkbox]').length > 0) {
	    var i = 1,
	        $taskList = $('.checklist input[type=checkbox]');
	    $taskList.each(function (i) {
	      $(this).attr('id', 'task_' + i);
	    });
	    $taskList.change(function () {
	      if (this.checked) {
	        $(this).closest('label').css({
	          'text-decoration': 'line-through'
	        });
	      } else {
	        $(this).closest('label').css({
	          'text-decoration': 'none'
	        });
	      }
	    });
	  };
	};
	// Card Search
	var cardSearch = function cardSearch() {
	  $(document).on("click", card.cardSearchOpen, function (e) {
	    e.preventDefault();
	    var $this = $(this),
	        $card = $this.closest(card.cardClass),
	        $cardSearch = $card.find('.card-search'),
	        cardClass = $this.data('cardSearch');
	    $cardSearch.addClass(cardClass);
	    $cardSearch.find('.form-control').focus();
	  });
	  $(document).on("click", card.cardSearchClose, function (e) {
	    e.preventDefault();
	    var $this = $(this),
	        $card = $this.closest('.card'),
	        $cardSearch = $card.find('.card-search'),
	        cardClass = $this.data('cardSearch');
	    $cardSearch.removeClass('open');
	    $cardSearch.find('.form-control').val('');
	    if ($card.hasClass('card-data-tables')) {
	      var oTable = $('.dataTable').DataTable();
	      oTable.search($(this).val()).draw();
	    }
	  });
	};
	// Toggle Card Reveal
	var cardReveal = function cardReveal() {
	  $(document).on("click", card.cardRevealToggle, function (e) {
	    e.preventDefault();
	    var $cardRevealContianer = $(this).closest(".card.reveal");
	    $cardRevealContianer.toggleClass('open');
	    $('.email-form input,.email-form textarea').val('');
	    if ($cardRevealContianer.hasClass('open')) {
	      setTimeout(function () {
	        $('#email-to').focus();
	      }, 100);
	    }
	  });
	};
	exports.cardRefresh = cardRefresh;
	exports.cardCollapse = cardCollapse;
	exports.cardOffCanvas = cardOffCanvas;
	exports.cardTask = cardTask;
	exports.cardToggleHighlighter = cardToggleHighlighter;
	exports.cardSearch = cardSearch;
	exports.cardReveal = cardReveal;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//These javascript modules are for demo purposes.
	var iconModal = function iconModal() {
	  var icons = $('.icon');
	  var name = 'bus';
	  icons.on('click', function (e) {
	    e.preventDefault();
	    var oldName = name;
	    name = $(this).data('name');
	    var code = $(this).data('code');
	    var category = $(this).parent().parent().find('.page-header').html();
	    $('#icon-sizes i').removeClass('zmdi-' + oldName).addClass('zmdi-' + name);
	    $('#iconModal .source').html('&lt;i class="zmdi zmdi-' + name + '"&gt;&lt;/i&gt;');
	    $('#icon-code .zmdi').html('&#x' + code);
	    $('#icon-code .unicode').html('Unicode: ' + code);
	    $('#icon-code .category').html('Category: ' + category);
	    $('#iconModalLabel').html('zmdi-' + name);
	  });
	};
	var css3AnimationDemos = function css3AnimationDemos() {
	  $('.animation-demo .btn').on('click', function () {
	    var className = $(this).text();
	    var cardImg = $(this).closest('.card').find('img');
	    $(this).closest('img').addClass(className);
	    cardImg.removeAttr('class');
	    cardImg.addClass('img-circle animated ' + className);
	    setTimeout(function () {
	      cardImg.removeClass(className);
	    }, 1500);
	  });
	};
	var cardCarousel = function cardCarousel() {
	  $('#card-carousel').slick({ dots: true, infinite: true, speed: 300, slidesToShow: 1, adaptiveHeight: true });
	};
	var cardDemoMorrisChart = function cardDemoMorrisChart() {
	  if ($('#morris_card_demo').length) {
	    var data = [{
	      y: '2014',
	      a: 50,
	      b: 90
	    }, {
	      y: '2015',
	      a: 65,
	      b: 75
	    }, {
	      y: '2016',
	      a: 50,
	      b: 50
	    }, {
	      y: '2017',
	      a: 75,
	      b: 60
	    }, {
	      y: '2018',
	      a: 80,
	      b: 65
	    }, {
	      y: '2019',
	      a: 90,
	      b: 70
	    }, {
	      y: '2020',
	      a: 100,
	      b: 75
	    }, {
	      y: '2021',
	      a: 115,
	      b: 75
	    }, {
	      y: '2022',
	      a: 120,
	      b: 85
	    }, {
	      y: '2023',
	      a: 145,
	      b: 85
	    }, {
	      y: '2024',
	      a: 160,
	      b: 95
	    }],
	        config = {
	      data: data,
	      xkey: 'y',
	      ykeys: ['a', 'b'],
	      labels: ['Total Income', 'Total Outcome'],
	      fillOpacity: 0.6,
	      hideHover: 'auto',
	      behaveLikeLine: true,
	      resize: true,
	      pointFillColors: ['#ffffff'],
	      pointStrokeColors: ['black'],
	      barColors: ['#db5c60', '#f4b0b2']
	    };
	    config.element = 'morris_card_demo';
	    config.stacked = true;
	    Morris.Bar(config);
	  };
	};
	var loadThemes = function loadThemes() {
	  $('[data-load-css]').on('click', function (e) {
	    var element = $(this);
	    if (element.is('a')) e.preventDefault();
	    var uri = element.data('loadCss'),
	        link;
	    if (uri) {
	      link = swapStyleSheet(uri);
	      if (!link) {
	        $.error('Error creating stylesheet link element.');
	      }
	    } else {
	      $.error('No stylesheet location defined.');
	    }
	  });
	};
	var swapStyleSheet = function swapStyleSheet(uri) {
	  var linkId = 'autoloaded-stylesheet',
	      oldLink = $('#' + linkId).attr('id', linkId + '-old');
	  $('head').append($('<link/>').attr({ 'id': linkId, 'rel': 'stylesheet', 'href': uri }));
	  if (oldLink.length) {
	    oldLink.remove();
	  }
	  return $('#' + linkId);
	};
	var swapLayoutMode = function swapLayoutMode() {
	  $('input[name=layoutMode]').click(function () {
	    if ($('body').hasClass('boxed-layout')) {
	      $('body').removeClass('boxed-layout');
	    }
	    var getVal = $(this).val();
	    $('body').addClass(getVal);
	  });
	};
	exports.iconModal = iconModal;
	exports.css3AnimationDemos = css3AnimationDemos;
	exports.cardCarousel = cardCarousel;
	exports.cardDemoMorrisChart = cardDemoMorrisChart;
	exports.loadThemes = loadThemes;
	exports.swapLayoutMode = swapLayoutMode;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"card\">\n\t\t<header class=\"card-heading \">\n\t\t\t<h2 class=\"card-title\">{{ hello }}</h2>\n\t\t\t<small>Welcome to the MaterialLab Seed Project</small>\n\t\t\t<ul class=\"card-actions icons right-top\">\n\t\t\t\t<li>\n\t\t\t\t\t<a href=\"javascript:void(0)\" data-toggle=\"refresh\">\n\t\t\t\t\t\t<i class=\"zmdi zmdi-refresh-alt\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"dropdown\">\n\t\t\t\t\t<a href=\"javascript:void(0)\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t<i class=\"zmdi zmdi-more-vert\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<ul class=\"dropdown-menu btn-primary dropdown-menu-right\">\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"javascript:void(0)\">Option One</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"javascript:void(0)\">Option Two</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"javascript:void(0)\">Option Three</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</header>\n\t\t<div class=\"card-body\">\n\t\t\t<p>\n\t\t\t\tThis is a set of starter pages for your project. You can use these pages as a starting point to add only the components you need.\n\t\t\t</p>\n\t\t</div>\n\t</div>";

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map