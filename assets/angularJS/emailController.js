/**
 * 
 */
var emailApp = angular.module('emailApp', ['ngRoute', 'ngAnimate' , 'ui.bootstrap', 'ngMessages']);
emailApp.controller('emailController' , function($scope , $http){
	$scope.email =  '';
	
	$scope.isValidEmail = function(){
    	if(($scope.forgottenPassword.userEmail.$valid)){
			return  false;
		}else{
			return  true;
		}
	}
	
	$scope.submitForm = function(){
		if($scope.email !== undefined){
			
			
			var data = {mail: $scope.email}
			console.log(data);
			$http.post('/', data)
	        .success(function (response) {
	            
	});

		}
	}

})