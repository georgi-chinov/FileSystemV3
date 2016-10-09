/**
 * 
 */
mainApp.controller('loginController',function($scope, userSrv){
	$scope.user = {name:'',password:''};
	
	//check whether the username is valid 
	$scope.isValidName = function(){
		var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
		if(userReg.test($scope.user.name)){
			return true;
		} else {
			return false;
		}
	}
	//check whether the password is valid 
	$scope.isValidPassword = function(){
		var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
		if(passwordReg.test($scope.user.password)){
			return true;
		} else {
			return false;
		}
	}

	 //Checks if the data is valid
		$scope.isValid= function(){
			if($scope.isValidName() && $scope.isValidPassword()){
					return false;
				} else {
					return true;
				}
		}
		
		 $scope.login = function(){
			 if ($scope.user.name && $scope.user.password) {
					userSrv.userLogin($scope.user);
				}
		 }

				
})