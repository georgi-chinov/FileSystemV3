/**
 * 
 */

$(function (){
	$('#register').submit(function(e) {
		e.preventDefault();
		var userInfo = {
				'username': $('#username').val(),
				'password': $('#password').val(),
				'email': $('#email').val()
		};
		console.log(userInfo);
		
		$.post('server/register.js',userInfo, function (reply){
			console.log(reply);
		});
	})
});