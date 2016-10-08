/**
 * 
 */
mainApp.controller('loginController',function($scope){

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