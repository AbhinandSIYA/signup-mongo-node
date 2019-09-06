$().ready(function () {
    $( "#signupForm" ).validate({
        rules: {
            _firstname:{
                required:true,
                minlength:4
            },
            _lastname:{
                required:true,
                minlength:4
            },
            _gender:{
                required:true,
            },
            _Select1:{
                required:true
            },
            _email: {
                required: true,
                email: true,
                remote :
                    {
                        url: '/validation',
                        type: 'post',
                        data:
                            {
                                _email:function () {
                                    return $('#email').val()
                                }
                            }
                    }
            },
            _username:{
                required:true,
                remote :
                    {
                        url: '/validation',
                        type: 'post',
                        data:
                            {
                                _username:function () {
                                    return $('#username').val()
                                }
                            }
                    }
            },
            _password:{
                required:true,
                minlength:8
            },
            _cpassword:{
                required:true,
                minlength:8,
                equalTo:"#password"

            },
            _games:{
                required:true
            }
        },
        messages:{
            _firstname: {
                required:"Please specify your name",
                minlength: jQuery.validator.format("At least {0} characters required!")
            },
            _lastname: {
                required:"Please specify your last name",
                minlength: jQuery.validator.format("At least {0} characters required!")
            },
            _gender:{
                required:"Please specify your gender"
            },
            _Select1:{
                required:"Please specify your country"
            },
            _email: {
                required: "Please specify your email",
                email: "Your email address must be in the format of name@domain.com",
                remote: "Email id already exist"
            },
            _username:{
                required:"Specify your user name",
                remote:"Username already exist"
            },
            _password:{
                required:"Must be enter a password",
                minlength:"Atleast 8 characters"
            },
            _cpassword:{
                required:"Must be enter a password",
                minlength:"Atleast 8 characters",
                equalTo:"Enter same password"
            },
            _games:{
                required:"Select your favorite game"
            }
        },

    });
    $('.checkboxsel').click(function() {
        $(this).siblings('input:checkbox').prop('checked', false);
    });
});