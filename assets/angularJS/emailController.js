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
		console.log($scope.email);
		
		$http.post('localhost:3000', {email:$scope.email})
        .success(function (response) {
            callback(response);
});
	}

})