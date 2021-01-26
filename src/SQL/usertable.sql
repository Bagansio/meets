-- to run commit at the end, we need to set false default autocommit
SET AUTOCOMMIT = 0;

-- Avoid repetible reads (needs to be set before transaction starts)
-- we temporary set isolation level (with SESSION -> we need to specify it)
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;


DROP DATABASE IF EXISTS meets;
CREATE DATABASE  meets;

use meets;
DROP TABLE if exists users;

CREATE TABLE users(
	AccountId varchar(50),
    DisplayName varchar(50) not null,
    role enum('admin','user') not null,
    -- last_login datetime not null,
    PictureUrl varchar(512),
    Email nvarchar(320),
    constraint users_pk primary key (AccountId)
);

COMMIT;
    