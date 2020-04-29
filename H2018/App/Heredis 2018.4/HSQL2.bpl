/**-----------------------------------------------------------------------------------------------------------------------------------
 ** @brief	Ce ficher crée toutes les tables nécessaire à l'exécution de Heredis.
 ** @detail	Pour toutes modification apporté à ce fichier il faut mettre à jour le numéro de révision de la base de donnée
 **			celui-ci est la valeur par défaut assigné à DatabaseVersion de la table de Preferences.
 **			Ensuite, pour s'assurer que les données restent cohérentes, vous devez aller dans le fichier HNFMDatabaseFiler
 **			Au début de ce fichier vous avez le bloc "methodes de conversion de format"
 **			Ajoutez votre methodes ici. Elle doit avoir la siganture HNFMDatabase* aConnection, int fromVersion, int toVersion
 **			ou aConnection est le fichier qui vient d'être ouvert et qui est à convertir, fromVersion est la version du fichier et
 *			toVersion est la version du programme actuelle. La Signature de cette fonction doit être en C.
 **			Ensuite il faut ajouter cette methode dans le tableau des methodes de conversion smUpdateFunctions un peu plus bas. Ajouter votre fonction à la fin 
 **			afin que l'ordre de conversion reste correct. Toujours laisser la valeur nil en dernier.
 **/

/*  liste des modifications sur la base, mettre à jour svp à chaque changement
 *  6  -> suppression du codeID dans la table des NumeroSosa
 *  7  -> suppression du codeID dans les tables :
 *          OrdreEnfants
 *          OrdreUnions
 *          LiensAdresses
 *          LiensTachesIndis
 *          LiensTachesAdresses
 *  8  -> recalcul des champs calculés (tables individus, événements et unions)
 *  9  -> force le recalcul des champs calculés (n'a pas été activé dans l'alpha16)
 * 10  -> ajout de la table DoublonsExclus qui mémorise les doublons détectés par Heredis comme n'étant pas des doublons
 * 11  -> vérification des unions monoparentales manquantes
 * 12  -> Correction des exeptions de prénoms
 * 13  -> nettoyage de la table de preference et des champs utilisateurs
 * 14  -> Ajout des champs d'identification supplémentaire pour les lieux (latitude, logitude, ...)
 * 15  -> force le recalcul des champs professions (intégration de la base de profession US)
 * 16  -> Ajout des triggers pour les champs calculés
 * 17  -> Localisation des lieux déjà présents dans la base
 * 18  -> Correction sur les dates mal enregistrées dans la saisie de groupe
 * 19  -> Ajout des triggers sur la date de modification des individus
 * 20  -> Recopie les médias dans le bundle
 * 21  -> Ajout de la liste des particules dans la tables des préférences pour compatibilité avec le PC
 * 22  -> Modification des noms des fichiers des médias dans le bundle pour compatibilité Windows
 * 23  -> Ne pas utiliser, passer directement à 24. 23 est utilisé pour passer une moulinette à la 22 sans changer de numéro de version.
 * 100 -> Passage en version suppérieur de Heredis. Bloque la compatibilité
 * 101 -> Table Lieux / champ Ville : remplacement des chaînes vides par "?"
 * 102 -> Table Notes : moulinette pour mettre le bon type pour les notes de source (elles étaient enregistrées avec le type Lieu)
 * 103 -> Ajout des tables LogsRechercheEnLigne et BranchesMemorisees
 * 104 -> Mise à jour des triggers
 * 105 -> correction du trigger ComputeNoteIndividuInsert pour gestion des types de notes
 * 106 -> 105, suite
 * 107 -> - Table Lieux : recalcul du champ UCD pour la ville
          - Table Notes : recalcul du champ TypeNote
 * 108 -> Moulinette sur les dates de tri de la table Individus, pour les fichiers venant du PC avant la version 14.
 * 200 -> Passage en version 4 de Heredis :
        - Table MediasCadres
        - Date utilisation lieu
 * 201 -> Table Evenements : ajout du boolen Shared
 * 202 -> Intégration des médias haute résolution
 */

CREATE TABLE Preferences (
  VersionText           char(32) DEFAULT 0,     /* Contiens le numéro de version du programme ayant créé le fichier forme HEREDIS_OSX 0.9.3 ou HEREDIS_PC 13.0, HEREDIS_IOS 0.9.1 ...*/
  IDFichier             integer DEFAULT 0,      /* non utilisé  compatibilite PC*/
  NextID                integer DEFAULT 0,      /* contient l'id suivant a assigner à un individu ou objet Heredis */
  Num1Sosa              integer DEFAULT 0,      /* numéro 1 sosa du fichier */
  UserName              text DEFAULT "",        /* nom de l'utilisateur, jamais demandé */
  UserComment           text DEFAULT "",        /* commentaire de l'utilisateur, jamais demandé */
  UserField             text DEFAULT "",        /* champ supplémentaire de l'utilisateur, jamais demandé */
  DateCreation          timestamp DEFAULT 0,    /* date de création du fichier */    
  DateModification      timestamp DEFAULT 0,    /* date de modification du fichier */
  LocalisationEvent	text DEFAULT "",        /* langue pour la localisation des événements */
  Signature		text DEFAULT "",        /* signature de la base : calculé à la sauvegarde */
  GUID			text DEFAULT "",        /* UUID unique pour ce fichier */
  LastModifier          char(32) DEFAULT 0,     /* Contiens le numéro de version du programme ayant en dernier modifié le fichier */

  DatabaseVersion	integer DEFAULT 202,     /* Numéro de version de la base de donnée. doit être incrémenté à chaque modification de la base, pensez egalement a mettre a jour le commentaire listant les modifications */
  Particules            text DEFAULT ""         /* Pour compatibilité avec le PC */
);

