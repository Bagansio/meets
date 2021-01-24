#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>


/*
    THIS SHOULD BE USED AS ./deletenode && node main.js
*/






void error_y_exit(char* msg,int error_status) {
	perror(msg);
	exit(error_status);
} 

int main(int argc, char * argv[])
{

    if(argc != 1) error_y_exit("Usage: ./deletenode",0);
    execlp("pkill","pkill","-KILL","-f","node main.js",(char *)NULL);
}