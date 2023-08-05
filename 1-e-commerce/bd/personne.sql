CREATE TABLE utilisateur (
	id_uti INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	nom_uti VARCHAR(30) NOT NULL,
	penom_uti VARCHAR(30) NOT NULL,
	email_uti VARCHAR(50) NOT NULL,
	age_uti INT(3),
	genre_uti VARCHAR(3),
	date TIMESTAMP
);