CREATE TABLE Adresses (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  NomsIndividus     text DEFAULT "",
  Adresse1          text DEFAULT "",
  Adresse2          text DEFAULT "",
  CodePostal        text DEFAULT "",
  Ville             text DEFAULT "",
  Pays              text DEFAULT "",
  Departement       text DEFAULT "",
  Adresse1bis       text DEFAULT "",
  Adresse2bis       text DEFAULT "",
  CodePostalbis     text DEFAULT "",
  Villebis          text DEFAULT "",
  Paysbis           text DEFAULT "",
  Departementbis    text DEFAULT "",
  Tel               text DEFAULT "",
  Fax               text DEFAULT "",
  Email             text DEFAULT "",
  Email2            text DEFAULT "",
  PageWeb           text DEFAULT "",
  Private           integer DEFAULT 0,
  TelPro            text DEFAULT "",
  TelPortable       text DEFAULT "",
  Adresse2Activee   boolean  DEFAULT 0
);

CREATE TABLE LiensAdresses (
  IndiPtr			integer DEFAULT NULL,
  AdressePtr		integer DEFAULT NULL
);

CREATE TABLE Evenements (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  CodeProprietaire  integer DEFAULT 0,
  CodeRepository    integer DEFAULT 0,
  EventType         integer DEFAULT 0,
  CodeLieu          integer DEFAULT 0,
  DateTri           double DEFAULT 0.0,
  DateGed           text DEFAULT "",
  TimeGed           text DEFAULT "",
  JourDeLAnnee		integer DEFAULT 0,
  Subdivision       text DEFAULT "",
  SubdivisionUCD    text DEFAULT "",
  Titre             text DEFAULT "",
  TitreUCD          text DEFAULT "",
  TriTitreUCD       text DEFAULT "",
  TriTypeUCD        text DEFAULT "",
  ShowInTypesList   boolean DEFAULT 1,
  AgeSurActe        text DEFAULT "",
  AgeLui            text DEFAULT "",
  AgeElle           text DEFAULT "",
  Cause             text DEFAULT "",
  CauseUCD          text DEFAULT "",
  RechercheActe     integer DEFAULT 0,
  Prive             boolean DEFAULT 0,
  NombreMedias	    integer DEFAULT 0,      /* Champs précalculé par code */
  NombreTemoins	    integer DEFAULT 0,      /* Champs précalculé par code */
  NombreSources	    integer DEFAULT 0,      /* Champs précalculé par code */
  CodeNote	    integer DEFAULT 0,      /* Champs précalculé par code */
  Shared            boolean DEFAULT 0
);

CREATE TABLE Individus (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  CodeUnionParents  integer DEFAULT 0,
  CodePere          integer DEFAULT 0,
  CodeMere          integer DEFAULT 0,
  CodeNom           integer DEFAULT 0,
  NomTri            text DEFAULT "",
  Prenoms           text DEFAULT "",
  PrenomsUCD        text DEFAULT "",
  Profession        text DEFAULT "",
  ProfessionUCD     text DEFAULT "",
  Sexe              integer DEFAULT 0,
  Numero            text DEFAULT "",
  SansPosterite     boolean DEFAULT 0,
  Signature         integer DEFAULT 0,
  Filiation         integer DEFAULT 0,
  Marque            boolean DEFAULT 0,
  Confidentiel      boolean DEFAULT 0,
  Secondaire        boolean DEFAULT 0,
  SansAlliance      boolean DEFAULT 0,
  Prefixe           text DEFAULT "",
  PrefixeUCD        text DEFAULT "",  
  Suffixe           text DEFAULT "",
  SuffixeUCD        text DEFAULT "",
  Surnom            text DEFAULT "",
  SurnomUCD         text DEFAULT "",
  Titre             text DEFAULT "",
  TitreUCD          text DEFAULT "",
  FicheComplete     boolean DEFAULT 0,
  FicheCoherente    boolean DEFAULT 0,
  Champ0            text DEFAULT "",
  Champ1            text DEFAULT "",
  Champ2            text DEFAULT "",
  Champ3            text DEFAULT "",
  Champ4            text DEFAULT "",
  Champ5            text DEFAULT "",
  Champ6            text DEFAULT "",
  Champ7            text DEFAULT "",
  Champ8            text DEFAULT "",
  Champ9            text DEFAULT "",
  Champ10            text DEFAULT "",
  Champ11            text DEFAULT "",
  Champ12            text DEFAULT "",
  MainEventNaissanceTri double,
  MainEventDecesTri double,
  AgeAuDecesTri		double DEFAULT 0,
  CodeMainEventDeces integer DEFAULT 0,
  CodeMainEventNaissance integer DEFAULT 0,
  NombreUnions		integer DEFAULT 0,      /* Champs précalculé par code */
  NombreEnfants		integer DEFAULT 0,      /* Champs précalculé par code */
  NombreMedias		integer DEFAULT 0,      /* Champs précalculé par code */
  CodeNote			integer DEFAULT 0       /* Champs précalculé par code */
);

CREATE VIRTUAL TABLE IndividusFullText USING fts4(
  XrefIndividu      integer PRIMARY KEY,
  PrenomsUCD        text DEFAULT "",
  ProfessionUCD     text DEFAULT ""
);

CREATE TABLE LiensIndividus (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  XrefOrigine       integer DEFAULT 0,
  XrefDestination   integer DEFAULT 0,
  TypeLienIndividu  integer DEFAULT 0,
  Commentaire       text DEFAULT "",
  Age               text DEFAULT "",
  Titre             text DEFAULT "",
  TagType           integer DEFAULT 0
);

