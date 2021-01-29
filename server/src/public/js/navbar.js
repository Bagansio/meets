$(document).ready(function(){
    if(logged) 
    {
        $("#user").html("<a href=><span class=\"glyphicon glyphicon-user\"></span> User</a>");
        $("#logout").html("<a href=\"/logout\"><span class=\"glyphicon glyphicon-log-out\"></span> Log Out</a>");
    }
    else
        $("#user").html("<a href=\"/google\"><span class=\"glyphicon glyphicon-log-in\"></span> Sign Up</a>");
});

