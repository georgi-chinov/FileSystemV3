/**
 * 
 */
mainApp.controller ('registerController',function($scope, userSrv){
	
	$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
	
	$scope.validate = function(){
		var emailReg = "/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/";
		var passwordReg = "/^[a-zA-Z0-9.\-_$@*!]{8,20}$/";
		var userReg = "/^[a-zA-Z0-9.\-_$@*!]{5,20}$/";
		if(userReg.test(user.name)){
			$scope.showName = true;
		} else {
			$scope.showName = false;
			
		}
		
		if(passwordReg.test(user.password)){
			$scope.showPass = true;
		}  else {
			$scope.showPass = false;
			
		}
		
		if(emailReg.test(user.name)){
			$scope.showEmail = true;
		}  else {
			$scope.showEmail = false;
			
		}
	}
	$scope.isValid= function(){
		if(($scope.sign.username.$valid) && ($scope.sign.userpass.$valid) && ($scope.sign.passRepeated.$valid) && ($scope.sign.userEmail.$valid)){
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

