CREATE TABLE Adresses(
	AdresseID integer PRIMARY KEY, 
	IndiPtr integer, 
	FamillePtr integer, 
	Contact varchar(255), 
	Adresse1 varchar(255), 
	Adresse2 varchar(255), 
	CodePostal varchar(255), 
	Ville varchar(255), 
	Departement varchar(255), 
	Pays varchar(255), 
	Email varchar(255), 
	PageWeb varchar(255), 
	Telephone varchar(255), 
	Fax varchar(255), 
	Private boolean
);
CREATE TABLE Depots( 
	DepotID integer PRIMARY KEY, 
	Nom varchar(255), 
	Adr1 varchar(255), 
	Adr2 varchar(255), 
	Adr3 varchar(255), 
	Phone varchar(255), 
	Web varchar(255), 
	Email varchar(255), 
	Commentaire text 
);
CREATE TABLE Evenements( 
	EvenementID integer PRIMARY KEY, 
	LieuPtr integer, 
	IndiPtr integer, 
	FamillePtr integer, 
	TypeEvenement integer, 
	Titre varchar(255), 
	TitreTri varchar(255), 
	DateBlob blob, 
	DateTri real, 
	Commentaire text, 
	Private boolean, 
	NoteConfidentielle boolean, 
	RechercheActe boolean, 
	Subdivision varchar(255), 
	Certitude integer, 
	AgeSurActe varchar(255), 
	Cause varchar(255)
);
CREATE TABLE Familles( 
	FamilleID integer PRIMARY KEY, 
	EpouxPtr integer, 
	EpousePtr integer, 
	MainEventMarPtr integer, 
	DateMarTri real, 
	OrdreTri integer, 
	TypeUnion integer, 
	NoteFam varchar(255), 
	NoteConfidentielle boolean
);

CREATE TABLE Individus (  
	IndiID integer PRIMARY KEY, 
	FamilleParentPtr integer, 
	NomPtr integer, 
	MainEventNaisPtr integer, 
	MainEventDecesPtr integer, 
	DateNaisTri real, 
	OrdreTri integer, 
	SosaMultiple boolean, 
	SosaNum bigint, 
	Prenoms varchar(255), 
	PrenomsTri varchar(255), 
	Profession varchar(255) , 
	Sexe integer, 
	Filiation Integer, 
	Signature Integer, 
	DateCreation date, 
	DateModif date, 
	NoteIndi varchar(255), 
	NoteConfidentielle boolean, 
	NumUtil varchar(255), 
	SansDescendance boolean, 
	Confidentiel boolean, 
	Marque boolean, 
	Suffixe varchar(255), 
	Surnom varchar(255), 
	Titre varchar(255)
);
CREATE TABLE LiensIndis (
	LienIndiID integer PRIMARY KEY,
    IndiSourcePtr integer,
    IndiDestPtr integer,
    TypeGedcom varchar(255),
    Relation integer,
    AutreLien varchar(255),
    Commentaire text
);
CREATE TABLE LiensMedias(
	LienMediaID integer PRIMARY KEY,
    MediaPtr integer,
    DestPtr integer,
    DestType integer,
    MainMedia boolean
);
CREATE TABLE LiensSources(
	LienSourceID integer PRIMARY KEY,
    SourcePtr integer,
    DestPtr integer,
    DestType integer,
    Citation varchar(255)
);
CREATE TABLE Lieux(
	LieuID integer PRIMARY KEY,
	Pays varchar(255),
	Region varchar(255),
	Departement varchar(255),
	Ville varchar(255),
	CodePostal varchar(255),
CodePays varchar,
CodeRegion varchar, 
CodeDept varchar, 
Latitude double, 
Longitude double, 
	PaysTri varchar(255),
	RegionTri varchar(255),
	DepartementTri varchar(255),
	VilleTri varchar(255),
	CodePostalTri varchar(255),
	Commentaire text,
	RattachementLieuPtr integer
);
CREATE TABLE Medias(
	MediaID integer PRIMARY KEY,
    AbsolutePath varchar(255),
    Private boolean, 
    Year integer,
    Commentaire text,
    Format varchar(255),
    Image blob,
    Vignette blob
);
CREATE TABLE Noms(
	NomID integer PRIMARY KEY,
	Nom varchar(255),
	Particule varchar(255),
	NomTri varchar(255),
	Commentaire text,
	RattachementNomPtr integer
);
CREATE TABLE OrigineData (
	FirstID integer,
    LastID Integer,
    Origine integer,
    DateOrigine date,
    Plateforme integer
);
CREATE TABLE Preferences  ( 
	LastID integer, 
	Num1Sosa integer, 
	DiodePrefs integer, 
	Provenance integer, 
	ProvenanceTxt varchar, 
	NumeroHeredis integer, 
	NumeroPH integer,
	NumeroVersionDatabase integer,
	FirstGedcom varchar
);
CREATE TABLE Sources(
	SourceID integer PRIMARY KEY,
    DepotPtr integer,
    Nom varchar(255),
    TypeMac integer,
    NumeroMac varchar(255),
    Private boolean,
    Cote varchar(255),
    SupportMac integer,
    Certitude integer,
    Commentaire text,
    Transcription varchar(255),
    Auteur varchar(255),
    Publication varchar(255),
    Archivage varchar(255),
    Email varchar(255),
    URL varchar(255),
    Confidentiel boolean,
    DateRedactionBlobMac blob,
    DocumentPC varchar(255),
    OriginePC varchar(255),
    NaturePC integer
);
CREATE TABLE Temoins(
	TemoinID integer PRIMARY KEY,
    DestPtr integer,
    IndiPtr integer,
    DestType integer,
    Nom varchar(255),
    Prenoms varchar(255),
    Age varchar(255),
    Profession varchar(255),
    Role varchar(255),
    TypeGedcom varchar(255),
    Relation integer,
    AutreLien varchar(255),
    Commentaire text
);

