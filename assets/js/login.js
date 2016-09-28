/**
 * 
 */
$(function (){
	$('#login').submit(function(e) {
		e.preventDefault();
		var userInfo = {
				'username': $('#username').val(),
				'password': $('#password').val()
		};
		console.log(userInfo);
		
		$.post('server/')
	})
});