CREATE TABLE NumerosSosa (
  CodeIndi			integer PRIMARY KEY ,
  SosaNum			sqlite_int64 DEFAULT 0,
  Multiple			boolean DEFAULT 0,
  FirstSosaNum		sqlite_int64 DEFAULT 0,
  Generation		integer DEFAULT 0,
  CodeDeCujus		integer DEFAULT 0
);

CREATE TABLE NumerosDescendance (
  CodeID			integer PRIMARY KEY,
  NumPelissier		text DEFAULT "",
  NumAboville		text DEFAULT "",
  CodeIndi			integer DEFAULT 0,
  Multiple			boolean DEFAULT 0,
  Generation		integer DEFAULT 0,
  CodeRacine		integer DEFAULT 0
);


CREATE TABLE LiensTachesAdresses (
  TachePtr			integer DEFAULT NULL,
  AdressesPtr		integer DEFAULT NULL
);

CREATE TABLE LiensTachesIndis (
  TachePtr			integer DEFAULT NULL,
  IndisPtr			integer DEFAULT NULL
);

CREATE TABLE Lieux (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  CodeLieu          text DEFAULT "",
  Ville             text DEFAULT "",
  Departement       text DEFAULT "",
  Region            text DEFAULT "",
  Pays              text DEFAULT "",
  CodeLieuUCD       text DEFAULT "",
  VilleUCD          text DEFAULT "",
  DepartementUCD    text DEFAULT "",
  RegionUCD         text DEFAULT "",
  PaysUCD           text DEFAULT "",
  Rattachement      integer DEFAULT 0,
  UppercaseByUser   boolean DEFAULT 0,
  Latitude          double DEFAULT 0.0,
  Longitude         double DEFAULT 0.0,
  IsoCountry        text DEFAULT "",
  InternalCodeLieu  integer DEFAULT 0,       /* code lieu interne */
  DateUtilisation	timestamp DEFAULT 0
);

CREATE TABLE Medias (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  DateModifFile		timestamp DEFAULT 0,
  DateUtilisation	timestamp DEFAULT 0,
  FilePath          text DEFAULT "",
  FilePathUCD		text DEFAULT "",
  FileName          text DEFAULT "",
  FileNameUCD		text DEFAULT "",
  DateGed           text DEFAULT "",
  DateTri           double,
  MediaIntegre      integer DEFAULT 0,
  Private           boolean DEFAULT 0,
  CodeGUID			text DEFAULT ""
);

CREATE TABLE MediasCadres (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  XrefMediaOrigine  integer DEFAULT 0,  /* l'id de la photo où on a créé un cadre */
  XrefMediaNewMedia integer DEFAULT 0,  /* l'id de la photo créée avec le cadre */
  XrefProprietaire  integer DEFAULT 0,  /* l'id du propriétaire associé au cadre, un individu pour l'instant */
  left              double DEFAULT 0,
  top               double DEFAULT 0,
  right             double DEFAULT 0,
  bottom            double DEFAULT 0
);

CREATE TABLE LiensMedias (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  XrefMedia         integer DEFAULT 0,
  XrefProprietaire  integer DEFAULT 0,
  Ordre             integer DEFAULT 0,
  Cadre             text DEFAULT "",
  MediaPrincipal    boolean DEFAULT 0
);

CREATE TABLE Notes (
  CodeID            integer PRIMARY KEY,
  CodeProprietaire  integer DEFAULT "",
  TypeNote          integer DEFAULT 0,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  Note              text DEFAULT "",
  NoteRTF           text DEFAULT "",
  NotePrivee        boolean DEFAULT 0
);

CREATE TABLE Noms (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  Nom               text DEFAULT "",
  NomTri            text DEFAULT "",
  NomUCD            text DEFAULT "",
  Rattachement      integer DEFAULT 0,
  UppercaseByUser   boolean DEFAULT 0
);

CREATE TABLE Prenoms (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  Prenom            text DEFAULT "",
  PrenomUCD         text DEFAULT "",
  SexeDefaut        integer DEFAULT 0,
  Rattachement      integer DEFAULT 0,
  UppercaseByUser   boolean DEFAULT 0
);

CREATE TABLE LiensPrenoms (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  XrefIndividu      integer DEFAULT 0,
  XrefPrenom        integer DEFAULT 0,
  Usuel             boolean DEFAULT 0
);

CREATE TABLE Favoris (
  CodeID            integer PRIMARY KEY,
  XrefIndividu      integer DEFAULT 0,       /* Attention, si le favori est un séparateur, le champ est égal à -1 */  
  Titre             text DEFAULT ""
);

CREATE TABLE OrdreEnfants (
  idOrdreEnfants	integer DEFAULT 0
);

CREATE TABLE OrdreUnions (
  idOrdreUnions		integer DEFAULT 0
);

CREATE TABLE Redactions (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  Proprietaire      integer DEFAULT 0,
  Redaction         text DEFAULT "",
  Type              integer DEFAULT 0
);

CREATE TABLE Sources (
  CodeID              integer PRIMARY KEY,
  DateCreation        timestamp DEFAULT 0,
  DateModification    timestamp DEFAULT 0,
  DateUtilisation     timestamp DEFAULT 0,
  TypeSource          integer DEFAULT 0,
  NatureActe          integer DEFAULT 0,
  Certitude           integer DEFAULT 0,
  SourcePrivee        boolean DEFAULT 0,
  Titre               text DEFAULT "",
  Document            text DEFAULT "",
  Cote                text DEFAULT "",
  Archivage           text DEFAULT "",
  Numero              text DEFAULT "",
  Auteur              text DEFAULT "",
  Email               text DEFAULT "",
  Url                 text DEFAULT "",
  DateGED             text DEFAULT "",
  Repository          text DEFAULT "",
  TitreUCD            text DEFAULT "",
  DocumentUCD         text DEFAULT "",
  CoteUCD             text DEFAULT "",
  ArchivageUCD        text DEFAULT "",
  NumeroUCD           text DEFAULT "",
  AuteurUCD           text DEFAULT "",
  RepositoryUCD       text DEFAULT ""
);

