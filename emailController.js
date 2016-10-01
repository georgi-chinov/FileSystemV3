/**
 * 
 */
var emailApp = angular.module('emailApp', ['ngRoute', 'ngAnimate' , 'ui.bootstrap', 'ngMessages']);
emailApp.controller('emailController' , function($scope){

	$scope.isValidEmail = function(){
    	if(($scope.forgottenPassword.userEmail.$valid)){
			return  false;
		}else{
			return  true;
		}
	}
	var from,to,subject,text;
    $scope.sendEmail = function(){     
    	from = "projectorganiseit@gmail.com";
        to = 'tyhomiraparichkova@gmail.com';
        subject='Forgotten password';
        text='You have forgotten your password';
        //$("#message").text("Sending E-mail...Please wait");
        $.get("http://localhost:3000/send",{to:to,subject:subject,text:text},function(data){
	        if(data=="sent"){
	
	        	console.log('data sent!');
	        	
	        }
        })
      
    }
    

})