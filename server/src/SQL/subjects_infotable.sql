-- to run commit at the end, we need to set false default autocommit
SET AUTOCOMMIT = 0;

-- Avoid repetible reads (needs to be set before transaction starts)
-- we temporary set isolation level (with SESSION -> we need to specify it)
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;




use meets;
DROP TABLE if exists subjectsInfo;

CREATE TABLE subjectsInfo(
    id int,
    
    tipus varchar(10),
    dayW int,
    iniClass time not null,
    finClass time not null,
    url varchar(512),

    constraint subjectsInfo_pk primary key (id,tipus,dayW),
    constraint id_fk foreign key (id) references subjects(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    constraint correct_time check (IniClass < FinClass)
    
);

COMMIT;