CREATE TABLE LiensSources (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  XrefProprietaire  integer DEFAULT 0,
  TypeProprietaire  integer DEFAULT 0,
  XrefSource        integer DEFAULT 0,
  Citation          text DEFAULT ""
);

CREATE TABLE Taches (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  DateEcheanceGed   text DEFAULT "",
  DateAlerteGed     text DEFAULT "",
  Titre             text DEFAULT "",
  Description       text DEFAULT "",
  Priorite          integer DEFAULT 0,
  TacheRealisee     boolean DEFAULT 0
);

CREATE TABLE Unions (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  Epoux             integer DEFAULT 0,
  Epouse            integer DEFAULT 0,
  TypeUnion         integer DEFAULT 0,
  TypeUnionUCD      text DEFAULT "",
  StatutUnion       integer DEFAULT 0,
  Confidentiel      boolean DEFAULT 0,
  Champs            text DEFAULT "",
  Marque            boolean DEFAULT 0,
  MainEventMariageTri double,
  CodeMainEventMariage integer DEFAULT 0,
  AgeUnionEpouxTri	double DEFAULT 0,
  AgeUnionEpouseTri	double DEFAULT 0,
  NombreEnfants		integer DEFAULT 0,      /* Champs précalculé par code */
  NombreMedias		integer DEFAULT 0,      /* Champs précalculé par code */
  CodeNote			integer DEFAULT 0       /* Champs précalculé par code */
);

CREATE TABLE ChampsUtilisateur (
  NumOrdre          integer DEFAULT 0,
  InUse             boolean DEFAULT 0,
  Intitule          text DEFAULT "",
  Tag				text DEFAULT ""
);

CREATE TABLE Professions (
  CodeID            integer PRIMARY KEY,
  DateCreation      timestamp DEFAULT 0,
  DateModification  timestamp DEFAULT 0,
  NomProfession     text DEFAULT "",
  NomProfessionUCD  text DEFAULT "",
  Rattachement      integer DEFAULT 0
);

CREATE TABLE LiensProfessionsIndi (
  CodeID            integer PRIMARY KEY,
  IndiPtr			integer DEFAULT NULL,
  ProfessionPtr		integer DEFAULT NULL
);

CREATE TABLE MediasVignette (
  CodeID			integer PRIMARY KEY,
  Vignette			blob DEFAULT NULL
);


CREATE TABLE DoublonsExclus (
XrefIndividu1 integer,
XrefIndividu2 integer,
PRIMARY KEY(XrefIndividu1, XrefIndividu2)
);

CREATE TABLE BranchesMemorisees (
  CodeID            integer PRIMARY KEY,
  XrefProprietaire  integer DEFAULT 0,
  TypeBranche       integer DEFAULT 0         /*(enum ascendance, descendance )*/
);

CREATE TABLE LogsRechercheEnLigne (
  CodeID            integer PRIMARY KEY,
  XrefProprietaire  integer DEFAULT 0,        /*(pour le moment un pointeur vers un indi)*/
  Titre             text DEFAULT "",
  URL               text DEFAULT "",
  DateCreation      timestamp DEFAULT 0
);


CREATE INDEX Evenements_Index01 ON Evenements (CodeProprietaire);
CREATE INDEX Evenements_Index02 ON Evenements (DateTri);
CREATE INDEX Evenements_Index03 ON Evenements (EventType, TitreUCD);
CREATE INDEX Evenements_Index04 ON Evenements (CodeLieu);

CREATE INDEX Individus_Index03 ON Individus (CodeMere);
CREATE INDEX Individus_Index04 ON Individus (MainEventNaissanceTri);
CREATE INDEX Individus_Index05 ON Individus (MainEventDecesTri);
CREATE INDEX Individus_Index06 ON Individus (CodeNom,NomTri,PrenomsUCD);
CREATE INDEX Individus_Index07 ON Individus (CodePere, CodeMere);
CREATE INDEX Individus_Index08 ON Individus (NomTri,PrenomsUCD,MainEventNaissanceTri,MainEventDecesTri);

CREATE INDEX LiensAdresses_Index01 ON LiensAdresses (IndiPtr);
CREATE INDEX LiensAdresses_Index02 ON LiensAdresses (AdressePtr);

CREATE INDEX LiensIndividus_Index01 ON LiensIndividus (TypeLienIndividu);
CREATE INDEX LiensIndividus_Index02 ON LiensIndividus (XrefOrigine);
CREATE INDEX LiensIndividus_Index03 ON LiensIndividus (XrefDestination);

CREATE INDEX LiensMedias_Index01 ON LiensMedias (XrefProprietaire);
CREATE INDEX LiensMedias_Index02 ON LiensMedias (XrefMedia);

CREATE INDEX LiensPrenoms_Index_XrefIndividu ON LiensPrenoms (XrefIndividu);
CREATE INDEX LiensPrenoms_Index_XrefPrenom ON LiensPrenoms (XrefPrenom);

CREATE INDEX LiensProfessionsIndi_Index01 ON LiensProfessionsIndi (IndiPtr);
CREATE INDEX LiensProfessionsIndi_Index02 ON LiensProfessionsIndi (ProfessionPtr);

