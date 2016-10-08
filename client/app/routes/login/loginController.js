/**
 * 
 */
mainApp.controller('loginController',function($scope, userSrv){


	 //Checks if the data is valid
		$scope.isValid= function(){
			if(($scope.log.username.$valid) && ($scope.log.userpass.$valid)){
					return false;
				} else {
					return true;
				}
		}
		
		$scope.user = {name:'',password:''};
		
		 $scope.login = function(){
			 if ($scope.user.name && $scope.user.password) {
					userSrv.userLogin($scope.user);
				}
		 }

				
})