/**
 * 
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap' , 'ngMessages'])
	
		.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: './home/home.html',
                    controller: 'homeController'
                })
                .when('/email', {
                    templateUrl: './email/email.html',
                    controller: 'emailController'
                })
                .otherwise({
                    template: '<h1>Not found</h1><h2>{{message}}</h2>',
                    controller: function ($scope) {
                        $scope.message = 'not found page is shown'
                    }
                })
			})

			.controller('MainController', function ($scope, $location) {

				$scope.navigateToSimple = function () {
					$location.path('simple/567');
				}

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
            $scope.showIt = function(){
            	if($scope.show){
            		$scope.show = false;
            		$scope.show2=false;
            		$scope.isAct = false;
            	} else {
            		$scope.show = true;
            		$scope.show2 = false;
            		$scope.isAct = true;
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
        
		.controller ('myCtrl',function($scope){
	
			$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
	 
			$scope.login = function(){
				//send data
			 }
			$scope.isValid= function(){
				
				if(($scope.sign.username.$valid) && ($scope.sign.userpass.$valid) && ($scope.sign.passRepeated.$valid) && ($scope.sign.userEmail.$valid)){
					return false;
				} else {
					return true;
				}
			}
			
		})

		.controller('logInCtrl',function($scope){

		$scope.user = {name:'',password:''};
		 $scope.login = function(){
			 //send data
		 }
			$scope.isValid= function(){
				if(($scope.log.username.$valid) && ($scope.log.userpass.$valid)){
						return false;
					} else {
						return true;
					}
			}
			/**$scope.hideLogin = function(){
				$scope.show = false;
				if($scope.visible){
					$scope.visible = true;
				} else {
					$scope.visible = true;
				} 
			}**/
					
	})
    