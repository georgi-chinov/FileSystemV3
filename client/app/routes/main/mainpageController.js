/**
 * 
 */

mainApp.controller('mainpageController' , function($scope, FileUploader, userSrv,$rootScope){
		$scope.uploader = new FileUploader();
		console.log($scope.item);
	        //console.log(123);
	       $scope.upload = function () {
	    	   
	       }
	       $rootScope.hide = true;
	       console.log($scope.item)
});
