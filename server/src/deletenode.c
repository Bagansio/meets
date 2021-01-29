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
    char buff[256];
    char c = '"';
    if(argc != 2) error_y_exit("Usage: ./deletenode filename",0);
    sprintf(buff,"%cnode %s%c",c,argv[1],c);
    execlp("pkill","pkill","-KILL","-f",argv[1],(char *)NULL);
}