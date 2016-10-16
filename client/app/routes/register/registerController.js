/**
 * 
 */
mainApp.controller ('registerController',function($rootScope,$scope, userSrv  , $location){
	console.log("this is the register Controller");

	$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
    $rootScope.showCarousel = false;
    
	//show message
	$scope.showModal = function(){
		if(	$scope.show == true){
			$scope.show = false ;
		} else {
			$scope.show = true ;
		}

	}
	
	//validate username
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
		if($scope.user.password == $scope.user.passRepeated && $scope.user.passRepeated != ''){
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
	//check whether all the information is valid in order to allow the user to submit info
	$scope.isValid= function(){
		if($scope.isValidName() && $scope.isValidPassword() && $scope.isValidPassword2() && $scope.isValidEmail()){
			return false;
		} else {
			return true;
		}
	}
	//register
	$scope.submitRegisterForm = function(){
		if (!$scope.isValid()) {
			userSrv.userRegister($scope.user).then(function(response){
		        if(response.data == "User registered!"){
		        	console.log("probe when registered")
					$location.path('/login');
			
		        	} else if(response.data == "User exists!") {
		        		$scope.showModal();
		        		console.log("probe when could NOT register");
		        	}
			})
		}
		
	 }
});

