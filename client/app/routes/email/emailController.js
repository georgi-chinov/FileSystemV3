/**
 * 
 */

mainApp.controller('emailController' , function($rootScope, $scope, $http, $httpParamSerializerJQLike, userSrv, $location){
	
	$scope.lostmail =  {to: ''};
	$rootScope.showCarousel = false;
    $scope.show = false;
    $scope.showWrong = false;

	 //check whether the email is valid
	$scope.isValidEmail = function(){
		var emailReg = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
		if(emailReg.test($scope.lostmail.to)){
			return true;
		} else {
			return false;
		}
	}
	//submitting form
	$scope.submitForm = function() {
		if ($scope.lostmail.to) {
			userSrv.lostEmail($scope.lostmail).then(function(response){
				console.log(response);
		        if(response.data == "sent"){
		            $scope.showWrong = false;
		        	$scope.show = true;
		        	console.log("probe when email sent");
		        
		        	} else if(response.data == "Wrong email!") {
		        		 $scope.show = false;
		        		 $scope.showWrong = true;
		        		 console.log("probe when NOT sent an email");
		        	}
			})
		}
	};

})