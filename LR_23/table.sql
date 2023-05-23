create table [User](
	id int not null identity(1,1) primary key,
	login nvarchar(MAX),
	password nvarchar(MAX)
);