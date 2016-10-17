/**
 *
 */
mainApp.controller('editController', function($rootScope, $scope, $location,$window,$interval , userSrv) {
	console.log("this is the edit Controller");

	$rootScope.showCarousel = false;
    $rootScope.hide = true;
	 $scope.iterator = 5;

    $scope.info = {
        oldPassword: '',
        password: '',
        passRepeated: ''
    };
    //validate old password field
    $scope.isValidOlPassword = function() {
            var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
            if (passwordReg.test($scope.info.oldPassword)) {
                return true;
            } else {
                return false;
            }
        }
        //validate field for password
    $scope.isValidPassword = function() {
            var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
            if (passwordReg.test($scope.info.password)) {
                return true;
            } else {
                return false;
            }
        }
        //check if passwords are the same
    $scope.isValidRepeated = function() {
        if ($scope.info.password == $scope.info.passRepeated && $scope.info.passRepeated != '') {
            return true;
        } else {
            return false;
        }
    }

    //checks whether the info is valid
    $scope.isValidInfo = function() {
            if ($scope.isValidOlPassword() && $scope.isValidPassword() && $scope.isValidRepeated()) {
                return false;
            } else {
                return true;
            }
        }
        //send new password and before that check whether  the old is the current user's password in the db
    $scope.sendNewPass = function() {
        console.log($scope.info);
        if (!$scope.isValidInfo()) {
            userSrv.userCheckpw($scope.info).then(function(response){
            	if(response.data.legit == false){
            		$scope.showErr = true;
            	}
            	
            	if(response.data.legit ==  true){
            		
            		 var absUrl = $location.absUrl();
                     var absUrlSplitted = absUrl.split('/');
                     console.log(absUrlSplitted);
                     absUrlSplitted = absUrlSplitted.splice(0, absUrlSplitted.length - 1).join('/').toString();
                     $scope.show = true;
                  //show time remain
                     $interval(function () {
                    	 $scope.iterator--;
                    	 if($scope.iterator == 0){
                        	 $window.location.href = absUrlSplitted;
                    	 }
                     }, 1000);
            	}
            	
            })
        }
    }
})
