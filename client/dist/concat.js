/**
 * 
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap' , 'ngMessages', 'angularFileUpload'])
	//routing
		.config(function ($routeProvider, $locationProvider ) {
            $routeProvider
                .when('/home', {
                    templateUrl: './app/routes/home/home.html',
                    controller: 'homeController'
                })
                .when('/login', {
                    templateUrl: './app/routes/login/login.html',
                    controller: 'loginController'
                })
                .when('/register', {
                    templateUrl: './app/routes/register/register.html',
                    controller: 'registerController'
                })
                .when('/email', {
                    templateUrl: './app/routes/email/email.html',
                    controller: 'emailController'
                })
                 .when('/main', {
                    templateUrl: './app/routes/main/main.html',
                    controller: 'mainpageController'
                })
                //redirect to forgotten password page with routing
                
                
			})
			//this is the main controller with nested scopes in it 
			.controller('MainController', function ($scope, $location , userSrv) {

        })
       .controller('CollapseDemoCtrl', function ($scope) {
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;
       
            $scope.isActive = function(){
				if(!$scope.isAct){
					$scope.isAct = true;
				} else {
					$scope.isAct = false;
				}
			}
            //these are functions to show and hide the login and the sign up form
            $scope.showIt = function(){
            	if($scope.show){
            		$scope.show = false;
            		$scope.show2=false;
            		$scope.isAct = false;
            		
            	} else {
            		$scope.show = true;
            		$scope.show2 = false;
            		$scope.isAct = true;
            		if($scope.showEmail == true){
            			$scope.showEmail = false;
            		}
            	}
            }
            $scope.showIt2 = function(){
            	if($scope.show2){
            		$scope.show2 = false;
            		
            		$scope.isAct = false;
            	} else {
            		$scope.show = false;
            		$scope.show2 = true;
            		$scope.isAct = true;
            	}
            }
			
            
       })

    
mainApp.factory('userSrv', function ($http , $location) {
	var baseUrl = 'http://localhost:3000/';
    return {
        lostEmail: function (lostmail) {
            return $http.post(baseUrl + 'lostpassword', lostmail).then(successCallback);
            
            function successCallback(response) {
            	console.log(response);
            }
        
        },
        userRegister: function (user) {
        	return $http.post(baseUrl + 'register', user).then(successCallback);
        
            function successCallback(response) {
            	if(response.data == 'User registered!'){
            		console.log("Success");
            		$location.path('/login');
            		return;
            	} 
            		
            		console.log("Fail!");
            		alert('Error!');
            		
            }
            
        },
        userLogin: function (user) {
        	/**function successCallback(response) {
            	if(response.data == 'Logged!'){
            		console.log("Success");
            		$location.path('/main');
            		return true;
            	} else{
            		console.log("Fail!");
	            	return false;	
            	} 
      			.then(successCallback);
            }*/
        	return $http.post(baseUrl + 'login', user)
        },
        
    };
});
/**
 * 
 */

mainApp.controller('emailController' , function($scope, $http, $httpParamSerializerJQLike, userSrv, $location){
	
	$scope.lostmail =  {to: ''};
	
	$scope.isValidEmail = function(){
		var emailReg = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
		if(emailReg.test($scope.lostmail.to)){
			return true;
		} else {
			return false;
		}
	}
	$scope.submitForm = function() {
		if ($scope.lostmail.to) {
			userSrv.lostEmail($scope.lostmail);
			console.log(143);
		}
	};

})
/**
 * 
 */
mainApp.controller('homeController' , function($scope){
	
})
/**
 * 
 */
mainApp.controller('loginController',function($scope, $location,userSrv){
	$scope.user = {name:'',password:''};
	//show message
	$scope.showModal = function(){
		if(	$scope.show == true){
			$scope.show = false ;
		} else {
			$scope.show = true ;
		}

	}
	
	
	
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
		$scope.isValid = function(){
			if($scope.isValidName() && $scope.isValidPassword()){
				return false;
				} else {
					return true;
				}
		}
		
		 $scope.login = function(){
			 if (!$scope.isValid()) {
					userSrv.userLogin($scope.user).then(function(response){
				        if(response.data == "Logged!"){
				        	console.log("probe when logged")
							$location.path('/main');
					
				        	} else if("No such user!") {
				        		$scope.showModal();
				        		console.log("probe when NOT logged");
				        	}
					})
			 	}
		 }	
	})
/**
 * 
 */

mainApp.controller('mainpageController' , function($scope, FileUploader){
		$scope.uploader = new FileUploader();
		console.log($scope.item);
	        //console.log(123);
	       $scope.upload = function () {
	    	   
	       }

})
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
	$scope.isValid= function(){
		if($scope.isValidName() && $scope.isValidPassword() && $scope.isValidPassword2() && $scope.isValidEmail()){
			return false;
		} else {
			return true;
		}
	}
	$scope.submitRegisterForm = function(){
		if (!$scope.isValid()) {
			userSrv.userRegister($scope.user);
			return;
		}
		
	 }
});

