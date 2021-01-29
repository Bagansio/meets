let logged = <%= title%>;

$(document).ready(function(){
    if(logged) 
        $("#user").html("<span class=\"glyphicon glyphicon-user\"></span> User");
    else
        $("#user").html("<span class=\"glyphicon glyphicon-log-in\"></span> Sign Up");
});