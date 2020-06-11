CREATE TABLE fighters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  health NUMERIC(3),
  power NUMERIC(3),
  defense NUMERIC(2),
  creating_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE gamers (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(25),
  lastName VARCHAR(25),
  email VARCHAR(50),
  phoneNumber VARCHAR(20),
  password VARCHAR(50),
  creating_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE fights (
  id SERIAL PRIMARY KEY,
  fighter1 INTEGER REFERENCES fighters(id),
  fighter2 INTEGER REFERENCES fighters(id),
  creating_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE logs (
  id SERIAL NOT NULL, 
  fight_id INTEGER REFERENCES fights(id),
  action VARCHAR NOT NULL, 
  value NUMERIC,
  PRIMARY KEY(id, fight_id),
  creating_date DATE NOT NULL DEFAULT CURRENT_DATE
);


ALTER TABLE fighters
ADD updating_date DATE;

ALTER TABLE gamers
ADD updating_date DATE;

ALTER TABLE gamers
ADD hash VARCHAR;

ALTER TABLE gamers 
ADD salt VARCHAR;

ALTER TABLE fights
ADD updating_date DATE;



ALTER TABLE gamers 
ADD CONSTRAINT gamers_email_unique UNIQUE (email);

ALTER TABlE fighters 
ADD CONSTRAINT fighters_name_unique UNIQUE (name);

CREATE TABLE sessions (
  sid VARCHAR NOT NULL COLLATE "default",
	sess JSON NOT NULL,
	expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE sessions ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expire ON sessions(expire);

