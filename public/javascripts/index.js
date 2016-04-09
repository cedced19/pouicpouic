require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('ng-notie');

var app = angular.module('Pouicpouic', ['ngNotie', 'ngSanitize', 'ngRoute', 'ngTouch']);
app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/users', {
            templateUrl: '/views/users-list.html',
            controller: 'PouicpouicUsersListCtrl'
        })
        .when('/users/new', {
            templateUrl: '/views/users-new.html',
            controller: 'PouicpouicUsersNewCtrl'
        })
        .when('/users/:id', {
            templateUrl: '/views/users-id.html',
            controller: 'PouicpouicUsersIdCtrl'
        })
        .when('/signup', {
            templateUrl: '/views/signup.html',
            controller: 'PouicpouicSignupCtrl'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'PouicpouicLoginCtrl'
        })
        .when('/', {
            templateUrl: '/views/webcam.html',
            controller: 'PouicpouicWebcamCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
app.run(['$rootScope', '$location', '$http', 'notie', function ($rootScope, $location, $http, notie) {
        $rootScope.$menu = {
            show: function () {
              document.getElementsByTagName('body')[0].classList.add('with-sidebar');
            },
            hide: function (path) {
              document.getElementsByTagName('body')[0].classList.remove('with-sidebar');
              if (path) {
                $location.path(path);
              }
            },
            logout: function () {
              $http.get('/logout').success(function () {
                $rootScope.user = false;
                $location.path('/');
              });
            }
        };
        $http.get('/authenticated').success(function (data) {
          if (data.status) {
              $rootScope.user = data.user;
          } else {
              $rootScope.user = false;
          }
        });
        $rootScope.$error = function () {
          $http.get('/authenticated').success(function (data) {
            if (!data.status) {
                $rootScope.user = false;
            }
            notie.alert(3, 'Something went wrong!', 3);
          }).error(function () {
            notie.alert(3, 'Cannot access to the server.', 3);
          });
        };
        $rootScope.$login = function (cb) {
          $http.get('/authenticated').success(function (data) {
            if (!data.status) {
              notie.input('You must authenticate to do that', 'Continue', 'Cancel', 'text', 'Name', function (name) {
                notie.input('You must authenticate to do that', 'Login', 'Cancel', 'password', 'Password', function (password) {
                  $http.post('/login', {
                      name: name,
                      password: password
                  }).success(function(data) {
                      $rootScope.user = data;
                      cb();
                  }).error(function () {
                      notie.alert(3, 'Invalid name or password.', 3);
                  });
                });
              });
            } else {
              cb();
            }
          });
        };
}]);
app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});
app.controller('PouicpouicWebcamCtrl', require('./controllers/webcam.js'));
app.controller('PouicpouicUsersListCtrl', require('./controllers/users-list.js'));
app.controller('PouicpouicUsersIdCtrl', require('./controllers/users-id.js'));
app.controller('PouicpouicUsersNewCtrl', require('./controllers/users-new.js'));
app.controller('PouicpouicSignupCtrl', require('./controllers/signup.js'));
app.controller('PouicpouicLoginCtrl', require('./controllers/login.js'));
