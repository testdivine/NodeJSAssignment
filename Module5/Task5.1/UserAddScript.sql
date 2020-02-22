-- Database: TestDB

-- DROP DATABASE "TestDB";
Create table users (
	userId varchar(50) primary key,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
	email varchar(50) not null,
	createdAt timestamp,
	updatedAt timestamp
);

Insert into users
values (1, 'Akash', 'Singh', 'akash.singh@testuser.com','2018-02-01','2018-02-01'),
(2, 'Ravi', 'Singh', 'ravi.singh@testuser.com','2018-02-01','2018-02-01'),
(3, 'Shashank', 'Sharma', 'shashank.sharma@testuser.com','2018-02-01','2018-02-01'),
(4, 'Vikas', 'Tiwari', 'vikas.tiwari@testuser.com','2018-02-01','2018-02-01'),
(5, 'Shubham', 'Saxena', 'subham.saxena@testuser.com','2018-02-01','2018-02-01'),
(6, 'Jaya', 'Kumar', 'jaya.kumar@testuser.com','2018-02-01','2018-02-01'),
(7, 'Rachit', 'Rastogi', 'rachit.rastogi@testuser.com','2018-02-01','2018-02-01'),
(8, 'Ved', 'Vrat', 'ved.vrat@testuser.com','2018-02-01','2018-02-01'),
(9, 'Sahas', 'Singh', 'sahas.singh@testuser.com','2018-02-01','2018-02-01'),
(10, 'Abhinav', 'Hiwanj', 'abhinav.hiwanj@testuser.com','2018-02-01','2018-02-01')
