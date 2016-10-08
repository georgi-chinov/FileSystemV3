/**
 * 
 */
mainApp.controller ('registerController',function($scope){
	
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
	
});