CREATE INDEX LiensSources_Index01 ON LiensSources (XrefProprietaire);
CREATE INDEX LiensSources_Index02 ON LiensSources (XrefSource);

CREATE INDEX Lieux_Index01 ON Lieux (VilleUCD);
CREATE INDEX Lieux_Index02 ON Lieux (Latitude,Longitude);
CREATE INDEX Lieux_Index03 ON Lieux (Rattachement);

CREATE INDEX Medias_Index02 ON Medias (DateTri);
CREATE INDEX Medias_Index03 ON Medias (FilePath);
CREATE INDEX Medias_Index04 ON Medias (FileNameUCD);

CREATE INDEX Noms_Index01 ON Noms (Nom);
CREATE INDEX Noms_Index02 ON Noms (NomTri);
CREATE INDEX Noms_Index03 ON Noms (NomUCD);
CREATE INDEX Noms_Index04 ON Noms (Rattachement);

CREATE INDEX Notes_Index01 ON Notes (CodeProprietaire);

CREATE INDEX NumerosSosa_Index01 ON NumerosSosa (CodeIndi);
CREATE INDEX NumerosDescendance_Index01 ON NumerosDescendance (CodeIndi);

CREATE INDEX Prenoms_Index_PrenomUCD ON Prenoms (PrenomUCD);
CREATE INDEX Prenoms_Index02 ON Prenoms (Rattachement);

CREATE INDEX Professions_Index01 ON Professions (Rattachement);
CREATE INDEX Professions_Index02 ON Professions (NomProfessionUCD);

CREATE INDEX Sources_Numero ON Sources (NumeroUCD);
CREATE INDEX Sources_Titre ON Sources (TitreUCD);
CREATE INDEX Sources_Repository ON Sources (RepositoryUCD);
CREATE INDEX Sources_Document ON Sources (DocumentUCD);

CREATE INDEX Unions_Index04 ON Unions (Epoux,Epouse);
CREATE INDEX Unions_Index02 ON Unions (Epouse);
CREATE INDEX Unions_Index03 ON Unions (MainEventMariageTri);    

CREATE INDEX LogsRechercheEnLigne_XrefProprietaire ON LogsRechercheEnLigne (XrefProprietaire);

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 			ATTENTION : Les triggers ont été modifié afin de séparer la mise à jour des donné précalculé et
 *						les dates de modification. Tous les triggers sur les dates doivent commencer par le mot
 *						MajDate... afin qu'ils puissent être identifié facilement
 *!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

