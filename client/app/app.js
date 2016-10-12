/**
 * 
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap' , 'ngMessages', 'angularFileUpload'])
	//routing
		.config(function ($routeProvider, $locationProvider ) {
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
                //redirect to forgotten password page with routing
                
                
			})
			//this is the main controller with nested scopes in it 
			.controller('MainController', function ($scope, $location , userSrv) {

        })
       .controller('CollapseDemoCtrl', function ($scope) {
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;
       
            $scope.isActive = function(){
				if(!$scope.isAct){
					$scope.isAct = true;
				} else {
					$scope.isAct = false;
				}
			}
            
       })
       

    