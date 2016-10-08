/**
 * 
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap' , 'ngMessages'])
	//routing
		.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
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
                //redirect to forgotten password page with routing
                
                .otherwise({
                    templateUrl: './index.html',
                    controller:'MainController'
                })
			})
			//this is the main controller with nested scopes in it 
			.controller('MainController', function ($scope, $location) {

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
            //these are functions to show and hide the login and the sign up form
            $scope.showIt = function(){
            	if($scope.show){
            		$scope.show = false;
            		$scope.show2=false;
            		$scope.isAct = false;
            		
            	} else {
            		$scope.show = true;
            		$scope.show2 = false;
            		$scope.isAct = true;
            		if($scope.showEmail == true){
            			$scope.showEmail = false;
            		}
            	}
            }
            $scope.showIt2 = function(){
            	if($scope.show2){
            		$scope.show2 = false;
            		
            		$scope.isAct = false;
            	} else {
            		$scope.show = false;
            		$scope.show2 = true;
            		$scope.isAct = true;
            	}
            }
			
            
       })

    