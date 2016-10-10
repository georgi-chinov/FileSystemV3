/**
 * 
 */

mainApp.controller('mainpageController' , function($scope, FileUploader){
	        $scope.uploader = new FileUploader();
	        console.log($scope.uploader);
	        console.log(123);

})