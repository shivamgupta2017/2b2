// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
"use strict";
var app = angular.module('starter', ['ionic','ngStorage']);

app.run(function($ionicPlatform, $state, $localStorage, $ionicHistory) 
{
  $ionicPlatform.ready(function() 
  {
    document.addEventListener("offline", offline, false);
    document.addEventListener("online", online, false);
    window.plugins.OneSignal.getIds(function(ids) 
    { 
        $localStorage.player_id=ids.userId;
    });
    
    var notificationOpenedCallback = function(jsonData) 
    {
      var state=jsonData.notification.payload.additionalData.state;
     delete jsonData.notification.payload.additionalData.state;
     $state.go(state,jsonData.notification.payload.additionalData);
    };
      window.plugins.OneSignal.startInit("93c7e511-bea9-41fe-93e5-6226c84c3619").handleNotificationOpened(notificationOpenedCallback).endInit();
      window.plugins.OneSignal.startInit("93c7e511-bea9-41fe-93e5-6226c84c3619").inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
      .endInit();

    function offline() 
    {
      $state.go('network_connection');
    }
    function online() 
    {
      $ionicHistory.goBack(-1);
    }



   
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.recent_orders', {
      url: '/recent_orders',
      views: {
        'menuContent': {
          templateUrl: 'templates/recent_orders.html',
          controller: 'recent_ordersCtrl'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'dashboardCtrl'
        }
      }
    })
    
    .state('app.express_shipping', {
      url: '/express_shipping',
      views: {
        'menuContent': {
          templateUrl: 'templates/express_shipping.html',
          controller: 'express_shippingCtrl'
        }
      }
    })

  .state('app.view_order_details', {
    url: '/view_order_details/:order_id/:order_verification/',
    views: {
      'menuContent': {
        templateUrl: 'templates/view_order_details.html',
        controller: 'view_order_detailsCtrl'
      }
    }
  })

  .state('app.product_catalogue', {
    url: '/product_catalogue',
    views: {
      'menuContent': {
        templateUrl: 'templates/product_catalogue.html',
        controller: 'product_catelogueCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    
  })
  .state('network_connection', {
    url: '/network_connection',
    templateUrl: 'templates/network_connection.html',
    controller: 'no_network_ConnectionCtrl'
  })

  .state('app.update_order_details' ,{
     url: '/update_order/:order_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/update_order.html',
        controller: 'update_orderCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/login');
});
