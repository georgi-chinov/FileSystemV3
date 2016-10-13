/**
 * 
 */

mainApp.controller('emailController' , function($rootScope, $scope, $http, $httpParamSerializerJQLike, userSrv, $location){
	
	$scope.lostmail =  {to: ''};
	$rootScope.showCarousel = false;
    
	//show message
	$scope.showModal = function(){
		if(	$scope.show == true){
			$scope.show = false ;
			$scope.hide = true;
		} else {
			$scope.show = true ;
			$scope.hide = false;
		}

	}
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
		        	console.log("probe when email sent")
		        	$scope.showModal();
	        
		        	} else if(response.data == "Wrong email!") {
		        		$scope.showModal();
		        		console.log("probe when NOT sent an email");
		        	}
			})
		}
	};

})