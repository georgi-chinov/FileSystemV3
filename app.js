/**
 * 
 */
angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap' , 'ngMessages'])
	.controller('MainController', function ($scope, $location) {

            $scope.navigateToSimple = function () {
                $location.path('simple/567');
            }
            $scope.show = function($scope){
            	if($scope.show){
            		$scope.show = false;
            	}else{
            		$scope.show = true;
            	}
            }
			

        })
       .controller('CollapseDemoCtrl', function ($scope) {
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;
       
            $scope.isActive = function(){
				if(!$scope.isAct){
					$scope.isAct = true;
				}else{
					$scope.isAct = false;
				}
			}
            
       })
        
		.controller ('myCtrl',function($scope){
	
			$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
	 
			$scope.login = function(){
				//send data
			 }
			$scope.isValid= function(){
				
				if(($scope.sign.username.$valid) && ($scope.sign.userpass.$valid) && ($scope.sign.passRepeated.$valid) && ($scope.sign.userEmail.$valid)){
					return false;
				}else{
					return true;
				}
			}
		})

		.controller('logInCtrl',function($scope){

		$scope.user = {name:'',password:''};
		 $scope.login = function(){
			 //send data
		 }
			$scope.isValid= function(){
				if(($scope.log.username.$valid) && ($scope.log.userpass.$valid)){
						return false;
					}else{
						return true;
					}
				}
					
	})
    ;