/*------------------------------------------------------------------------------------------------------
 * Triggers pour le champs précalculé du nombre d'enfant pour père 
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeEnfantsPereInsert"
AFTER INSERT ON Individus
FOR EACH ROW
WHEN NEW.CodePere != 0
BEGIN
    UPDATE Individus SET NombreEnfants=NombreEnfants+1 WHERE Individus.CodeID=NEW.CodePere ;
END;

CREATE TRIGGER "ComputeEnfantsPereUpdate"
AFTER UPDATE OF CodePere ON Individus
FOR EACH ROW
WHEN OLD.CodePere != NEW.CodePere
BEGIN
    UPDATE Individus SET NombreEnfants=NombreEnfants-1 WHERE Individus.CodeID=OLD.CodePere ;
    UPDATE Individus SET NombreEnfants=NombreEnfants+1 WHERE Individus.CodeID=NEW.CodePere ;
END;

CREATE TRIGGER "ComputeEnfantsPereDelete"
AFTER DELETE ON Individus
FOR EACH ROW
WHEN OLD.CodePere != 0
BEGIN
    UPDATE Individus SET NombreEnfants=NombreEnfants-1 WHERE Individus.CodeID=OLD.CodePere ;
END;

CREATE TRIGGER "MajDatePereInsert"
AFTER INSERT ON Individus
FOR EACH ROW
WHEN NEW.CodePere != 0
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodePere ;
END;

CREATE TRIGGER "MajDatePereUpdate"
AFTER UPDATE OF CodePere ON Individus
FOR EACH ROW
WHEN OLD.CodePere != NEW.CodePere
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.CodePere ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodePere ;
END;

CREATE TRIGGER "MajDatePereDelete"
AFTER DELETE ON Individus
FOR EACH ROW
WHEN OLD.CodePere != 0
BEGIN
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.CodePere ;
END;


/*------------------------------------------------------------------------------------------------------
 * Triggers pour le champs précalculé du nombre d'enfant pour la mère 
 *----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeEnfantsMereInsert"
AFTER INSERT ON Individus
FOR EACH ROW
WHEN NEW.CodeMere != 0
BEGIN
    UPDATE Individus SET NombreEnfants=NombreEnfants+1 WHERE Individus.CodeID=NEW.CodeMere ;
END;

CREATE TRIGGER "ComputeEnfantsMereUpdate"
AFTER UPDATE OF CodeMere ON Individus
FOR EACH ROW
WHEN OLD.CodeMere != NEW.CodeMere
BEGIN
    UPDATE Individus SET NombreEnfants=NombreEnfants-1 WHERE Individus.CodeID=OLD.CodeMere ;
    UPDATE Individus SET NombreEnfants=NombreEnfants+1 WHERE Individus.CodeID=NEW.CodeMere ;
END;

CREATE TRIGGER "ComputeEnfantsMereDelete"
AFTER DELETE ON Individus
FOR EACH ROW
WHEN OLD.CodeMere != 0
BEGIN
    UPDATE Individus SET NombreEnfants=NombreEnfants-1 WHERE Individus.CodeID=OLD.CodeMere ;
END;

CREATE TRIGGER "MajDateMereInsert"
AFTER INSERT ON Individus
FOR EACH ROW
WHEN NEW.CodeMere != 0
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodeMere ;
END;

CREATE TRIGGER "MajDateMereUpdate"
AFTER UPDATE OF CodePere ON Individus
FOR EACH ROW
WHEN OLD.CodeMere != NEW.CodeMere
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.CodeMere ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodeMere ;
END;

CREATE TRIGGER "MajDateMereDelete"
AFTER DELETE ON Individus
FOR EACH ROW
WHEN OLD.CodeMere != 0
BEGIN
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.CodeMere ;
END;

/*------------------------------------------------------------------------------------------------------
* Triggers pour le champs précalculé du nombre d'enfant pour l'union
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeEnfantsUnionInsert"
AFTER INSERT ON Individus
FOR EACH ROW
WHEN NEW.CodeUnionParents != 0
BEGIN
    UPDATE Unions SET NombreEnfants=NombreEnfants+1 WHERE Unions.CodeID=NEW.CodeUnionParents ;
END;

CREATE TRIGGER "ComputeEnfantsUnionUpdate"
AFTER UPDATE OF CodeUnionParents ON Individus
FOR EACH ROW
WHEN OLD.CodeUnionParents != NEW.CodeUnionParents
BEGIN
    UPDATE Unions SET NombreEnfants=NombreEnfants-1 WHERE Unions.CodeID=OLD.CodeUnionParents ;
    UPDATE Unions SET NombreEnfants=NombreEnfants+1 WHERE Unions.CodeID=NEW.CodeUnionParents ;
END;

CREATE TRIGGER "ComputeEnfantsUnionDelete"
AFTER DELETE ON Individus
FOR EACH ROW
WHEN OLD.CodeUnionParents != 0
BEGIN
    UPDATE Unions SET NombreEnfants=NombreEnfants-1 WHERE Unions.CodeID=OLD.CodeUnionParents ;
END;

/*------------------------------------------------------------------------------------------------------
* Triggers pour le champs précalculé du nombre de médias 
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeMediasInsert"
AFTER INSERT ON LiensMedias
FOR EACH ROW
BEGIN
    UPDATE Individus SET NombreMedias=NombreMedias+1 WHERE Individus.CodeID=NEW.XrefProprietaire ;
    UPDATE Evenements SET NombreMedias=NombreMedias+1 WHERE Evenements.CodeID=NEW.XrefProprietaire ;
    UPDATE Unions SET NombreMedias=NombreMedias+1 WHERE Unions.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "ComputeMediasUpdate"
AFTER UPDATE OF XrefProprietaire ON LiensMedias
FOR EACH ROW
WHEN OLD.XrefProprietaire != NEW.XrefProprietaire
BEGIN
    UPDATE Individus SET NombreMedias=NombreMedias-1 WHERE Individus.CodeID=OLD.XrefProprietaire ;
    UPDATE Individus SET NombreMedias=NombreMedias+1 WHERE Individus.CodeID=NEW.XrefProprietaire ;
    
    UPDATE Evenements SET NombreMedias=NombreMedias-1 WHERE Evenements.CodeID=OLD.XrefProprietaire ;
    UPDATE Evenements SET NombreMedias=NombreMedias+1 WHERE Evenements.CodeID=NEW.XrefProprietaire ;
    
    UPDATE Unions SET NombreMedias=NombreMedias-1 WHERE Unions.CodeID=OLD.XrefProprietaire ;
    UPDATE Unions SET NombreMedias=NombreMedias+1 WHERE Unions.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "ComputeMediasDelete"
AFTER DELETE ON LiensMedias
FOR EACH ROW
BEGIN
    UPDATE Individus SET NombreMedias=NombreMedias-1 WHERE Individus.CodeID=OLD.XrefProprietaire ;
    UPDATE Evenements SET NombreMedias=NombreMedias-1 WHERE Evenements.CodeID=OLD.XrefProprietaire ;
    UPDATE Unions SET NombreMedias=NombreMedias-1 WHERE Unions.CodeID=OLD.XrefProprietaire ;
END;

CREATE TRIGGER "MajDateMediasInsert"
AFTER INSERT ON LiensMedias
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.XrefProprietaire ;
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.XrefProprietaire ;
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "MajDateMediasUpdate"
AFTER UPDATE OF XrefProprietaire ON LiensMedias
FOR EACH ROW
WHEN OLD.XrefProprietaire != NEW.XrefProprietaire
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.XrefProprietaire ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.XrefProprietaire ;
    
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=OLD.XrefProprietaire ;
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.XrefProprietaire ;
    
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=OLD.XrefProprietaire ;
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "MajDateMediasDelete"
AFTER DELETE ON LiensMedias
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.XrefProprietaire ;
    UPDATE Evenements SET DateModification=datetime('now') WHERE Evenements.CodeID=OLD.XrefProprietaire ;
    UPDATE Unions SET DateModification=datetime('now') WHERE Unions.CodeID=OLD.XrefProprietaire ;
END;

/*------------------------------------------------------------------------------------------------------*
 * Triggers pour le champs précalculé du nombre d'unions pour un individu                               *
 *------------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeNombreUnionsIndividuInsert"
AFTER INSERT ON Unions
FOR EACH ROW
WHEN NEW.Epoux > 0 AND NEW.Epouse > 0
BEGIN
    UPDATE Individus SET NombreUnions=NombreUnions+1 WHERE Individus.CodeID = NEW.Epoux OR Individus.CodeID = NEW.Epouse ;
END;

CREATE TRIGGER "ComputeNombreUnionsIndividuUpdateOLD"
AFTER UPDATE OF Epoux, Epouse ON Unions
FOR EACH ROW
WHEN OLD.Epoux > 0 AND OLD.Epouse > 0
BEGIN
    UPDATE Individus SET NombreUnions=NombreUnions-1 WHERE Individus.CodeID = OLD.Epoux OR Individus.CodeID = OLD.Epouse ;
END;

CREATE TRIGGER "ComputeNombreUnionsIndividuUpdateNEW"
AFTER UPDATE OF Epoux, Epouse ON Unions
FOR EACH ROW
WHEN NEW.Epoux > 0 AND NEW.Epouse > 0
BEGIN
    UPDATE Individus SET NombreUnions=NombreUnions+1 WHERE Individus.CodeID = NEW.Epoux OR Individus.CodeID = NEW.Epouse ;
END;

CREATE TRIGGER "ComputeNombreUnionsIndividuDelete"
AFTER DELETE ON Unions
FOR EACH ROW
WHEN OLD.Epoux > 0 AND OLD.Epouse > 0
BEGIN
    UPDATE Individus SET NombreUnions=NombreUnions-1 WHERE Individus.CodeID = OLD.Epoux OR Individus.CodeID = OLD.Epouse ;
END;

CREATE TRIGGER "MajDateUnionsInsert"
AFTER INSERT ON Unions
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID = NEW.Epoux OR Individus.CodeID = NEW.Epouse ;
END;

CREATE TRIGGER "MajDateUnionsUpdate"
AFTER UPDATE ON Unions
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID = OLD.Epoux OR Individus.CodeID = OLD.Epouse ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID = NEW.Epoux OR Individus.CodeID = NEW.Epouse ;
END;

CREATE TRIGGER "MajDateUnionsDelete"
AFTER DELETE ON Unions
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID = OLD.Epoux OR Individus.CodeID = OLD.Epouse ;
END;


/*------------------------------------------------------------------------------------------------------
 * Triggers pour le codeID de la note
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeNoteIndividuInsert"
AFTER INSERT ON Notes
FOR EACH ROW
WHEN NEW.CodeProprietaire != 0
BEGIN
    UPDATE Individus SET CodeNote=NEW.CodeID WHERE Individus.CodeID=NEW.CodeProprietaire AND NEW.TypeNote = 1 ;
    UPDATE Evenements SET CodeNote=NEW.CodeID WHERE Evenements.CodeID=NEW.CodeProprietaire ;
    UPDATE Unions SET CodeNote=NEW.CodeID WHERE Unions.CodeID=NEW.CodeProprietaire ;
END;

CREATE TRIGGER "ComputeNoteIndividuUpdate"
AFTER UPDATE OF CodeProprietaire ON Notes
FOR EACH ROW
WHEN OLD.CodeProprietaire != NEW.CodeProprietaire
BEGIN
    UPDATE Individus SET CodeNote=0 WHERE Individus.CodeID=OLD.CodeProprietaire AND OLD.TypeNote = 1 ;
    UPDATE Individus SET CodeNote=NEW.CodeID WHERE Individus.CodeID=NEW.CodeProprietaire AND NEW.TypeNote = 1 ;

    UPDATE Evenements SET CodeNote=0 WHERE Evenements.CodeID=OLD.CodeProprietaire ;
    UPDATE Evenements SET CodeNote=NEW.CodeID WHERE Evenements.CodeID=NEW.CodeProprietaire ;
    
    UPDATE Unions SET CodeNote=0 WHERE Unions.CodeID=OLD.CodeProprietaire ;
    UPDATE Unions SET CodeNote=NEW.CodeID WHERE Unions.CodeID=NEW.CodeProprietaire ;
END;

CREATE TRIGGER "MajDateNoteUpdate"
AFTER UPDATE ON Notes
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.CodeProprietaire ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodeProprietaire ;
   
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=OLD.CodeProprietaire ;
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.CodeProprietaire ;
    
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=OLD.CodeProprietaire ;
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=NEW.CodeProprietaire ;
END;

CREATE TRIGGER "ComputeNoteIndividuDelete"
AFTER DELETE ON Notes
FOR EACH ROW
WHEN OLD.CodeProprietaire != 0
BEGIN
    UPDATE Individus SET CodeNote=0 WHERE Individus.CodeID=OLD.CodeProprietaire AND OLD.TypeNote = 1 ;
    UPDATE Evenements SET CodeNote=0 WHERE Evenements.CodeID=OLD.CodeProprietaire ;
    UPDATE Unions SET CodeNote=0 WHERE Unions.CodeID=OLD.CodeProprietaire ;
END;
CREATE TRIGGER "MajDateNoteIndividuInsert"
AFTER INSERT ON Notes
FOR EACH ROW
WHEN NEW.CodeProprietaire != 0
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodeProprietaire AND (NEW.TypeNote = 1 OR NEW.TypeNote = 12) ;
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.CodeProprietaire ;
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=NEW.CodeProprietaire ;
END;

CREATE TRIGGER "MajDateNoteIndividuDelete"
AFTER DELETE ON Notes
FOR EACH ROW
WHEN OLD.CodeProprietaire != 0
BEGIN
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.CodeProprietaire AND (OLD.TypeNote = 1 OR OLD.TypeNote = 12) ;
    UPDATE Evenements SET DateModification=datetime('now') WHERE Evenements.CodeID=OLD.CodeProprietaire ;
    UPDATE Unions SET DateModification=datetime('now') WHERE Unions.CodeID=OLD.CodeProprietaire ;
END;


/*------------------------------------------------------------------------------------------------------
* Triggers pour le champs précalculé du nombre de source pour un événement
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeSourceInsertEvenement"
AFTER INSERT ON LiensSources
FOR EACH ROW
BEGIN
    UPDATE Evenements SET NombreSources=NombreSources+1 WHERE Evenements.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "ComputeSourceUpdateEvenement"
AFTER UPDATE OF XrefProprietaire ON LiensSources
FOR EACH ROW
WHEN OLD.XrefProprietaire != NEW.XrefProprietaire
BEGIN
    UPDATE Evenements SET NombreSources=NombreSources-1 WHERE Evenements.CodeID=OLD.XrefProprietaire ;
    UPDATE Evenements SET NombreSources=NombreSources+1 WHERE Evenements.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "MajDateSourceUpdateEvenement"
AFTER UPDATE ON LiensSources
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=OLD.XrefProprietaire ;
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "ComputeSourceDeleteEvenement"
AFTER DELETE ON LiensSources
FOR EACH ROW
BEGIN
    UPDATE Evenements SET NombreSources=NombreSources-1 WHERE Evenements.CodeID=OLD.XrefProprietaire ;
END;

CREATE TRIGGER "MajDateSourceInsertEvenement"
AFTER INSERT ON LiensSources
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.XrefProprietaire ;
END;

CREATE TRIGGER "MajDateSourceDeleteEvenement"
AFTER DELETE ON LiensSources
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=datetime('now') WHERE Evenements.CodeID=OLD.XrefProprietaire ;
END;

/*------------------------------------------------------------------------------------------------------
* Triggers pour le champs précalculé du nombre de témoins pour un événement 
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "ComputeTemoinsInsertEvenement"
AFTER INSERT ON LiensIndividus
FOR EACH ROW
BEGIN
    UPDATE Evenements SET NombreTemoins=NombreTemoins+1 WHERE Evenements.CodeID=NEW.XrefOrigine ;
END;

CREATE TRIGGER "ComputeTemoinsUpdateEvenement"
AFTER UPDATE OF XrefOrigine ON LiensIndividus
FOR EACH ROW
WHEN OLD.XrefOrigine != NEW.XrefOrigine
BEGIN
    UPDATE Evenements SET NombreTemoins=NombreTemoins-1 WHERE Evenements.CodeID=OLD.XrefOrigine ;
    UPDATE Evenements SET NombreTemoins=NombreTemoins+1 WHERE Evenements.CodeID=NEW.XrefOrigine ;
END;

CREATE TRIGGER "MajDateTemoinsUpdateEvenement"
AFTER UPDATE ON LiensIndividus
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=OLD.XrefOrigine ;
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.XrefOrigine ;
    
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.XrefOrigine ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.XrefDestination ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.XrefOrigine ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.XrefDestination ;
END;

CREATE TRIGGER "ComputeTemoinsDeleteEvenement"
AFTER DELETE ON LiensIndividus
FOR EACH ROW
BEGIN
    UPDATE Evenements SET NombreTemoins=NombreTemoins-1 WHERE Evenements.CodeID=OLD.XrefOrigine ;
END;

CREATE TRIGGER "MajDateTemoinsInsertEvenement"
AFTER INSERT ON LiensIndividus
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeID=NEW.XrefOrigine ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.XrefOrigine ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.XrefDestination ;
END;

CREATE TRIGGER "MajDateTemoinsDeleteEvenement"
AFTER DELETE ON LiensIndividus
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=datetime('now') WHERE Evenements.CodeID=OLD.XrefOrigine ;
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.XrefOrigine ;
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.XrefDestination ;
END;

/*------------------------------------------------------------------------------------------------------
 * Triggers pour la modification d'un événement
*----------------------------------------------------------------------------------------------------*/

