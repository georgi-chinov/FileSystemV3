/**
 * 
 */
mainApp.controller ('registerController',function($scope, userSrv){
	
	$scope.user = {name:'',password:'' , passRepeated:'' , email:''};

	$scope.isValid= function(){
		if(($scope.sign.username.$valid) && ($scope.sign.userpass.$valid) && ($scope.sign.passRepeated.$valid) && ($scope.sign.userEmail.$valid)){
			return false;
		} else {
			return true;
		}
	}
	$scope.reg = function(){
		if ($scope.user.name && $scope.user.password && $scope.user.passRepeated && $scope.user.email) {
			userSrv.userRegister($scope.user);
		}
	 }
});

