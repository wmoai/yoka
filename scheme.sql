create table if not exists user (
  id int not null auto_increment,
  name varchar(255) not null unique,
  password_hash varchar(40),
  solt_hash varchar(40),
  primary key (id)
);
truncate table user;


create table if not exists field (
  id int not null auto_increment,
  name varchar(255) not null, 
  description varchar(255),
  primary key (id)
);
truncate table field;
insert into field values ("", "Praven", "Big city.");
insert into field values ("", "Suno", "Queen city.");
insert into field values ("", "Dhirym", "Market city.");



create table if not exists move (
  id int not null auto_increment,
  origin_id int not null,
  destination_id int not null,
  name varchar(50) not null,
  moral tinyint not null default 0,
  primary key (id),
  unique key (origin_id, destination_id),
  foreign key (name) references field(name)
);
truncate table move;