CREATE TABLE OrdreEnfants (EnfantPtr integer);
CREATE TABLE OrdreUnions (ConjointPtr integer);

CREATE INDEX IdxEvenementDateTri ON Evenements(DateTri);
CREATE INDEX IdxEvenementFamillePtr ON Evenements(FamillePtr);
CREATE INDEX IdxEvenementIndiPtr ON Evenements(IndiPtr);
CREATE INDEX IdxFamillesDateMarTri ON Familles(DateMarTri);
CREATE INDEX IdxFamillesEpousePtr ON Familles(EpousePtr);
CREATE INDEX IdxFamillesEpouxPtr ON Familles(EpouxPtr);
CREATE INDEX IdxIndividusDateNaisTri ON Individus(DateNaisTri);
CREATE INDEX IdxIndividusFamPtr ON Individus(FamilleParentPtr);
CREATE INDEX IdxIndividusNomPtr ON Individus(NomPtr);
CREATE INDEX IdxIndividusPrenomsTri ON Individus(PrenomsTri);
CREATE INDEX IdxLienSourcesDestPtr  ON LiensSources(DestPtr);
CREATE INDEX IdxLienSourcesSourcePtr  ON LiensSources(SourcePtr);
CREATE INDEX IdxLiensMediasDestPtr  ON LiensMedias(DestPtr);
CREATE INDEX IdxLiensMediasMediaPtr  ON LiensMedias(MediaPtr);
CREATE INDEX IdxLieuxCodePostalTri ON Lieux(CodePostalTri);
CREATE INDEX IdxLieuxDepartementTri ON Lieux(DepartementTri);
CREATE INDEX IdxLieuxPaysTri ON Lieux(PaysTri);
CREATE INDEX IdxLieuxRegionTri ON Lieux(RegionTri);
CREATE INDEX IdxLieuxVilleTri ON Lieux(VilleTri);
CREATE INDEX IdxNomTri ON Noms(NomTri);
CREATE INDEX IdxIndividusDecesPtr ON Individus(MainEventDecesPtr);
CREATE INDEX IdxEvenementLieuPtr ON Evenements(LieuPtr);
CREATE INDEX IdxTemoinsDestPtr  ON Temoins(DestPtr);
CREATE INDEX IdxTemoinsIndiPtr  ON Temoins(IndiPtr);