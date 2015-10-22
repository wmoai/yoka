create table if not exists Fields (
  id int not null auto_increment,
  name varchar(255) not null, 
  description varchar(255),
  primary key (id)
);
truncate table Fields;
insert into Fields values (1, "Praven", "Big city.");
insert into Fields values (2, "Suno", "Queen city.");
insert into Fields values (3, "Dhirym", "Market city.");


create table if not exists Moves (
  id int not null auto_increment,
  origin_id int not null,
  destination_id int not null,
  name varchar(50) not null,
  moral tinyint not null default 0,
  primary key (id),
  unique key (origin_id, destination_id)
);
truncate table Moves;
insert into Moves values (0, 1, 2, "Suno", 8);
insert into Moves values (0, 1, 3, "Dhirym", 4);
insert into Moves values (0, 2, 3, "Dhirym", 7);
insert into Moves values (0, 2, 1, "Praven", 8);
insert into Moves values (0, 3, 2, "Suno", 6);


