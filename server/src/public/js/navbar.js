//this function returns if you are in the relative path .../schedule
// RETURNS TRUE if u are
//         FALSE if not
function active_schedule()
{
    let url = window.location.pathname.split('/');
    if(url[url.length-1] === "schedule")
        $("#schedule-link").addClass("active");
}


/*
    IF LOGGED show 'User' and 'Log out'
    ELSE show 'LOG IN' 
*/
function active_user()
{
    console.log(logged);
    if(logged) 
    {
        console.log(user_picture_url);
        $("#user").html('<a class="nav-link" href="/user"><span><img  src="'+ user_picture_url + '" class="rounded-circle img-user"></img></span> User</a>');
        // $("#user").html("<a class=\"nav-link\" href=\"/user\"><span class=\"fa fa-user fa-lg\"></span> User</a>");
        $("#logout").html("<a class=\"nav-link\" href=\"/logout\"><span class=\"fa fa-sign-out fa-lg\"></span> Sign Out</a>");
    }
    else
        $("#user").html("<a class=\"nav-link\" href=\"/google\"><span class=\"fa fa-sign-in fa-lg\"></span> Sign In</a>");
}



$(document).ready(function(){
   
    active_schedule();

    active_user();
});

