/**
 * 
 */
mainApp.controller ('registerController',function($scope, userSrv){
	
	$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
	
	//validate function
	//1) for username
	$scope.isValidName = function(){
		var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
		if(userReg.test($scope.user.name)){
			return true;
		} else {
			return false;
		}
	}
	//validate password
	$scope.isValidPassword = function(){
		var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
		if(passwordReg.test($scope.user.password)){
			return true;
		} else {
			return false;
		}
	}
	//check if passwords are the same
	$scope.isValidPassword2 = function(){
		if($scope.user.password == $scope.user.passRepeated){
			return true;
		} else {
			return false;
		}
	}
	//check if email is valid
	$scope.isValidEmail = function(){
		var emailReg = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
		if(emailReg.test($scope.user.email)){
			return true;
		} else {
			return false;
		}
	}
	$scope.isValid= function(){
		if($scope.isValidName() && $scope.isValidPassword() && $scope.isValidPassword2() && $scope.isValidEmail()){
			return false;
		} else {
			return true;
		}
	}
	$scope.submitRegisterForm = function(){
		if ($scope.user.name && $scope.user.password && $scope.user.passRepeated && $scope.user.email) {
			userSrv.userRegister($scope.user);
			return;
		}
		
	 }
});

