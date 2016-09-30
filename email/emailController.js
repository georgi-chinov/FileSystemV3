/**
 * 
 */
mainApp.controller('emailController' , function($scope){

    $scope.isValidEmail = function(){
    	if(($scope.forgottenPassword.userEmail.$valid)){
			return  false;
		}else{
			return  true;
		}
	}
})