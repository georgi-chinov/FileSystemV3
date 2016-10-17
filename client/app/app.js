/**
 *
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngMessages', 'angularFileUpload', 'angularBootstrapNavTree'])
    //routing
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: './app/routes/home/home.html',
                controller: 'homeController'
            })
            .when('/login', {
                templateUrl: './app/routes/login/login.html',
                controller: 'loginController'
            })
            .when('/register', {
                templateUrl: './app/routes/register/register.html',
                controller: 'registerController'
            })
            .when('/email', {
                templateUrl: './app/routes/email/email.html',
                controller: 'emailController'
            })
            .when('/main', {
                templateUrl: './app/routes/main/main.html',
                controller: 'mainpageController'
            })
            .when('/main/edit', {
                templateUrl: './app/routes/main/edit/editProfile.html',
                controller: 'editController'
            })

    })
    //this is the main controller with nested scopes in it
    .controller('MainController', function($scope, $location, userSrv) {
        console.log("this is the main Controller");

    })

.controller('CollapseDemoCtrl', function($rootScope, $scope) {
    console.log("this is the Controller");

    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;

    $scope.isActive = function() {
        if (!$scope.isAct) {
            $scope.isAct = true;
        } else {
            $scope.isAct = false;
        }
    }

    $rootScope.showCarousel = true;


})
