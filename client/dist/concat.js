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
                //redirect to forgotten password page with routing
                
                .otherwise({
                    templateUrl: './index.html',
                    controller:'MainController'
                })
			})
			//this is the main controller with nested scopes in it 
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
        //this is the controller for the sign up form
		.controller ('myCtrl',function($scope){
	
			$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
	 
			$scope.login = function(){
				//send data
			 }
			//this function checks whether the data to send  is valid
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
		 //Checks if the data is valid
			$scope.isValid= function(){
				if(($scope.log.username.$valid) && ($scope.log.userpass.$valid)){
						return false;
					} else {
						return true;
					}
			}

					
	})
    
/**
 * 
 */
var emailApp = angular.module('emailApp', ['ngRoute', 'ngAnimate' , 'ui.bootstrap', 'ngMessages']);

emailApp.controller('emailController' , function($scope , $http,$httpParamSerializerJQLike){
	
	$scope.email =  '';
	
	$scope.isValidEmail = function(){
    	if(($scope.forgottenPassword.userEmail.$valid)){
			return  false;
		}
    	return  true;

	}
	
	$scope.submitForm = function(){
		if($scope.email !== undefined){	
			var data = {to: $scope.email};
			console.log(data);
			
			$http({
			    method: "post",
			    url: 'http://localhost:3000/',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    data: $httpParamSerializerJQLike(data)
			})
		}
	}

})
emailApp.config(['$httpProvider', function ($httpProvider) {

	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	}]);
/**
 * 
 */
mainApp.controller('homeController' , function($scope){
	
})