CREATE TRIGGER "MajDateEvenementInsert"
AFTER INSERT ON Evenements
FOR EACH ROW
WHEN NEW.CodeProprietaire != 0
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodeProprietaire ;
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=NEW.CodeProprietaire ;
END;

CREATE TRIGGER "MajDateEvenementUpdate"
AFTER UPDATE ON Evenements
FOR EACH ROW
BEGIN
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=OLD.CodeProprietaire ;
    UPDATE Individus SET DateModification=MAX(NEW.DateModification, Individus.DateModification) WHERE Individus.CodeID=NEW.CodeProprietaire ;
    
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=OLD.CodeProprietaire ;
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.CodeID=NEW.CodeProprietaire ;
END;

CREATE TRIGGER "MajDateEvenementDelete"
AFTER DELETE ON Evenements
FOR EACH ROW
WHEN OLD.CodeProprietaire != 0
BEGIN
    UPDATE Individus SET DateModification=datetime('now') WHERE Individus.CodeID=OLD.CodeProprietaire ;
    UPDATE Unions SET DateModification=datetime('now') WHERE Unions.CodeID=OLD.CodeProprietaire ;
END;

/*------------------------------------------------------------------------------------------------------
 * Triggers pour la Mise à jour d'un événement après le changement du lieu
 *----------------------------------------------------------------------------------------------------*/
CREATE TRIGGER "MajDateEvenementUpdateLieux"
AFTER UPDATE ON Lieux
FOR EACH ROW
BEGIN
    UPDATE Evenements SET DateModification=MAX(NEW.DateModification, Evenements.DateModification) WHERE Evenements.CodeLieu=NEW.codeID ;
END;

/*------------------------------------------------------------------------------------------------------
 * Triggers pour la Mise à jour d'une union après la modification du nom ou du prénom d'un individu
 *----------------------------------------------------------------------------------------------------*/
CREATE TRIGGER "MajDateUnionUpdateIndividu"
AFTER UPDATE OF NomTri, Prenoms ON Individus
FOR EACH ROW
BEGIN
    UPDATE Unions SET DateModification=MAX(NEW.DateModification, Unions.DateModification) WHERE Unions.Epoux=NEW.CodeID OR Unions.Epouse=NEW.CodeID ;
END;
