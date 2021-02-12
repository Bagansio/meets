-- to run commit at the end, we need to set false default autocommit
SET AUTOCOMMIT = 0;

-- Avoid repetible reads (needs to be set before transaction starts)
-- we temporary set isolation level (with SESSION -> we need to specify it)
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;


use meets;
DROP TABLE if exists subjects;

CREATE TABLE subjects(
    id int AUTO_INCREMENT,
	userId varchar(50),
    name varchar(15) NOT NULL,

    constraint subjects_pk primary key (Id),
    constraint unique_subject UNIQUE (userId,name),  
    constraint userid_fk foreign key (userId) references users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

COMMIT;
    