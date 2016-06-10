$('#signup').on('click', function(){
    var data = {
        'first_name' : $('#first_name').val(),
        'last_name' : $('#last_name').val(),
        'email' : $('#email').val(),
        'password' : $('#password').val(),
        'confirm_password' : $('#confirm_password').val(),

    }

    console.log(data)

    $.ajax({
        'url':'/api/accounts/create_user/',
        'method':'post',
        'data':data,
        'success': function(response){
            console.log(response)
        }
    })
})