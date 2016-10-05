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