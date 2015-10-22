create table if not exists Users (
  id int not null auto_increment,
  name varchar(255) not null unique,
  password_hash varchar(255),
  solt_hash varchar(255),
  primary key (id)
);


create table if not exists Locations (
  user_id int not null,
  field_id int not null default 0,
  primary key (user_id)
);

