/**
 * At revision: 6492
 * @type L.MarkerClusterGroup : Class permettant un groupe de markers
 */
//var tabEvtsMajeur=[];
var markers; // Tableau des Markers 
var map; // pour la carte
//var baseMaps; //pour les  tuiles 
var sidebar; // variable du volet qi s'ouvre apres clic sr un lieu ou un individu
var tabLieuxEvtsMajeur =[]; // tableau des lieux ayant au moins un evenement majeur
var tabIndivEvtsMajeur =[]; // tableau des individus ayant au moins un evenement majeur
var listeEclaire = [];  // // tableau contenant les ID desevenements pour la liste eclaire
var resultatFiltreNom = [];  // tableau contenant les noms des individus pour la fonction de recherche ( autocompletion)
var resultatFiltrePrenom = []; // tableau contenant les prenoms des individus pour la fonction de recherche ( autocompletion)
var t = [];  
var tt = [];
var tabLieuxNonPlaces=[]; // tablau des lieux nons placés sur la carte
var evenementsMajeur = []; // tableau contenant les evenements majeurs
var tabDate = [];          //tableau contenant toutes les dates pour le diaporama par periode
var tabDateMAJ = [];       //   tableau contenant les dates des evenements majeurs pour le diaporama par periode
var tableauIndvAvecEvenMajeur = []; 
var tabGeneration = [];    // tableau contenant toutes les generations
var tabGenerationMAJ = [];  // tableau contenant les generations des des individus ayant un evenement majeur
var tabEvts = new Object();  // tableau assicatif 
var tabEvtsMajeurs = new Object();
var tablieux = new Object();
var tabIndividus = new Object();
var Evenements = [];
var lieux = [];
var Individus = [];
var mespoi;  // point d'interet
var zoom;  
var FiltreEvenement=1;
var FiltreModeRepresentation=1;
var filtreLieux=1;
var filtreBoutonIndividu=1;
var FiltreZoom;
// constantes pour la gestion des filtres
// filtre individu
var	mliTouslesIndis = "0" ;
var	mliIndisMarques = "1" ; 
var	mliAscendance   = "2" ;
var	mliDescendance	= "3" ;
var defautOpenMode = "ascendants" ;
//test si il y a aucun lieu non géolocalisé
var nongeolocalise=false;
// filtre evenements
var feTousEvts = "0" ;
var feMajeur   = "1" ;
// filtre mode de représentation
var mrDensite    = "0" ;
var mrPeriode    = "1" ;
var mrGeneration = "2" ;
// Onglet courrant
var ocIndividu   = "0" ;
var ocLieux      = "1" ;
// filtre sur les lieux
var flTous 			 = "0" ;
var flPlusRepresente = "1" ;
var flNonGeolocalise = "2" ;
var flVisible		 = "3" ;

// var frise
var  awesome;
var  awesome2;
// variable d'échange avec Heredis
var params = {};
var closeParams = "Parametres de fermeture" ;
 // si on est en mode pause ou play pour generation et periode
 var pausePlay=false;
  var pausePlay2=false;
// affichage des POI 
var MaxZoomPOI = 10 ;
// bordes de la frise
var b_debut=0;
var b_fin=0;
var b_debutgeneration=0;
var b_fingeneration=0;
// un seul timer pour tous
var timer=0;
/**
 ** @brief	permet analyser la ligne url afin d'en trouver isoler les paramétres
 ** @detail à la fin la variable QueryString contiens un tableau avec chacun des arguments
 **/  
var QueryString = function () 
{
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) 
	{
		var pair = vars[i].split("=");
    	// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") 
		{
			query_string[pair[0]] = pair[1];
			// If second entry with this name
			//console.log(pair[0]);
			//console.log(pair[1]);
		} 
		else if (typeof query_string[pair[0]] === "string") 
		{
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		
			// If third or later entry with this name
		} 
		else 
		{
			query_string[pair[0]].push(pair[1]);
			
		}
	} 
	return query_string;
} ();	

 /**
  * classe LatitudeLongitude
  * @returns {LatiLongi}
  */
function LatiLongi() {
    this.La;
    this.Lo;
}
/**
 *  classe DetailIndiv: pour l'affichage du detail de l'individu 
 * @returns {DetailIndiv}
 */
function DetailIndiv(){
    this.T;
    this.C;
    this.V;
    this.D;
    this.La;
    this.DT;   
}
/**
 * 
 * @returns {DetailLieu} :classe DetailIndiv: pour l'affichage du detail de l'individu 
 */

function DetailLieu(){
    this.i1;
    this.i2;
    this.V;
    this.D;
    this.DT;   
    this.T;   
    this.S;
}
//******************************CONSCTRUCTION ICON *****************************************************************************************
/**
 * CONSCTRUCTION ICON POUR MARKER
 * @type @exp;L@call;icon
 */
var myIcon = L.icon({
    iconUrl: 'images/markers/marker-event-fami.png',
    //iconRetinaUrl: 'images/markers/marker-event-fami.png',
	     // iconSize: [38, 95],
    iconAnchor: [40, 63],
    //popupAnchor: [-33, -76]
});
//******************************FIN CONSCTRUCTION ICON *****************************************************************************************

// **************************** méthode de réponce aux interraction sur les liste de travail ***********************
/**
 ** @brief	click sur tous les événements
 **/
function goTousEvenementClick()
{
	FiltreEvenement=1;
	params['FiltreEvts'] = feTousEvts ;
	closeParams =  JSON.stringify( params ) ;
	//$('#nombrerecherche').val("(" + lieux.length + " lieux)");
	//$('#nombrerecherche2').val("(" + Individus.length + " individus)");
	//$("#valeurcombo")[0].selectedIndex = "A";
	$('#liste').html("");
	if (markers !== undefined) 
	{
		removeAllMarkers();
	}
	        if ($('#parperiode').is(':checked'))
            {		
				//var val=awesome.slider("values", 1) + awesome.slider("option", "step");
		     filtre= new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));   
              //RepartionParPeriode(ui.values[0] , ui.values[1],Evenements);       		   
             //markerClick(tabEvts, a,filtre);
			 afficheMarkers(tabEvts,filtre);
		    }
			if ($('#pargeneration').is(':checked'))
            {		
				filtre= new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  
				// markerClick(tabEvts, a,filtre);
				afficheMarkers(tabEvts,filtre);
		    }
			if ($('#densite').is(':checked'))
			{
			     //markerClick(tabEvts, a,new TFiltreInterval(0,0));
				 afficheMarkers(tabEvts,new TFiltreInterval(0,0));
			}
    /*	
	var listelieux = affichagelisteLieux(lieux);
	var listeindiv = affichagelisteIndividus(Individus);
	document.getElementById("liste2").innerHTML = listelieux;
	document.getElementById("liste").innerHTML = listeindiv;
	*/
   var texte = $('#valeurcombo option:selected').val();
           
	if (texte === "A") // Tous les lieux
	{
		goLieuxTousClick() ;
		//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
	}
	// ***********B= lieux plus representés************
	else if (texte === "B") 
	{
		goLieuxPlusRepresenteClick() ;
		//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
	}
	// *********** C =lieux non places************
	else if (texte === "C") 
	{
		goLieuxNonPlaceClick() ;
		//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
	}
	// *********** D = lieux visibles************
	else if (texte === "D") 
	{     
		goLieuxVisibleClick() ;
		//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
	}
	 if(($('#nom').val()!=="")||($('#prenom').val()!==""))
	{ 
			traitementListeIndividusAvecChampsRech();
    }
	else
	{   
	     if(Individus.length===1)
		 {
		 $('#nombrerecherche2').val("(" + Individus.length + " "+$individu+")");
		 }
		 else
		 {
		 $('#nombrerecherche2').val("(" + Individus.length + " "+$individus+")");
		 }
		
		var listeindiv = affichagelisteIndividus(Individus);
		document.getElementById("liste").innerHTML = listeindiv;
	}
	
}
/**
 ** @brief	click sur les événements majeurs 
 **/
function goEvenementMajeurClick()
{
	FiltreEvenement=2;
	params['FiltreEvts'] = feMajeur ;
	closeParams =  JSON.stringify( params ) ;

	//$("#valeurcombo")[0].selectedIndex = "A";
	goEvtsMajeurs();

}

/**
 ** @brief	click sur les densité
 **/
function goDensiteClick() 
{
	FiltreModeRepresentation=1;
	params['FiltreModeRep'] = mrDensite ;
	closeParams =  JSON.stringify( params ) ;

	document.getElementById('pargeneration').disabled=false;
	document.getElementById('parperiode').disabled=false;
	   $('#map').css({height:"100%"});
	$('#entete').hide();
	$('#entete2').hide();
	if ($('#tous').is(':checked')) 
	{
		if (markers !== undefined) 
		{
			removeAllMarkers();
			afficheMarkers(tabEvts,new TFiltreInterval(0,0));
		}
	}
	if ($('#evenement_majeurs').is(':checked')) 
	{  
		if (markers !== undefined) 
		{
			removeAllMarkers();
			//afficheAllMarkersEvtMAJ(tabLieuxEvtsMajeur);
						if ($('#parperiode').is(':checked'))
            {		
				//var val=awesome.slider("values", 1) + awesome.slider("option", "step");
		     filtre= new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));   
              //RepartionParPeriode(ui.values[0] , ui.values[1],Evenements);       		   
             //markerClick(tabEvts, a,filtre);
			 afficheAllMarkersEvtMAJ(tabEvtsMajeurs,filtre);
		    }
			if ($('#pargeneration').is(':checked'))
            {		
				filtre= new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  
				// markerClick(tabEvts, a,filtre);
				afficheAllMarkersEvtMAJ(tabEvtsMajeurs,filtre);
		    }
			if ($('#densite').is(':checked'))
			{
			     //markerClick(tabEvts, a,new TFiltreInterval(0,0));
				 afficheAllMarkersEvtMAJ(tabEvtsMajeurs,new TFiltreInterval(0,0));
			}
		}  
	}
}

/**
 ** @brief	click sur la représentation par période
 **/
function goPerdiodeClick()
{
	FiltreModeRepresentation=2;
	params['FiltreModeRep'] = mrPeriode ;
	closeParams =  JSON.stringify( params ) ;
	$('#messagealert').hide();

		//document.getElementById('parperiode').disabled=true;
		if ($('#tous').is(':checked')) 
		{
			periode(tabDate, Evenements);
		}
		if ($('#evenement_majeurs').is(':checked')) 
		{
			periode(tabDateMAJ, evenementsMajeur);
		}
	

}
/**
 ** @brief	click sur la représentation par génération
 **/
function goGenerationClick() 
{
	FiltreModeRepresentation=3;
	params['FiltreModeRep'] = mrGeneration ;
	closeParams =  JSON.stringify( params ) ;

	$('#messagealertgeneration').hide();
		//document.getElementById('pargeneration').disabled=true;
		if ($('#tous').is(':checked')) 
		{
			generation(tabGeneration, Evenements);
		}
		if ($('#evenement_majeurs').is(':checked')) 
		{
			generation(tabGenerationMAJ, evenementsMajeur);
		}

}
/**
 ** @brief	Choix de l'onglet Individu
 **/
function goIndividuClick() 
{
	filtreBoutonIndividu=2;
	params['Onglet'] = ocIndividu ;
	closeParams =  JSON.stringify( params ) ;
	
	// rechercheSurNom();
    //rechercheSurPrenom();
      
   if(($('#nom').val()!=="")||($('#prenom').val()!==""))
	{ 
		if(Individus.length>1000)
		{
			while( $('#op2').is(':visible'))
			{
			
				$('#conteneur').block(
				{ 
					message: '<h1>Veuillez patienter...</h1>', 
						 css: { border: '1px solid #000' } 
				}); 
				$('#op2').hide(); 
				//$(this).delay( 800 );
				/*
				if ($('#tous').is(':checked')) 
				{
				$('#nombrerecherche2').val("(" + Individus.length + " individus)");
				var listeindiv = affichagelisteIndividus(Individus);
				}
				if ($('#evenement_majeurs').is(':checked')) 
				{
				$('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " individus)");
				var listeindiv = affichagelisteIndividus(tabIndivEvtsMajeur);
				}
				document.getElementById("liste").innerHTML = listeindiv;
				*/
				//$('#nombrerecherche2').val("(" + Individus.length + " individus)");
				traitementListeIndividusAvecChampsRech();
				$('#op1').show();
			
			}		 
			setTimeout(function ()
			{
				$('#conteneur').unblock(); 
			},1000);
		}
		else
		{
			$('#op2').hide(); 
			traitementListeIndividusAvecChampsRech();
            //  traitementListeTousLesIndividus();
			$('#op1').show();
		}
    }
	else
	{
		if(Individus.length>1000)
		{
			while( $('#op2').is(':visible'))
			{
			
				$('#conteneur').block({ 
					message: '<h1>Veuillez patienter...</h1>', 
						 css: { border: '1px solid #000' } 
				}); 
				$('#op2').hide(); 
                  traitementListeTousLesIndividus(); 
				$('#op1').show();
			
			}
		 
			setTimeout(function ()
			{
				$('#conteneur').unblock(); 
			},1000);
		}
		else
		{
			$('#op2').hide(); 
			  traitementListeTousLesIndividus();		  
			$('#op1').show();
		}
	}
	

	$('#boutonlieu').removeClass('selectionne');
	$('#boutonlieu').addClass('nonselectionne');
	$('#boutonindividus').removeClass('nonselectionne');
	$('#boutonindividus').addClass('selectionne');
}
/**
 ** @brief	Choix de l'onglet Lieux
 **/
function goLieuxClick() 
{
   var tab=[];
	filtreBoutonIndividu=1;
	params['Onglet'] = ocLieux ;
	closeParams =  JSON.stringify( params ) ;
	
	if($('#lieu').val()!=="")
	{
		if(lieux.length>1000)
		{
			while( $('#op1').is(':visible'))
			{
				$('#conteneur').block(
				{ 
					message: '<h1>Veuillez patienter...</h1>', 
					css: { border: '1px solid #000' } 
				}); 
				
				$('#op1').hide();
		
				var texte = $('#valeurcombo option:selected').val();
           
				if (texte === "A") // Tous les lieux
				{
					goLieuxTousClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
				}
				// ***********B= lieux plus representés************
				else if (texte === "B") 
				{
					goLieuxPlusRepresenteClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
				}
				// *********** C =lieux non places************
				else if (texte === "C") 
				{
					goLieuxNonPlaceClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
				}
				// *********** D = lieux visibles************
				else if (texte === "D") 
				{     
					goLieuxVisibleClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
				}
						$('#op2').show();
					}
										   
					setTimeout(function ()
					{
						$('#conteneur').unblock(); 
					},1000);
	    }

	    else
		{
				$('#op1').hide();
	
			        var texte = $('#valeurcombo option:selected').val();
				// *********** A= Tous les lieux*******
				if (texte === "A") // Tous les lieux
				{
					goLieuxTousClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
				}
				// ***********B= lieux plus representés************
				else if (texte === "B") 
				{
					goLieuxPlusRepresenteClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
				}
				// *********** C =lieux non places************
				else if (texte === "C") 
				{
					goLieuxNonPlaceClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
				}
				// *********** D = lieux visibles************
				else if (texte === "D") 
				{     
					goLieuxVisibleClick() ;
					//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
				}
				$('#op2').show();   
		}
	}
    else
	{ 
		   if(lieux.length>1000)
			{
				while( $('#op1').is(':visible'))
				{
					$('#conteneur').block({ 
						message: '<h1>Veuillez patienter...</h1>', 
						css: { border: '1px solid #000' } 
					}); 
					
					$('#op1').hide();
				
					
					var texte = $('#valeurcombo option:selected').val();
					// *********** A= Tous les lieux*******
					if (texte === "A") // Tous les lieux
					{
						goLieuxTousClick() ;
						//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
					}
					// ***********B= lieux plus representés************
					else if (texte === "B") 
					{
						goLieuxPlusRepresenteClick() ;
					//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
					}
					// *********** C =lieux non places************
					else if (texte === "C") 
					{
						goLieuxNonPlaceClick() ;
					//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
					}
					// *********** D = lieux visibles************
					else if (texte === "D") 
					{     
						goLieuxVisibleClick() ;
					//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
					}
					$('#op2').show();
				}
									   
				setTimeout(function ()
				{
					$('#conteneur').unblock(); 
				},1000);
			}

			else
			{
				$('#op1').hide();
			
			    var texte = $('#valeurcombo option:selected').val();
				// *********** A= Tous les lieux*******
				if (texte === "A") // Tous les lieux
				{
					goLieuxTousClick() ;
				//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
				}
				// ***********B= lieux plus representés************
				else if (texte === "B") 
				{
					goLieuxPlusRepresenteClick() ;
				//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
				}
				// *********** C =lieux non places************
				else if (texte === "C") 
				{
					goLieuxNonPlaceClick() ;
				//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
				}
				// *********** D = lieux visibles************
				else if (texte === "D") 
				{     
					goLieuxVisibleClick() ;
				//	encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
				}
					
				$('#op2').show();   
			}
	}
	
	$('#boutonlieu').addClass('selectionne');
    $('#boutonlieu').removeClass('nonselectionne');
    $('#boutonindividus').removeClass('selectionne');
    $('#boutonindividus').addClass('nonselectionne');
}

/**
 ** @brief	Filtre sur les lieux : tous les lieux
 **/
function goLieuxTousClick() 
{
	filtreLieux=1;
	params["FiltreLieux"] = flTous ;
	closeParams =  JSON.stringify( params ) ;
	  var tab=[];
	//alert($('#lieu').val());
	if($('#lieu').val()!=="")
	{
	  
		if ($('#tous').is(':checked')) 
		{
	            for (var i = 0; i < lieux.length; i++) 
		        {   
                    if (CaracteresAccentues(lieux[i].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
					{

                        tab.push(lieux[i]);
                    }
                }
		    trytab(tab);
			var tt = affichagelisteLieux(tab); 
			if(lieux.length === 1)
			{
			$('#nombrerecherche').val("(" + tab.length +"/"+lieux.length + " "+$lieu+")");
			}
			else
			{
			$('#nombrerecherche').val("(" + tab.length +"/"+lieux.length + " "+$lieux+")");
			}
			$('#liste2').html('');
			$('#liste2').html(tt);
	    }
		 else
		if ($('#evenement_majeurs').is(':checked')) 
		{
		      for (var i = 0; i < tabLieuxEvtsMajeur.length; i++) 
			    {
                    if (CaracteresAccentues(tabLieuxEvtsMajeur[i].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
					{

                        tab.push(tabLieuxEvtsMajeur[i]);
                    }
                }
					trytab(tab);
			var tt = affichagelisteLieux(tab); 
			if(tabLieuxEvtsMajeur.length===1)
			{
			$('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxEvtsMajeur.length + " "+$lieu+")");
			}
			else
			{
			$('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxEvtsMajeur.length +  " "+$lieux+")");
			}
			
			$('#liste2').html('');
			$('#liste2').html(tt);	
		}
		 // alert(tab);
		
    }
	else
	{
		if ($('#tous').is(':checked')) 
		{
			trytab(lieux);
			var tmp = affichagelisteLieux(lieux);
			
			 
				if((lieux.length===1)||(lieux.length===0))
				{
				 $('#nombrerecherche').val("(" + lieux.length +" "+$lieu+")");
				}
				else
				{
				 $('#nombrerecherche').val("(" + lieux.length + " "+$lieux+")");
				}
			 
			$('#liste2').html('');
			$('#liste2').html(tmp);
		}
		if ($('#evenement_majeurs').is(':checked')) 
		{
			
				if((tabLieuxEvtsMajeur.length===1)||(tabLieuxEvtsMajeur.length===0))
				{
				 $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length +  " "+$lieu+")");
				}
				else
				{
				 $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length +  " "+$lieux+")");
				}
			var listelieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
			var listeindiv = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
			$('#liste2').html('');
			$('#liste2').html(listelieux);
			$('#liste').html('');
			$('#liste').html(listeindiv);
		}
	}
}
/**
 ** @brief	Filtre sur les lieux : Lieux les plus represente
 **/
function goLieuxPlusRepresenteClick() 
{
	filtreLieux=2;
	params["FiltreLieux"] = flPlusRepresente ;
	closeParams =  JSON.stringify( params ) ;
    if($('#lieu').val()!=="")
	{
	    var tab=[];
		if ($('#tous').is(':checked')) 
		{
	        for (var i = 0; i < lieux.length; i++) 
		        {
                    if (CaracteresAccentues(lieux[i].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
					{
                        tab.push(lieux[i]);
                    }
                }
			var lieuxPlusRep = lieuPlusRepresente(tab);
		    affichagelisteLieuxPlusRep(lieuxPlusRep);						
	     
			if((lieux.length===1)||(lieux.length===0))
			{
			    $('#nombrerecherche').val("(" + tab.length +"/"+lieux.length +  " "+$lieu+")");
			}
			else
			{
			    $('#nombrerecherche').val("(" + tab.length +"/"+lieux.length +  " "+$lieux+")");
			}
	    }
		  else
	    if ($('#evenement_majeurs').is(':checked')) 
		{
			for (var i = 0; i < tabLieuxEvtsMajeur.length; i++) 
			{
				if (CaracteresAccentues(tabLieuxEvtsMajeur[i].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
				{

					tab.push(tabLieuxEvtsMajeur[i]);
				}
			}

		var lieuxPlusRep = lieuPlusRepresenteMAJ(tab);
		affichagelisteLieuxPlusRepMAJ(tab);						
		
			if((tabLieuxEvtsMajeur.length===1)||(tabLieuxEvtsMajeur.length===0))
			{
			   $('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxEvtsMajeur.length +  " "+$lieu+")");
			}
			else
			{
			   $('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxEvtsMajeur.length +  " "+$lieux+")");
			}
			
		}
		
    }
	else
	
	{
	
	if ($('#tous').is(':checked')) 
	{
		var lieuxPlusRep = lieuPlusRepresente(lieux);
	
	       if((lieuxPlusRep.length===1)||(lieuxPlusRep.length===0))
			{
			  $('#nombrerecherche').val("(" + lieuxPlusRep.length +  " "+$lieu+")");
			}
			else
			{
			  	$('#nombrerecherche').val("(" + lieuxPlusRep.length +  " "+$lieux+")");
			}
		affichagelisteLieuxPlusRep(lieuxPlusRep);
	}
	if ($('#evenement_majeurs').is(':checked')) 
	{
		var lieuxPlusRep = lieuPlusRepresenteMAJ(tabLieuxEvtsMajeur);
		
			if((lieuxPlusRep.length===1)||(lieuxPlusRep.length===0))
			{
			  $('#nombrerecherche').val("(" + lieuxPlusRep.length +  " "+$lieu+")");
			}
			else
			{
			  	$('#nombrerecherche').val("(" + lieuxPlusRep.length +  " "+$lieux+")");
			}
		affichagelisteLieuxPlusRepMAJ(lieuxPlusRep);
	}
	
	}
}
/**
 ** @brief	Filtre sur les lieux : non place
 **/
function goLieuxNonPlaceClick() 
{
	filtreLieux=3;
	params["FiltreLieux"] = flNonGeolocalise ;
	closeParams =  JSON.stringify( params ) ;
	
	if($('#lieu').val()!=="")
	{
		var tab=[];
		if ($('#tous').is(':checked')) 
		{
		for (var i = 0; i < tabLieuxNonPlaces.length; i++) 
				{
					if (CaracteresAccentues(tabLieuxNonPlaces[i].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
					{

						tab.push(lieux[i]);
					}
				}
				affichagelisteLieuxNonPlaces(tab);					
		  
		   	if((tabLieuxNonPlaces.length===1)||(tabLieuxNonPlaces.length===0))
			{
			  $('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxNonPlaces.length +  " "+$lieu+")");
			}
			else
			{
			  	 $('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxNonPlaces.length +  " "+$lieux+")");
			}
		   
		}
	    else
	    if ($('#evenement_majeurs').is(':checked')) 
		{
			for (var i = 0; i < tabLieuxNonPlaces.length; i++) 
			{
				if (CaracteresAccentues(tabLieuxNonPlaces[i].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
				{

					tab.push(tabLieuxNonPlaces[i]);
				}
			}


			affichagelisteLieuxNonPlacesMAJ(tab);
				
			
			if((tabLieuxNonPlaces.length===1)||(tabLieuxNonPlaces.length===0))
			{
			 $('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxNonPlaces.length +  " "+$lieu+")");
			}
			else
			{
			  	$('#nombrerecherche').val("(" + tab.length +"/"+tabLieuxNonPlaces.length +  " "+$lieux+")");
			}
			
		}
		 // alert(tab);
		
	}
	
    else
	{       if ($('#tous').is(':checked')) 
		    {
			affichagelisteLieuxNonPlaces(tabLieuxNonPlaces);
			if(tabLieuxNonPlaces.length ===0)
			{
				$('#nombrerecherche').val($aucunLieu);
			}
			else if(tabLieuxNonPlaces.length ===1)
			{
				$('#nombrerecherche').val("(" + tabLieuxNonPlaces.length +  " "+$lieu+")");
			}
			else if(tabLieuxNonPlaces.length >1)
			{
				$('#nombrerecherche').val("(" + tabLieuxNonPlaces.length +  " "+$lieux+")");
			}
			}
			else
			 if ($('#evenement_majeurs').is(':checked')) 
			{
			var nonplaceMAJ=tabLieuxNonPlacesMAJ(tabLieuxEvtsMajeur);
				affichagelisteLieuxNonPlacesMAJ(nonplaceMAJ);
			if(nonplaceMAJ.length ===0)
			   {
				$('#nombrerecherche').val($aucunLieu);
			}
			else if(nonplaceMAJ.length ===1)
			{
				$('#nombrerecherche').val("(" + nonplaceMAJ.length +  " "+$lieu+")");
			}
			else if(nonplaceMAJ.length >1)
			{
				$('#nombrerecherche').val("(" + nonplaceMAJ.length +  " "+$lieux+")");
			}
			}
			
			
	}
}
/**
 ** @brief	Filtre sur les lieux : lieux visible
 **/
function goLieuxVisibleClick() 
{
	filtreLieux=4;
	params["FiltreLieux"] = flVisible ;
	closeParams =  JSON.stringify( params ) ;
	openLoader();
	var tab = [];
	var tab2=[];
	var bounds = map.getBounds();
	
	if($('#lieu').val()!=="")
	{
		var tab=[];
		if ($('#tous').is(':checked')) 
		{
		     markers.eachLayer(function(marker) 
			{
				if (bounds.contains(marker.getLatLng())) 
				{
					var titre = marker.getPopup().getContent();
					tab.push(titre);
				}
			 
			});
			tab=supprimeLesDoublons(tab);
	   
			for(var i=0;i<tab.length;i++)
			{
				if (CaracteresAccentues(tablieux[tab[i]].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
				{
					tab2.push(tablieux[tab[i]]);
				}
				
			}
			
			
			if((lieux.length===0)||(lieux.length===1))
			{
			$('#nombrerecherche').val("(" + tab2.length +"/"+lieux.length +   " "+$lieu+")");
			}
			else
			{
			 	$('#nombrerecherche').val("(" + tab2.length +"/"+lieux.length +   " "+$lieux+")");
			}
			affichagelisteLieuxVisibl(tab2);
		}
		else
		if ($('#evenement_majeurs').is(':checked')) 
		{
		
		       markers.eachLayer(function(marker) 
			{
				if (bounds.contains(marker.getLatLng())) 
				{
					var titre = marker.getPopup().getContent();
					tab.push(titre);
				}
			 
			});
			tab=supprimeLesDoublons(tab);
	   
				for (var i = 0; i < tab.length; i++) 
				{
					
					if (CaracteresAccentues(tablieux[tab[i]].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
					{

						tab2.push(tablieux[tab[i]]);
					}
				}
			if((tabLieuxEvtsMajeur.length===0)||(tabLieuxEvtsMajeur.length===1))
			{
			   $('#nombrerecherche').val("(" + tab2.length +"/"+tabLieuxEvtsMajeur.length +   " "+$lieu+")");
			}
			else
			{
			 	$('#nombrerecherche').val("(" + tab2.length +"/"+tabLieuxEvtsMajeur.length +   " "+$lieux+")");			
			}	
			    affichagelisteLieuxVisiblMAJ(tab2);
				
	    }
		
	}
	
    else
	{
	
		if ($('#tous').is(':checked')) 
		{
			markers.eachLayer(function(marker) 
			{
				if (bounds.contains(marker.getLatLng())) 
				{
					var titre = marker.getPopup().getContent();
					tab.push(titre);
				}
			 
			});
			tab=supprimeLesDoublons(tab);
	   
			for(var i=0;i<tab.length;i++)
			{
				tab2.push(tablieux[tab[i]]);
			}
				//alert(tab);
			
		    if((lieux.length===1)||(lieux.length===0))
			{
			$('#nombrerecherche').val("(" + tab2.length +"/" + lieux.length+   " "+$lieu+")");
			}
			else
			{
			 	$('#nombrerecherche').val("(" +tab2.length + "/" + lieux.length+   " "+$lieux+")");
			}
			affichagelisteLieuxVisibl(tab2);
		   
		}
		else if ($('#evenement_majeurs').is(':checked')) 
		{
			markers.eachLayer(function(marker) {
			
				var bounds = map.getBounds();
				if (bounds.contains(marker.getLatLng())) {
					   var titre = marker.getPopup().getContent();
					tab.push(titre);
				}
							
			}) ;
			tab=supprimeLesDoublons(tab);          
			for(var i=0;i<tab.length;i++)
			{
			  //  if(tabLieuxEvtsMajeur[tab[i]]!==undefined)
			   // {
				tab2.push(tablieux[tab[i]]);
				// }
			}
			if((tabLieuxEvtsMajeur.length===1)||(tabLieuxEvtsMajeur.length===0))
			{
			$('#nombrerecherche').val("(" +tab2.length +"/" + tabLieuxEvtsMajeur.length +  " "+$lieu+")");
			}
			else
			{
			 	$('#nombrerecherche').val("(" + tab2.length +"/" + tabLieuxEvtsMajeur.length+   " "+$lieux+")");
			}
			affichagelisteLieuxVisiblMAJ(tab2);              
		}
    }
	closeLoader();
}


//******************************CONSTRUCTION CARTE *****************************************************************************************
/**
 * map: la carte
 * osm: Layer openstreetmap
 * noiretblanc: Layer stamen (carte fond noir et blanc)
 * grayscale: Layer mapbox (carte fond gris)
 * baseMaps : permet de changer de fond de carte
 * @returns {undefined}
 */
function constructionCarte() {
    var baseMaps;

	// var crs=   L.CRS.EPSG900913;
//var crs = new L.Proj.CRS('EPSG:2400',
 // '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
 //var projection= L.Projection.SphericalMercator;
    map = new L.Map('map', {
     //   zoom: 8,
        zoomControl: false,
	//	     crs: crs,
     //   projection:projection,
     //   continuousWorld: true,
     //   worldCopyJump: false		
    });
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data Â© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
        attribution: osmAttrib
    });
    var noiretblanc = new L.StamenTileLayer("toner");
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery Â© <a href="http://mapbox.com">Mapbox</a>',
        mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    var grayscale = L.tileLayer(mbUrl, {
        id: 'examples.map-20v6611k',
        attribution: mbAttr
    });
	if(QueryString["hlangage"]==="fr")
	{
    baseMaps = {
        "Heredis": osm,
        "Gris": grayscale,
        "Noir et blanc": noiretblanc
        //   "Noir et blanc": noiretblanc
    };
	}
	else
	if(QueryString["hlangage"]==="en")
	{
	    baseMaps = {
        "Heredis": osm,
        "Grey": grayscale,
        "Black and white": noiretblanc
        //   "Noir et blanc": noiretblanc
    };
	}
       map.addLayer(osm);
    map.addControl(new L.Control.Layers(baseMaps, {}, {
        position: 'topleft'
    }));
   
     map.addControl(new L.control.zoom({
        zoomInTitle: "",
        zoomOutTitle: ""
    }));
  //   map.setView(new L.LatLng(0, 0), 18);
 
    sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'right'
    });
    map.addControl(sidebar);
/**
*  Affichage des POI
*/
    map.on('zoomend moveend', function() 
	{
	var j=0;
		params['ZoomLevel'] = map.getZoom() ;
		closeParams =  JSON.stringify( params ) ;
      if($('#POI').is(':checked')&&(map.getZoom() >= MaxZoomPOI))
		{
	       $('#POI').attr('checked', true);
            var bounds=map.getBounds();
            poishow.eachLayer(function(marker) 
			{
			if (bounds.contains(marker.getLatLng())) 
			{
			 marker.addTo(map);
			}
			else
			{
			map.removeLayer(marker)
			 // clearLayer(marker);
			}
			});
	//	}
		}
		else
		{
		clearLayer(mespoi);
		}
		
    });

/* 
** foncion pour le decoupage de la carte
*/
		var info = L.control({position:'bottomleft'});
          info.onAdd = function (map) 
	      {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		  };
       	   info.update = function (props) 
		   {
//	var nombreEvent	=nombrEvenementParLieu(layer.feature.properties.name);
	this._div.innerHTML = '<h4>'+(props ?
				'<b>'+ props.name+'</b></h4>'
				: '');
		};
 
/* 
** foncion pour le decoupage de la carte : couleur de contours
*/ 
function style(feature) 
{
return {
	weight: 2,
	opacity: 0,
	color: '#d44698',
	dashArray: '3',
	fillOpacity: 0
};
}


/* 
** foncion pour le decoupage de la carte : 
*/
function mouseout(e) 
{
statesLayer.resetStyle(e.target);
}
function highlightFeature(e) 
{
	var layer = e.target;
	var zoom=map.getZoom();
	//alert(zoom);
	if(zoom>8)
	{
	layer.setStyle(
	{
		weight: 5,
		opacity:0,
		//color: '#666',
		dashArray: '',
		fillOpacity: 0
	});
	}
	else
	{
   layer.setStyle(
   {
		weight: 5,
		opacity:0.5,
		//color: '#666',
		dashArray: '',
		fillOpacity: 0
	});
	}
	
		info.addTo(map);

	if (!L.Browser.ie && !L.Browser.opera) 
	{
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

		var geojson;

function resetHighlight(e) 
{
	geojson.resetStyle(e.target);
		info.removeFrom(map);
}

function zoomToFeature(e) 
{
	if(map.getZoom()<=6)
	{
		map.fitBounds(e.target.getBounds());
			var layer = e.target;
		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0
		});
   }
}

function onEachFeature(feature, layer) 
{
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
		//zoomend: zoomeend
	});
}

		geojson = L.geoJson(statesData, 
		{
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
		
	var legend = L.control({position: 'bottomleft'});  
    legend.onAdd = function (map) 
	{
        var div = L.DomUtil.create('div', 'info legend');
        labels = [];
	    labels.push(
        "<table width='100%' border='0'>"+
		"<th><td colspan='4' align='center'><h1 style='text-transform:uppercase;margin-bottom:5px;'>"+$legende+"</h1></td></th>"+
		"<tr><td colspan='2' align='center' width='50%'>"+" <h3>"+$unLieu+"</h3> "+"</td><td  colspan='2' align='center' width='50%'>"+"  <h3>"+$plusieursLieux+"</h3> "+"</td></tr><tr><td><img  class='legende' src='images/markers/marker-event-fami-resume.png'/></td><td>"+1+$a+9 +$evenements+"  </td> <td> <img  class='legende' src='images/markers/ico-event-num-smallx-resume-petit.png'/>  </td><td>"+ 1 +$a+ 9 +$evenements+"</td> </tr><tr><td><img  class='legende' src='images/markers/marker-event-fami-resume-bleu-moyen.png'/></td>" + "<td>"+10 +$a +99+ $evenements+" </td> <td><img  class='legende' src='images/markers/ico-event-numx-resume-moyen.png'/></td> <td>"+ 10 +$a+ 99 +$evenements+"</td> </tr><tr><td><img class='legende' src='images/markers/marker-event-fami-resume-bleu-fonce.png'/></td>" + "<td>" + 100 +$evenementsEtPlus+" </td> <td> <img  class='legende' src='images/markers/ico-event-num-mediumx-resume-fonce.png'/></td> <td>"+100 +$evenementsEtPlus+" </td></tr>  </table>");
	  /*    labels.push( "<strong> Légende </strong><table width='100%' border='0'><tr><td>"+ "Un lieu" +" </td> <td>"+"Plusieurs lieux"+"</td></tr> <tr><td><img  class='legende' src='images/markers/marker-event-fami-resume.png'/></td><td>"+
        1+' à '+9 +" événements</td><td> <img  class='legende' src='images/markers/ico-event-num-smallx-resume-petit.png'/></td><td>"+ 1 +" à "+ 9 +"événements"+"</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table> "
                          );*/
        div.innerHTML = labels;
        return div;
        };	
		legend.addTo(map);
	   L.control.scale({position:'bottomright',updateWhenIdle:true}).addTo(map);
		}
//******************************FIN CONSTRUCTION CARTE *****************************************************************************************
//******************************CONSTRUCTION DES TABLEAUX *****************************************************************************************
/**
 * 
 * @param {type} tab : le json
 * Evenements: tableau des evenements
 * lieux : tableau des leiux
 * tableau des Individus
 * tabLieuxNonPlaces: contenant la liste des lieux nons places
 * tablieux : tableau associatif dont l'ID du lieu devient la clé ( permet d'acces direcement à un lieu grace à son ID)
 * tabIndividus:tableau associatif dont l'ID de l'individu devient la clé ( permet d'acces direcement à un individu grace à son ID)
 * tabEvts:tableau associatif dont l'ID de l'evenement devient la clé ( permet d'acces direcement à un evenement grace à son ID)
 * tabDate: contenant toutes les dates ( pour la repartition par periode)
 * tabGeneration : contenant toutes les generations ( pour la repartition par generation)
 * tabIndivEvtsMajeur : contenant les ID des individus qui ont un evenement majeur
 * tabLieuxEvtsMajeur  : contenant les ID des lieux qui ont un evenement majeur
 * tabEvtsMajeurs :contenant les ID des evenements q majeurs
 * 
 * @returns {undefined}
 */
function CreationDesTab(tab) 
{
    Evenements = Valeur.values[0].Evts; 
    //trytabDate(Evenements);
    lieux = Valeur.values[1].Lieux;
    Individus = Valeur.values[2].Individus;
    for (var i = 0; i < lieux.length; i++) 
	{   
		if((lieux[i].L.La === 0.0 )&&(lieux[i].L.Lo === 0.0))
		{
		   tabLieuxNonPlaces.push(lieux[i]);
		} 
		
		tablieux[lieux[i].L.ID] = lieux[i];       
    }
    for (var i = 0; i < Individus.length; i++) 
	{
        tabIndividus[Individus[i].I.ID] = Individus[i];
        tabGeneration.push(Individus[i].I.G);
    }
    for (var i = 0; i < Evenements.length; i++) 
	{
        tabEvts[Evenements[i].E.ID] = Evenements[i];
		if (Evenements[i].E.A !== undefined ) 
		{
        tabDate.push(Math.ceil(Evenements[i].E.A));
		}
		
        if (Evenements[i].E.m === 1 ) 
		{
            evenementsMajeur.push(Evenements[i]);
            tabEvtsMajeurs[Evenements[i].E.ID] = Evenements[i];            
			if (Evenements[i].E.A !== undefined ) 
		    {
            tabDateMAJ.push(Math.ceil(Evenements[i].E.A));
			}
            t.push(Evenements[i].E.IL);
            tt.push(Evenements[i].E.i1[0]);
	    
            tabGenerationMAJ.push(tabIndividus[Evenements[i].E.i1[0]].I.G);
        }
     /*
    if((tablieux[Evenements[i].E.IL].L.La === 0.0 )&&(tablieux[Evenements[i].E.IL].L.Lo === 0.0))
		{
		   tabLieuxNonPlaces.push(Evenements[i].E);
		} 
		*/
    }
 
    t= supprimeLesDoublons(t);
    tt= supprimeLesDoublons(tt);
    tabGenerationMAJ= supprimeLesDoublons(tabGenerationMAJ);
    for(var i=0;i<t.length;i++)
    {
		/*if((tablieux[t[i]].L.La === 0.0 )&&(tablieux[t[i]].L.Lo === 0.0))
		{
		   tabLieuxNonPlaces.push(tablieux[t[i]]);
		}  
		*/
		
        tabLieuxEvtsMajeur.push(tablieux[t[i]]);
    }
    for(var i=0;i<tt.length;i++)
      {
           tabIndivEvtsMajeur.push(tabIndividus[tt[i]]);
      }
        
}
//******************************FIN CONSTRUCTION DES TABLEAUX ************************
/**
 * fonction pour supprimer tous les markers sur la carte
 * @returns {undefined}
 */
function removeAllMarkers() 
{
    map.removeLayer(markers);
}
/**
 * 
 * @param {type} v : liste des lieux 
 * @returns {Array|tabLatitudedLongitude.tab}
 */
function tabLatitudedLongitude(v) 
{
    var tab = new Array();
    for (var i = 0; i < v.length; i++) 
	{
        var latitude = v[i].getLatLng().lat;
        var longitude = v[i].getLatLng().lng;
        var latilongi = new LatiLongi();
        latilongi.La = latitude;
        latilongi.Lo = longitude;
        var tt = supprimeDoublonlatitudeLongitude(latilongi, tab);
        if (tt === false) 
		{
            tab.push(latilongi);
        }
    }
    return tab;
}
//********************************************* CREATION DES MARKERS ****************************
/**
 * 
 * @returns {undefined}
 */
function createMarkers() 
{
    markers = new L.MarkerClusterGroup(
	{
       iconCreateFunction :function (cluster) 
	   {
			var v = cluster.getAllChildMarkers();
			var  tab2 = tabLatitudedLongitude(v);

			var childCount = cluster.getChildCount();
			var c = ' marker-cluster-';
			if (childCount < 10) 
			{
                if(tab2.length===1)
                {
                    c += 'small';
                }             			 
			    else
			    {
					c += 'smallx';
				}
		    } 
			else
			if (childCount < 100) 
			{
			   if(tab2.length===1)
			   {
				 c += 'medium';
			   }
			   else
			   {
				c += 'mediumx';
			   }

		    } else
			{
                    
				if(tab2.length===1)
				{
				   c += 'large';
				}
				else
				{
				  c += 'largex';
				}

		    }

			return new L.DivIcon(
			{
				html: '<div><span>' + childCount + '</span></div>',
				className: 'marker-cluster' + c,
				iconAnchor:new L.Point(40, 63)
			});
        }
		,showCoverageOnHover:false,
		animateAddingMarkers : true  ,
		singleMarkerMode:false,
		spiderfyDistanceMultiplier:0,
		chunkInterval:400    
    });
    //**
	/* lorsque l'on click sur un seul marker
	/*/
    markers.on('click', function(a) 
	{
        if ($('#tous').is(':checked')) 
		{
		     if ($('#parperiode').is(':checked'))
            {		
				//var val=awesome.slider("values", 1) + awesome.slider("option", "step");
		   filtre= new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));       
            markerClick(tabEvts, a,filtre);
		    }
			 if ($('#pargeneration').is(':checked'))
            {		
				filtre= new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  
				 markerClick(tabEvts, a,filtre);
		    }
			if ($('#densite').is(':checked'))
			{
			     markerClick(tabEvts, a,new TFiltreInterval(0,0));
			}    
        }
        if ($('#evenement_majeurs').is(':checked'))
		{
             if ($('#parperiode').is(':checked'))
            {	
            filtre= new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));       
		    markerClick(tabEvtsMajeurs, a,filtre);
			}
			 if ($('#pargeneration').is(':checked'))
            {	
				filtre= new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  	
				markerClick(tabEvtsMajeurs, a,filtre);
			}
		    if ($('#densite').is(':checked'))
			{
			    markerClick(tabEvtsMajeurs, a,new TFiltreInterval(0,0));
			}      
        }
    });
	//**
	/* lorsque l'on click sur un regroupement de markers
	//*/
    markers.on('clusterclick', function(a)
	{
        if ($('#tous').is(':checked')) 
		{    if ($('#parperiode').is(':checked'))
		{
		     //var val=awesome.slider("values", 0) + awesome.slider("option", "step");
				filtre = new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));  
				markerClusterClick(a, tabEvts,filtre);
		    }
			 if ($('#pargeneration').is(':checked'))
            {		
				filtre = new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  
				markerClusterClick(a, tabEvts,filtre);
        }
			else
			{
			    markerClusterClick(a, tabEvts,new TFiltreInterval(0,0));
			}
        }
        if ($('#evenement_majeurs').is(':checked')) 
		{
		    if ($('#parperiode').is(':checked'))
            {	
				filtre = new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));  	
				markerClusterClick(a, tabEvtsMajeurs,filtre);
        }
			 if ($('#pargeneration').is(':checked'))
            {	
				filtre= new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  	
				markerClusterClick(a, tabEvtsMajeurs,filtre);
			}
			else
			{
			    markerClusterClick(a, tabEvtsMajeurs,new TFiltreInterval(0,0));
			}
        }
    });
	
	

   
};
//*********************************************FIN CREATION DES MARKERS **************************
/**
 *@param {type}  Lieux: tableau contenant les lieux 
 *
 */
function afficheAllMarkers(Lieux) 
{
    createMarkers();
    nongeolocalise=false;
    for (var key in Lieux) 
	{
        var lieu = Lieux[key];
        for (var i = 0; i < lieu.L.n; i++) 
		{
            var lat = Lieux[key].L.La;
            var longitude = Lieux[key].L.Lo;
            if((lat!==0.0)&&(longitude!==0.0))
            {
		        nongeolocalise=true;
				var codelieu = Lieux[key].L.c;
				var titre = key;
				titre = String(titre);
				var texte = $hint + "'" + Lieux[key].L.V + "'";
				var marker = new L.Marker(new L.LatLng(lat, longitude), 
				{
					icon: myIcon,
					title: texte
				}).bindPopup(titre);
				markers.addLayer(marker);
            }
		}
    }
	if(nongeolocalise)
	{
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());
	}
	else
	{
	 map.setView(new L.LatLng(0, 0), 2);
	 messagealerte($messagealerte);
}
}
function afficheMarkers(Evenements,filtre) 
{
 nongeolocalise=false;
  //  zoom=map.getBounds();   // 
    createMarkers();
    for (var key in Evenements) 
	{
		 if( filtre.Filtre( Evenements[key].E ) )
		{
		    var lieu = tablieux[Evenements[key].E.IL];
			//for (var i = 0; i < lieu.L.n; i++) 
			//{
					var lat = tablieux[Evenements[key].E.IL].L.La;
					var longitude = tablieux[Evenements[key].E.IL].L.Lo;
            if((lat!==0.0)&&(longitude!==0.0))
            {
			nongeolocalise=true;
          //  var codelieu = Evenements[key].L.c;
						var titre = tablieux[Evenements[key].E.IL].L.ID;
				titre = String(titre);
						var texte = $hint + "'" + tablieux[Evenements[key].E.IL].L.V + "'";
				var marker = new L.Marker(new L.LatLng(lat, longitude), 
				{
					icon: myIcon,
					title: texte
				}).bindPopup(titre);
				markers.addLayer(marker);
			}

			//}
        }

    }
	if(nongeolocalise)
	{
    map.addLayer(markers);
    map.fitBounds(map.getBounds());
	}
	else
	{
	 map.setView(new L.LatLng(0, 0), 2);
	 messagealerte($messagealerte);
	}
}
function afficheAllMarkersEvtMAJ(Evenements,filtre) 
{
   nongeolocalise=false;
    createMarkers();
    var key;
    for (key in Evenements) 
	{
		if( filtre.Filtre( Evenements[key].E ) )
		{
            var lieu = tablieux[Evenements[key].E.IL];
            var lat = tablieux[Evenements[key].E.IL].L.La;
			var longitude = tablieux[Evenements[key].E.IL].L.Lo;
            if((lat!==0.0)&&(longitude!==0.0))
            {
			nongeolocalise=true;
				var codelieu = tablieux[Evenements[key].E.IL].L.c;
				var titre = tablieux[Evenements[key].E.IL].L.ID;
				titre = String(titre);
				var texte = $hint + "'" + tablieux[Evenements[key].E.IL].L.V + "'";
				var marker = new L.Marker(new L.LatLng(lat, longitude), 
				{
					icon: myIcon,
					title: texte
				}).bindPopup(titre);
				markers.addLayer(marker);
			}
       // }
        }
    }
	if(nongeolocalise)
	{
	zoom=map.getBounds();
    map.addLayer(markers);
   //    map.fitBounds(markers.getBounds());
    map.fitBounds(zoom);
	}
	else
	{
	 map.setView(new L.LatLng(0, 0), 2);
	  messagealerte($messagealerte);
	}
}


// si n'y a pas d'individus marqués on averti l'utilisateur
  if(( Valeur.values[0].Evts.length===0)&&( Valeur.values[1].Lieux.length===0)&&( Valeur.values[2].Individus.length===0))
 {          
	$(document).ready(function() 
	    {
			$.pageLoader();
			constructionCarte(); // appel methode pour la consctuction et l'affichage de la carte
  
            messagealerte($messagealerte);
  
	   
    });
	
	
    // on desactive tous les boutons
    $('#entete').hide();
    $('#entete2').hide();
//	$('#touslesindividus').attr('disabled', 'disabled');
//	$('#ascendant').attr('disabled', 'disabled');
//	$('#descendant').attr('disabled', 'disabled');
//	$('#individusmarque').attr('disabled', 'disabled');
	$('#tous').attr('disabled', 'disabled');
    $('#evenement_majeurs').attr('disabled', 'disabled');
    $('#densite').attr('disabled', 'disabled');
    $('#parperiode').attr('disabled', 'disabled');
    $('#pargeneration').attr('disabled', 'disabled');
	$('#carte').attr('disabled', 'disabled');
	$('#Liste_eclaire').attr('disabled', 'disabled');
	$('#boutonindividus').attr('disabled', 'disabled');
	$('#boutonlieu').attr('disabled', 'disabled');
	
	
}
// si le json n'est pas vide
else
    
{
/**
 *
 * @FONCTION APPELEE AU CHARCHEMENT DE LA PAGE
 */

$(document).ready(function() 
{
    $.pageLoader();    // loader qui s'affiche lors du chargement de la page
	$('.repartion:eq(8)').hide(); // cacher repartition par generation (afficher seulement lorsqu'on cocher descendant )
    tabviderchampsrecherche = new Array();  // tableau pour champs de recherche
       mespoi = affichePOI();  // affichage des points d'interet sur la carte
	 poishow = new L.layerGroup(mespoi);   
   constructionCarte(); // appel methode pour la consctuction et l'affichage de la carte
    CreationDesTab(Valeur);  // creation des données
 
    $('#op1').hide(); // cache la div liste des individus menu droite
  // constructionCarte();
    $('#entete').hide();
	   $('#entete2').hide();
    afficheAllMarkers(tablieux);   // affichage des markers sur la carte
    var listelieux = affichagelisteLieux(lieux);    // affichage de la liste des lieux sur la palette de droite
    document.getElementById("liste2").innerHTML = listelieux;
	 // affichage du nombre de lieux
	
 	if(lieux.length>1)
	{
	 $('#nombrerecherche').val("(" + lieux.length +  " "+$lieux+")");
	}
	else
	{
	 if(lieux.length===1)
	 {
	  $('#nombrerecherche').val("(" + lieux.length +  " "+$lieu+")");
	 }
	}    
    //$('#entete').fadeOut();                                           // cache l'entete pour la repartion par periode
   // $('#entete2').fadeOut();                                             // cache l'entete pour la repartion par generation
    
	// click onglet lieux
    $('#boutonlieu').click(function() 
	{                               // click  sur le bouton lieux: si le nombre de lieu des superieur à 1000 on affiche un loader pour faire patientez l'utilisateur
		encodeURI(document.location.href='index.html?Hcommand_Onglet=ocLieux');
		goLieuxClick() ;
    });
    //quand l'utilisateur clik sur l'onglet individus
    $('#boutonindividus').on("click",function(e) 
	{
		encodeURI(document.location.href='index.html?Hcommand_Onglet=ocIndividu');
		goIndividuClick() ;
   });
    //*****************************FIN DEPLIANT **************************************************  
  
 
    //*****************************COMBO BOX (choix :Tous les lieux; lieux plus representés, lieux visibles, lieux non placés) **************************************************    
    //*****************************COMBO BOX (choix :Tous les lieux; lieux plus representés, lieux visibles, lieux non placés) **************************************************    
    $('#valeurcombo').change(function() 
	{
        var texte = $('#valeurcombo option:selected').val();
        // *********** A= Tous les lieux*******
        if (texte === "A") // Tous les lieux
        {
			goLieuxTousClick() ;
			encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
        }
        // ***********B= lieux plus representés************
        else if (texte === "B") 
		{
			goLieuxPlusRepresenteClick() ;
			encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
        }
        // *********** C =lieux non places************
        else if (texte === "C") 
		{
			goLieuxNonPlaceClick() ;
			encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
        }
        // *********** D = lieux visibles************
        else if (texte === "D") 
        {     
			goLieuxVisibleClick() ;
			encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
        }
    });

    map.on('moveend', function() 
	{
 // openLoader();
        var k = 0;
        var tab = [];
        var tab2=[];
        if ($('#valeurcombo option:selected').val() === "D") 
		{
  
            var bounds = map.getBounds();
            
			if($('#lieu').val()!=="")
	        {
		      var tab=[];
				if ($('#tous').is(':checked')) 
				{	
				    markers.eachLayer(function(marker) 
					{
					if (bounds.contains(marker.getLatLng())) 
					{
					var titre = marker.getPopup().getContent();
					tab.push(titre);
					}
			 
					});
					tab=supprimeLesDoublons(tab);
		
					for(var i=0;i<tab.length;i++)
					{
			            //alert(tab[i]);
						if (CaracteresAccentues(tablieux[tab[i]].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
						{
							tab2.push(tablieux[tab[i]]);
						}
				
					}
				      //alert(tab);
				    if((lieux.length===1)||(lieux.length===0))
					{
					    $('#nombrerecherche').val("(" + tab2.length+"/"+ lieux.length +  " "+$lieu+")");
					}

					else
					{
					 $('#nombrerecherche').val("(" + tab2.length+"/"+ lieux.length +  " "+$lieux+")");
					}						
			      
			        affichagelisteLieuxVisibl(tab2);
					
		        }
				
		       else
		       if ($('#evenement_majeurs').is(':checked')) 
		        {
		
					markers.eachLayer(function(marker) 
						{
						if (bounds.contains(marker.getLatLng())) 
						{
							var titre = marker.getPopup().getContent();
							tab.push(titre);
						}
			 
						});
					tab=supprimeLesDoublons(tab);
	   
					for (var i = 0; i < tab.length; i++) 
					{
					
					if (CaracteresAccentues(tablieux[tab[i]].L.V).toUpperCase().indexOf(CaracteresAccentues($('#lieu').val()).toUpperCase()) !== -1) 
					{
						tab2.push(tablieux[tab[i]]);
					}
					}

					if((tabLieuxEvtsMajeur.length===1)||(tabLieuxEvtsMajeur.length===0))
					{
					   $('#nombrerecherche').val("(" + tab2.length +"/"+ tabLieuxEvtsMajeur.length+  " "+$lieu+")");
					}
					else
					{

						$('#nombrerecherche').val("(" + tab2.length +"/"+ tabLieuxEvtsMajeur.length+  " "+$lieux+")");
								
			        } 

			    affichagelisteLieuxVisiblMAJ(tab2);
				
				}
		 // alert(tab);
		
	}
	
    else
	{
			
            if ($('#tous').is(':checked')) 
            {
                markers.eachLayer(function(marker) 
                {
                    if (bounds.contains(marker.getLatLng())) 
					{
                        var titre = marker.getPopup().getContent();
                        tab.push(titre);
                    }
                 
               });
                tab=supprimeLesDoublons(tab);
           
                for(var i=0;i<tab.length;i++)
                {
                    tab2.push(tablieux[tab[i]]);
                }
                    //alert(tab);
				if((lieux.length===1)||(lieux.length===0))
				{
				  $('#nombrerecherche').val("(" + tab2.length+"/" + lieux.length+  " "+$lieu+")");
				}
				else
				{
				$('#nombrerecherche').val("(" +tab2.length+"/" + lieux.length+  " "+$lieux+")");
				}
				             
                affichagelisteLieuxVisibl(tab2);
               
            }
            else if ($('#evenement_majeurs').is(':checked')) 
            {
                markers.eachLayer(function(marker) 
				{
                
                    var bounds = map.getBounds();
                    if (bounds.contains(marker.getLatLng())) 
					{
                           var titre = marker.getPopup().getContent();
                        tab.push(titre);
                    }
                }) ;
                tab=supprimeLesDoublons(tab);          
                for(var i=0;i<tab.length;i++)
				{
					tab2.push(tablieux[tab[i]]);
				}
				if((tabLieuxEvtsMajeur.length===1)||(tabLieuxEvtsMajeur.length==0))
				{
				  $('#nombrerecherche').val("(" +  tab2.length+"/" + tabLieuxEvtsMajeur.length+ " "+$lieu+")");
				}
			
			    else
			    {
				  $('#nombrerecherche').val("("+  tab2.length+"/" + tabLieuxEvtsMajeur.length+  " "+$lieux+")");
			    }
				
                    affichagelisteLieuxVisiblMAJ(tab2);                  
              
            }
        }  
    }
     // closeLoader();
    });


    //$('#densite').addEventListener('click',onClickDensite,false);
    // *********** ****************bouton densité  selectionné************ ************
    $('#densite').click(function()
    {
		goDensiteClick() ;
		encodeURI(document.location.href='index.html?Hcommand_FitreModeRep=mrDensite');
	});
    // *********** ****************bouton Tous les evenements  selectionné************ ************
    $('#tous').on("click", function() 
	{
		goTousEvenementClick() ;
		encodeURI(document.location.href='index.html?Hcommand_FiltreEvts=feTousEvts');
    });
    $('#evenement_majeurs').on("click", function() 
	{
		goEvenementMajeurClick() ;
		encodeURI(document.location.href='index.html?Hcommand_FiltreEvts=feMajeur');
    });
    //******************** Bouton  repartition par periode selectionnés **********************************************************************
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
    //                                                                                                                   //
    //                                         REPARTITION PAR PERIODE                                                //                  
    //                                                                                                                   //
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://    
    document.getElementById('parperiode').disabled===false;
    $('#parperiode').on("click", function()
	{
		goPerdiodeClick() ;
		pausePlay===false;
		pausePlay2===false;
		encodeURI(document.location.href='index.html?Hcommand_FitreModeRep=mrPeriode');
	});
   
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
    //                                                                                                                   //
    //                                         REPARTITION PAR GENERATION                                                //                  
    //                                                                                                                   //
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
    $('#pargeneration').click(function() 
	{
        goGenerationClick() ;
			pausePlay===false;
			pausePlay2===false;
		encodeURI(document.location.href='index.html?Hcommand_FitreModeRep=mrGeneration');
    });
    // 
    //********************************* AUTOCOMPLETION POUR LIEU (bouton recherche automatique liste lieux)**************************************************************
    $('#lieu').keyup(function()
	{
        var tablatlng=[];
        var listeLieux;
           var $field = $(this);
        if (tabviderchampsrecherche.length !== 0) 
		{
            tabviderchampsrecherche = [];
        }
          var texte = $('#valeurcombo option:selected').val();
         if (texte === "A") 
        {
        if ($('#tous').is(':checked')) 
		{
            if ($field.val().length > 0) 
			{
                for (var i = 0; i < lieux.length; i++) 
				{
                    if (CaracteresAccentues(lieux[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
					{

                        tabviderchampsrecherche.push(lieux[i]);
                    }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                    listeLieux = affichagelisteLieux(tabviderchampsrecherche);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieux+")");
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);

                } else
                if (tabviderchampsrecherche.length === 1) 
				{
                    listeLieux = affichagelisteLieux(tabviderchampsrecherche);
					if(lieux.length===1)
					{
					$('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieu+")");
					}
					else
					{
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieux+")");
					}
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                } 
				else 
				{
                    listeLieux = affichagelisteLieux(tabviderchampsrecherche);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }

            } 
			else 
			{


                if (lieux.length > 1) 
				{
                    listeLieux = affichagelisteLieux(lieux);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + lieux.length +  " "+$lieux+")");

                } else
                if (lieux.length === 1) 
				{
                    listeLieux = affichagelisteLieux(lieux);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + lieux.length +   " "+$lieu+")");
                } 
				else 
				{
                    listeLieux = affichagelisteLieux(lieux);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }
            }
        }

        if ($('#evenement_majeurs').is(':checked')) 
		{
            // var tab = [];
            if (tabviderchampsrecherche.length !== 0) 
			{
                tabviderchampsrecherche = [];
            }
            if ($field.val().length > 0) 
			{

                for (var i = 0; i < tabLieuxEvtsMajeur.length; i++) 
				{
                    if ( CaracteresAccentues(tabLieuxEvtsMajeur[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) {

                        tabviderchampsrecherche.push(tabLieuxEvtsMajeur[i]);
                     }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                    listeLieux = affichagelisteLieuxMAJ(tabviderchampsrecherche);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+  " "+$lieux+")");
                } 
				else
                if (tabviderchampsrecherche.length === 1) 
				{
                    listeLieux = affichagelisteLieuxMAJ(tabviderchampsrecherche);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
					if(tabLieuxEvtsMajeur.length===1)
					{
					  $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+ " "+$lieu+")");
					}
					else
					{
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+  " "+$lieux+")");
					}
                } 
				else 
				{
                    listeLieux = affichagelisteLieuxMAJ(tabviderchampsrecherche);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }
            } else 
			{

                if (tabLieuxEvtsMajeur.length > 1) 
				{
                    listeLieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length +  " "+$lieux+")");
                } 
				else
                if (tabLieuxEvtsMajeur.length === 1) 
				{
                    listeLieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length + " "+$lieu+")");
                } 
				else 
				{
                    listeLieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }
            }
        }
     }
        if (texte === "B") // Les lieux majeurs
        {
     
        if ($('#tous').is(':checked'))
		{
            if ($field.val().length > 0) 
			{
                for (var i = 0; i < lieux.length; i++) 
				{
                    if (CaracteresAccentues(lieux[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
					{

                        tabviderchampsrecherche.push(lieux[i]);
                    }
                }
                if (tabviderchampsrecherche.length > 1)
				{
               affichagelisteLieuxPlusRep(tabviderchampsrecherche);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieux+")");
               //     $('#liste2').html("");
                //    $('#liste2').html(listeLieux);

                } 
				else
                if (tabviderchampsrecherche.length === 1) 
				{
                 affichagelisteLieuxPlusRep(tabviderchampsrecherche);
				 if(lieux.length===1)
				 {
				 $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieu+")");
				 }
                                  else
                                  {
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieux+")");
				   }				 
                 //   $('#liste2').html("");
                 //   $('#liste2').html(listeLieux);
                } 
				else 
				{
                    listeLieux = affichagelisteLieuxPlusRep(tabviderchampsrecherche);
                   // $('#liste2').html("");
                   // $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }

            } 
			else 
			{


                if (lieux.length > 1) 
				{
                     affichagelisteLieuxPlusRep(lieux);
                    //$('#liste2').html("");
                    //$('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + lieux.length +  " "+$lieux+")");

                } 
				else
                if (lieux.length === 1)
				{
                     affichagelisteLieuxPlusRep(lieux);
                    //$('#liste2').html("");
                    
                            //$('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + lieux.length + " "+$lieu+")");
                } else 
				{
                   affichagelisteLieuxPlusRep(lieux);
                   // $('#liste2').html("");
                   // $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }


            }
        }

        if ($('#evenement_majeurs').is(':checked')) 
		{
            // var tab = [];
            if (tabviderchampsrecherche.length !== 0) 
			{
                tabviderchampsrecherche = [];
            }
            if ($field.val().length > 0) 
			{

                for (var i = 0; i < tabLieuxEvtsMajeur.length; i++) 
				{
                    if (CaracteresAccentues(tabLieuxEvtsMajeur[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) {

                        tabviderchampsrecherche.push(tabLieuxEvtsMajeur[i]);
                    }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                    affichagelisteLieuxPlusRepMAJ(tabviderchampsrecherche);
                   // $('#liste2').html("");
                   // $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+ " lieux)");
                } else
                if (tabviderchampsrecherche.length === 1) 
				{
                   affichagelisteLieuxPlusRepMAJ(tabviderchampsrecherche);
                    $('#liste2').html("");
                    $('#liste2').html(listeLieux);
		if(tabLieuxEvtsMajeur.length===1)
		{
		     $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+  " "+$lieu+")");
		}
		else
		{
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+  " "+$lieux+")");
		}  
                } else 
				{
                affichagelisteLieuxPlusRepMAJ(tabviderchampsrecherche);
                   // $('#liste2').html("");
                    //$('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }
            } else 
			{

                if (tabLieuxEvtsMajeur.length > 1) 
				{
               affichagelisteLieuxPlusRepMAJ(tabLieuxEvtsMajeur);
               //     $('#liste2').html("");
                //    $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length + " "+$lieux+")");
                }
				else
                if (tabLieuxEvtsMajeur.length === 1) 
				{
                 affichagelisteLieuxPlusRepMAJ(tabLieuxEvtsMajeur);
                  //  $('#liste2').html("");
                  //  $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length +  " "+$lieu+")");
                }
				else 
				{
                   affichagelisteLieuxPlusRepMAJ(tabLieuxEvtsMajeur);
                  //  $('#liste2').html("");
                  //  $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }
            }
        }
     }
    if (texte === "C") // non localisés
    {
            
     
        if ($('#tous').is(':checked')) 
		{
            if ($field.val().length > 0) 
			{
                for (var i = 0; i < tabLieuxNonPlaces.length; i++) 
				{
                    if (CaracteresAccentues(tabLieuxNonPlaces[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
					{

                        tabviderchampsrecherche.push(tabLieuxNonPlaces[i]);
                    }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                     affichagelisteLieuxNonPlaces(tabviderchampsrecherche);

                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxNonPlaces.length+  " "+$lieux+")");
               //     $('#liste2').html("");
                //    $('#liste2').html(listeLieux);

                } else
                    
                if (tabviderchampsrecherche.length === 1) 
				{
                 affichagelisteLieuxNonPlaces(tabviderchampsrecherche);
		 if(tabLieuxNonPlaces.length===1)
		 {
		  $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxNonPlaces.length+   " "+$lieu+")");
		 }
		 else
		 {
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxNonPlaces.length+   " "+$lieux+")");
		 }
                 //   $('#liste2').html("");
                 //   $('#liste2').html(listeLieux);
                } else 
				{
                 affichagelisteLieuxNonPlaces(tabviderchampsrecherche);
                   // $('#liste2').html("");
                   // $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }
           

            } else
			{

                if (tabLieuxNonPlaces.length > 1) 
				{
                     affichagelisteLieuxNonPlaces(tabLieuxNonPlaces);
                    //$('#liste2').html("");
                    //$('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + tabLieuxNonPlaces.length +  " "+$lieux+")");

                } else
                if (tabLieuxNonPlaces.length ===1) {
                    affichagelisteLieuxNonPlaces(tabLieuxNonPlaces);
   
                    
                    $('#nombrerecherche').val("(" + tabLieuxNonPlaces.length +  " "+$lieu+")");
                } else 
				{
                      affichagelisteLieuxNonPlaces(tabLieuxNonPlaces);
                   // $('#liste2').html("");
                   // $('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                }


            }
        }

    
	     if ($('#evenement_majeurs').is(':checked')) 
	    {           if ($field.val().length > 0) 
		    {
                for (var i = 0; i < tabLieuxNonPlaces.length; i++)
				{
                    if (CaracteresAccentues(tabLieuxNonPlaces[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
					{
                        tabviderchampsrecherche.push(tabLieuxNonPlaces[i]);
                    }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                     affichagelisteLieuxNonPlacesMAJ(tabviderchampsrecherche);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxNonPlaces.length+  " "+$lieux+")");

                }
				else
                    
                if (tabviderchampsrecherche.length === 1)
				{
                 affichagelisteLieuxNonPlacesMAJ(tabviderchampsrecherche);
				 if(tabLieuxNonPlaces.length===1)
				 {
				     $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxNonPlaces.length+   " "+$lieu+")");
				 }
				 else
				 {
                 $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxNonPlaces.length+   " "+$lieux+")");
				 }
                }
				else 
				{
                 affichagelisteLieuxNonPlacesMAJ(tabviderchampsrecherche);
                 $('#nombrerecherche').val($aucunLieu);
                }
           

            } else 
			{

                if (tabLieuxNonPlaces.length > 1) 
				{
                     affichagelisteLieuxNonPlacesMAJ(tabLieuxNonPlaces);
                    $('#nombrerecherche').val("(" + tabLieuxNonPlaces.length +  " "+$lieux+")");

                } else
                if (tabLieuxNonPlaces.length ===1) 
				{
                    affichagelisteLieuxNonPlacesMAJ(tabLieuxNonPlaces);
                    $('#nombrerecherche').val("(" + tabLieuxNonPlaces.length + " "+$lieu+")");
                } 
				else 
				{
                      affichagelisteLieuxNonPlacesMAJ(tabLieuxNonPlaces);
                    $('#nombrerecherche').val($aucunLieu);
                }


            }
		}
    }
     
     
        if (texte === "D") // Tous les lieux
        {    
        if ($('#tous').is(':checked')) 
		{
            if ($field.val().length > 0)
			{
                for (var i = 0; i < lieux.length; i++) 
				{
                    if (CaracteresAccentues(lieux[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
					{
                      //  alert(lieux[i].L.La);
                        tabviderchampsrecherche.push(lieux[i]);
                        
                      var latlng = L.latLng(lieux[i].L.La, lieux[i].L.Lo);
                      tablatlng.push(latlng);
                      
                    }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                        affichagelisteLieuxVisibl(tabviderchampsrecherche);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieux+")");
                  //  alert(tablatlng.length);
                    var bounds = new L.LatLngBounds(tablatlng);
                      //alert(tablatlng);
                      map.fitBounds(bounds);
                   // map.setView(tablatlng);
               //     $('#liste2').html("");
                //    $('#liste2').html(listeLieux);

                } 
				else
                if (tabviderchampsrecherche.length === 1) 
				{
                 affichagelisteLieuxVisibl(tabviderchampsrecherche);
		 if(lieux.length===1)
		 {
		  $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieu+")");
		 }
		 else
		 {
                 $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+lieux.length+  " "+$lieux+")");
                 }
                   var bounds = new L.LatLngBounds(tablatlng);
                   map.fitBounds(bounds);
                } else 
				{
                    listeLieux = affichagelisteLieuxVisibl(tabviderchampsrecherche);
                    $('#nombrerecherche').val($aucunLieu);
                     map.fitBounds(markers.getBounds());
                }

            } else 
			{


                if (lieux.length > 1) 
				{
                     affichagelisteLieuxVisibl(lieux);
                    //$('#liste2').html("");
                    //$('#liste2').html(listeLieux);
                    $('#nombrerecherche').val("(" + lieux.length +  " "+$lieux+")");
                    //  alert(tablatlng.length);
                     map.fitBounds(markers.getBounds());;

                } else
                if (lieux.length === 1) 
				{
                    affichagelisteLieuxVisibl(lieux);              
                    $('#nombrerecherche').val("(" + lieux.length +  " "+$lieu+")");
                    map.fitBounds(markers.getBounds());
                } else 
				{
                    affichagelisteLieuxVisibl(lieux);
                //  alert(tablatlng.length);
                    map.fitBounds(markers.getBounds());
                    $('#nombrerecherche').val($aucunLieu);
                }


            }
        }

        if ($('#evenement_majeurs').is(':checked')) 
		{
            // var tab = [];
            if (tabviderchampsrecherche.length !== 0) 
			{
                tabviderchampsrecherche = [];
            }
              if (tablatlng.length !== 0) 
			  {
                tablatlng = [];
            }
            if ($field.val().length > 0) 
			{

                for (var i = 0; i < tabLieuxEvtsMajeur.length; i++) 
				{
                    if (CaracteresAccentues(tabLieuxEvtsMajeur[i].L.V).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) {

                        tabviderchampsrecherche.push(tabLieuxEvtsMajeur[i]);
                        var latlng = L.latLng(tabLieuxEvtsMajeur[i].L.La, tabLieuxEvtsMajeur[i].L.Lo);
                        tablatlng.push(latlng);
                    }
                }
                if (tabviderchampsrecherche.length > 1) 
				{
                    affichagelisteLieuxVisiblMAJ(tabviderchampsrecherche);
                    var bounds = new L.LatLngBounds(tablatlng);
                    map.fitBounds(bounds);
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+   " "+$lieux+")");
                }
				else
                if (tabviderchampsrecherche.length === 1) 
				{
                   affichagelisteLieuxVisiblMAJ(tabviderchampsrecherche);
                   // $('#liste2').html("");
                   // $('#liste2').html(listeLieux);
		   if(tabLieuxEvtsMajeur.length===1)
		   {
		    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+  " "+$lieu+")");
		   }
		   else
		   {
                    $('#nombrerecherche').val("(" + tabviderchampsrecherche.length +"/"+tabLieuxEvtsMajeur.length+  " "+$lieux+")");
	     	   }
                    var bounds = new L.LatLngBounds(tablatlng);
                    map.fitBounds(bounds);
                } else
				{
                affichagelisteLieuxVisiblMAJ(tabviderchampsrecherche);
                   // $('#liste2').html("");
                    //$('#liste2').html(listeLieux);
                    $('#nombrerecherche').val($aucunLieu);
                      var bounds = new L.LatLngBounds(tablatlng);
                      map.fitBounds(bounds);
                }
            } else 
			{

                if (tabLieuxEvtsMajeur.length > 1) 
				{
					affichagelisteLieuxVisiblMAJ(tabLieuxEvtsMajeur);
					map.fitBounds(markers.getBounds());;
                    $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length + " "+$lieux+")");
                } else
                if (tabLieuxEvtsMajeur.length === 1) 
				{
					affichagelisteLieuxVisiblMAJ(tabLieuxEvtsMajeur);
                    map.fitBounds(markers.getBounds());
                    $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length + " "+$lieu+")");
                } else 
				{
					affichagelisteLieuxVisiblMAJ(tabLieuxEvtsMajeur);
					map.fitBounds(markers.getBounds());
                    $('#nombrerecherche').val($aucunLieu);
                }
            }
        }
     }
    });

    $('#suprimeContenenulieu').click(function() 
	{
        $('#lieu').val("");
        $('#lieu').focus();
        if ($('#tous').is(':checked')) 
		{
            var listeLieux;
            if (lieux.length > 1) 
			{
                listeLieux = affichagelisteLieux(lieux);
                $('#nombrerecherche').val("(" + lieux.length + " "+$lieux+")");
                $('#liste2').html("");
                $('#liste2').html(listeLieux);
                  //map.fitBounds(markers.getBounds());  
            } else
            if (lieux.length === 1)
			{
                listeLieux = affichagelisteLieux(lieux);
                $('#nombrerecherche').val("(" + lieux.length + " "+$lieu+")");
                $('#liste2').html("");
                $('#liste2').html(listeLieux);
                   // map.fitBounds(markers.getBounds());
            } else 
			{
                listeLieux = affichagelisteLieux(lieux);
                $('#nombrerecherche').val($aucunLieu);
                $('#liste2').html("");
                $('#liste2').html(listeLieux);
                    //map.fitBounds(markers.getBounds());
            }
        }
        if ($('#evenement_majeurs').is(':checked'))
		{
            if (tabLieuxEvtsMajeur.length > 1) 
			{
                listeLieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
                $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length +  " "+$lieux+")");
                $('#liste2').html("");
                $('#liste2').html(listeLieux);
                   // map.fitBounds(markers.getBounds());
            } else
            if (tabLieuxEvtsMajeur.length === 1) 
			{
                listeLieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
                $('#nombrerecherche').val("(" + tabLieuxEvtsMajeur.length +  " "+$lieu+")");
                $('#liste2').html("");
                $('#liste2').html(listeLieux);
                    //map.fitBounds(markers.getBounds());
            } else 
			{
                listeLieux = affichagelisteLieuxMAJ(tabLieuxEvtsMajeur);
                $('#nombrerecherche').val($aucunLieu);
                $('#liste2').html("");
                $('#liste2').html(listeLieux);
                   // map.fitBounds(markers.getBounds());
            }

        }
    });

    //********************************* AUTOCOMPRETION POUR NOM (bouton recherche automatique liste nom)**************************************************************

    //********************************* AUTOCOMPRETION POUR PRENOM (bouton recherche automatique liste prenom)**************************************************************
	 rechercheSurNom();
    rechercheSurPrenom();
	
	

$('#suprimeContenenunom').click(function() 
{
    var liste = "";
    $('#nom').val("");
    $('#prenom').val("");
    $('#prenom').focus();
    if ($('#tous').is(':checked')) 
	{
        //  affichageliste(AllIndividus, '#liste', "filtreByName");
        if (Individus.length > 1) 
		{
            liste = affichagelisteIndividus(Individus);
            $('#liste').html("");
            $('#liste').html(liste);
            $('#nombrerecherche2').val("(" + Individus.length + " "+$individus+")");
        } 
		else
        if (Individus.length === 1) 
		{
            liste = affichagelisteIndividus(Individus);
            $('#liste').html("");
            $('#liste').html(liste);
            $('#nombrerecherche2').val("(" + Individus.length + " "+$individu+")");
        } 
		else 
		{
            liste = affichagelisteIndividus(Individus);
            $('#liste').html("");
            $('#liste').html(liste);
            $('#nombrerecherche2').val($aucunIndividu);
        }
    }
    if ($('#evenement_majeurs').is(':checked'))
	{
        //  affichageliste(tableauIndvAvecEvenMajeur, '#liste', "filtreByNameEvenMajeur");

        if (tabIndivEvtsMajeur.length > 1) 
		{
            liste = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
            $('#liste').html("");
            $('#liste').html(liste);
            $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individus+")");
        } 
		else
        if (tabIndivEvtsMajeur.length === 1)
		{
            liste = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
            $('#liste').html("");
            $('#liste').html(liste);
            $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individu+")");
        } 
		else 
		{
            liste = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
            $('#liste').html("");
            $('#liste').html(liste);
            $('#nombrerecherche2').val($aucunIndividu);
        }
    }
});
});

}


function affichagelisteLieux(tab)
 {

    trytab(tab);
    var affiche = "<ul>";
    var entetePrecedent = "";
    var entetePrecedent2 = "";
    var nombre;
    for (var i = 0; i < tab.length; i++) 
	{

			              // for (key in tab) {
					var lieu = tab[i].L.V;
					var entete = lieu.substring(1, 0).toUpperCase();
					entete=CaracteresAccentues(entete);
					// alert(lieu);
					if (entete !== entetePrecedent)
					{
						entetePrecedent = entete;
						affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
						affiche += "<ul>";
					}
					//   affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + tab[i].L.ID + "'); return false\">";
					if( tab[i].L.n==1)
					{
					   affiche += "<li title=\""+ tab[i].L.n+$evenements+"\" class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + tab[i].L.ID + "'); return false\">";
					  //affiche += "title=\""+ tab[i].L.nm+" evenement"+"\"";
					}
					else
					{
					   affiche += "<li title=\""+ tab[i].L.n+$evenements+"\" class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + tab[i].L.ID + "'); return false\">";
					}	 
					if (tab[i].L.c !== "") 
					{
						affiche += lieu + " (" + tab[i].L.c + ")" + "   <span>" + tab[i].L.n + "</span>";
					} 
					else 
					{
						affiche += lieu + "<span>" + tab[i].L.n + " "+"</span>";
					}
					affiche += "</a> </li>";
			   

    } 
    affiche += "</ul>";

    return affiche;
    //  $(liste).html("");
    //  $(liste).html(affiche);
}




function affichagelisteLieuxMAJ(tab) 
{
    // 
    // alert(tab.length);
    // tab=Object.keys(tab);
    //  alert(tab);
    //	var t=tablieux;
    trytab(tab);
    //alert(tab);
    var affiche = "<ul>";
    var entetePrecedent = "";
    var entetePrecedent2 = "";
    var nombre;
    //alert(res);
    // var key;
    //$.each(tab, function(key, val) {
    //Object.keys(tab).forEach(function(key){
    for (var i = 0; i < tab.length; i++) 
	{
        // for (key in tab) {
        var lieu = tab[i].L.V;
        var entete = lieu.substring(1, 0).toUpperCase();
		//entete=entete.replace(/[èéêë]/gi,'E');
		entete=CaracteresAccentues(entete);
        // alert(lieu);
        if (entete !== entetePrecedent) 
		{
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
            affiche += "<ul>";
        }
	 	if( tab[i].L.nm==1)
		{
		   affiche += "<li title=\""+ tab[i].L.nm+$oneEvenement+"\" class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEventMajeur('" + tab[i].L.ID + "'); return false\">";
		  //affiche += "title=\""+ tab[i].L.nm+" evenement"+"\"";
		}
		else
		{
		   affiche += "<li title=\""+ tab[i].L.nm+$evenements+"\" class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEventMajeur('" + tab[i].L.ID + "'); return false\">";
		 // affiche += "title=\""+ tab[i].L.nm+" evenements"+"\"";
		}	 
        if (tab[i].L.c !== "") 
		{
            affiche += lieu + " (" + tab[i].L.c + ")" + "   <span>" + tab[i].L.nm + "</span>";
        } 
		else 
		{
            affiche += lieu + "<span>" + tab[i].L.nm + "</span>";
        }
        affiche += "</a> </li>";
    } //);
    affiche += "</ul>";

    return affiche;
    //  $(liste).html("");
    //  $(liste).html(affiche);
}

function affichagelisteIndividus(tab) 
{
    var affiche = "<ul>";
    var entetePrecedent = "";
    var entete="";
    //var nombre;
  // var date = (new Date()).getTime();
 
    trytabNomPrenom(tab);
    for (var i = 0; i <tab.length; i++) 
	{
      var nom = tab[i].I.N;
       // var prenom = tab[i].I.P;
        //var nomcomplet = nom + " " + prenom;
         entete = nom.substring(1, 0).toUpperCase();
		//entete=entete.replace(/[èéêë]/gi,'E');
		//entete=entete.replace(/[Áâ]/gi,'A');
		entete=CaracteresAccentues(entete);
        if (entete !== entetePrecedent) 
		{
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3></li>";
            affiche += "<ul>";
        }
		if(tab[i].I.n===1)
		{
		  affiche += "<li title=\""+tab[i].I.n+$oneEvenement+"\" class=\"decal\"><a href=\"#\" onClick=\"afficheIndiv('" + tab[i].I.ID + "');return false\">";
		}
		else
		{
		  affiche += "<li title=\""+tab[i].I.n+$evenements+"\" class=\"decal\"><a href=\"#\" onClick=\"afficheIndiv('" + tab[i].I.ID + "');return false\">";
		}
		if(tab[i].I.P!==undefined)
		{
		 affiche += nom+" "+tab[i].I.P + " " +tab[i].I.df + "<span>" + tab[i].I.n + "</span>";
		}	
		if(tab[i].I.P===undefined)
		{
		 affiche += nom+" " +tab[i].I.df + "<span>" + tab[i].I.n + "</span>";
		}
       
        // } 
        affiche += "</a></li>";
    } //); 
    affiche += "</ul>";

    return affiche;
    // $(liste).html("");
    // $(liste).html(affiche)

}

function affichagelisteIndividusEvtMAJ(tab) 
{
    var affiche = "<ul>";
    var entetePrecedent = "";
    var nombre;

    trytabNomPrenom(tab);
    // alert(tab);
    //	$.each(tab, function(key, val) {
    //  for (var key in tab) {
    //  for (var key in tab) {
    //	tab.each(function(key, val){
    //Object.keys(tab).forEach(function(key){
    for (var i = 0; i < tab.length; i++) 
	{
        var nom = tab[i].I.N;
        //var prenom = tab[i].I.P;
       // var nomcomplet = nom + " " + prenom;
        var entete = nom.substring(1, 0).toUpperCase();;
        if (entete !== entetePrecedent) 
		{
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3></li>";
            affiche += "<ul>";
        }
//        affiche += "<li class=\"decal\"><a href=\"#\" onClick=\"afficheIndivMajeur('" + tab[i].I.ID + "');return false\">";
	    if(tab[i].I.nm===1)
		{
		  affiche += "<li title=\""+tab[i].I.nm+$oneEvenement+"\" class=\"decal\"><a href=\"#\" onClick=\"afficheIndivMajeur('" + tab[i].I.ID + "');return false\">";
		}
		else
		{
		  affiche += "<li title=\""+tab[i].I.nm+$evenements+"\" class=\"decal\"><a href=\"#\" onClick=\"afficheIndivMajeur('" + tab[i].I.ID + "');return false\">";
		}
        // if(nomcomplet.length>33)
        // {
        //     var nomcoupe=nomcomplet.substring(0,33);
        //    affiche+=nomcoupe+"...."+"<span>"+tab[key].n+"</span>";
        // }
        // else
        // {
         // affiche += nomcomplet + " " +tab[i].I.df + "<span>" + tab[i].I.nm + "</span>";
		if(tab[i].I.P!==undefined)
		{
		 affiche += nom+" "+tab[i].I.P + " " +tab[i].I.df + "<span>" + tab[i].I.nm + "</span>";
		}	
		if(tab[i].I.P===undefined)
		{
		 affiche += nom+" " +tab[i].I.df + "<span>" + tab[i].I.nm + "</span>";
		}
        // } 
        affiche += "</a></li>";
    } //); 
    affiche += "</ul>";

    return affiche;
    // $(liste).html("");
    // $(liste).html(affiche)

}


function AfficheDetailLieu(keyEvents, key) 
{
 var titles2="";
  var nomcomplet="";
    var codelieu = tablieux[key].L.c;
    var lieu = tablieux[key].L.V;
    var lat = tablieux[key].L.La;
    var longi = tablieux[key].L.Lo;
    sortByDate(keyEvents);
    $('.leaflet-sidebar').css(
	  {
        opacity: 1
      });
    sidebar.show(keyEvents);
    var titles = "";
    if (codelieu !== "") 
	{
       
           titles = "<div class=\"bulles\"><h1>" + lieu + " (" + codelieu + ")";
    }
	else
	{
        titles = "<div class=\"bulles\"><h1>" + lieu ;
    }
    if((lat===0.0)&&(longi===0.0))
    {
       titles += " : non localisé";   
    }
    titles += "</h1></div>";
  
    for (var i = 0; i < keyEvents.length; i++) 
	{
       // var entete =keyEvents[i].i1[0] ;
        var entete2 =keyEvents[i].i2 ;
		for(var j = 0;j < keyEvents[i].i1.length; j++)
		{
		
			if (entete2 !== undefined) 
			{
			 
			   if((tabIndividus[keyEvents[i].i1[j]].I.N !==undefined)&&(tabIndividus[keyEvents[i].i1[j]].I.P!==undefined))
			   {
			    nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i1[j]].I.N + " " + tabIndividus[keyEvents[i].i1[j]].I.P;
			   }
			   if((tabIndividus[keyEvents[i].i1[j]].I.N !==undefined)&&(tabIndividus[keyEvents[i].i1[j]].I.P===undefined))
			   {
			    nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i1[j]].I.N ;
			   }
			   if((tabIndividus[keyEvents[i].i1[j]].I.N ===undefined)&&(tabIndividus[keyEvents[i].i1[j]].I.P!==undefined))
			   {
			    nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i1[j]].I.P ;
			   }
			    nomcomplet += " & ";
				
			   if((tabIndividus[keyEvents[i].i2].I.N !==undefined)&&(tabIndividus[keyEvents[i].i2].I.P!==undefined))
			   {
			    nomcomplet += tabIndividus[keyEvents[i].i2].I.N + " " + tabIndividus[keyEvents[i].i2].I.P
			   }
			   if((tabIndividus[keyEvents[i].i2].I.N !==undefined)&&(tabIndividus[keyEvents[i].i2].I.P===undefined))
			   {
			    nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i2].I.N ;
			   }
			   if((tabIndividus[keyEvents[i].i2].I.N ===undefined)&&(tabIndividus[keyEvents[i].i2].I.P!==undefined))
			   {
			    nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i2].I.P ;
			   }
				
				nomcomplet += "</h3>";	
			}
			else
			{
			    if((tabIndividus[keyEvents[i].i1[j]].I.N !==undefined)&&(tabIndividus[keyEvents[i].i1[j]].I.P !==undefined))
				{
				nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i1[j]].I.N + " " + tabIndividus[keyEvents[i].i1[j]].I.P + "</h3>";
				}
				if((tabIndividus[keyEvents[i].i1[j]].I.N !==undefined)&&(tabIndividus[keyEvents[i].i1[j]].I.P ===undefined))
				{
				nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i1[j]].I.N + "</h3>";
				}
				if((tabIndividus[keyEvents[i].i1[j]].I.N ===undefined)&&(tabIndividus[keyEvents[i].i1[j]].I.P !==undefined))
				{
				nomcomplet += "<h3>" + tabIndividus[keyEvents[i].i1[j]].I.P + "</h3>";
				}
			
			}
        }
        if((keyEvents[i].D!==undefined)&&(keyEvents[i].S!==undefined))
        {
          titles += nomcomplet+"<h5><span>" + keyEvents[i].T+ " : " + keyEvents[i].D +" : "+keyEvents[i].S+           "</span></h5>";
        }		      
        if((keyEvents[i].D!==undefined)&&(keyEvents[i].S===undefined))
        {
          titles += nomcomplet+"<h5><span>" + keyEvents[i].T +" : " + keyEvents[i].D +      "</span></h5>";
        }
		if((keyEvents[i].D===undefined)&&(keyEvents[i].S !==undefined))
        {
		  titles2+=nomcomplet+ "<h5><span>"+ keyEvents[i].T + "</span></h5>";
          titles2 += keyEvents[i].S    + "</span></h5>";
        }
		if((keyEvents[i].D===undefined)&&(keyEvents[i].S===undefined))
        {
          titles2 += nomcomplet+"<h5><span>"+ keyEvents[i].T + "</span></h5>";
        }
     	nomcomplet="";
    }

	liste =titles+titles2;

    $('.leaflet-sidebar').css(
	{
        opacity: 1
    });
    $('#side').html(liste);
	if((lat!==0.0)&&(longi!==0.0))
	{
		map.setView([lat, longi], map.getZoom(), 
		{
			animate: true,
			duration: 2.0,
			easeLinearity: 5.0
		
		});
	}
}


/**
 *
 * @param {type} res : tableau lieux non placés
 * @returns {undefined}
 */
 /*/
function affichagelisteLieuxNonPlaces(res) {
 alert(res);
    res = supprimeLesDoublons(res);
    //res.sort();
    trytab(res);
    var affiche = "<ul>";
    var entetePrecedent = "";
    for (var i = 0; i < res.length; i++) {
          var lieu = res[i].L.V;
          alert(lieu);
        var entete = lieu.substring(1, 0);
        if (entete !== entetePrecedent) {
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
            affiche += "<ul>";
        }

       affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + res[i].L.ID + "'); return false\">";
        affiche += lieu +  " (" + res[i].L.c + ")<span>" +res[i].L.n + "</span>";
        affiche += "</a> </li>";
    }
    affiche += "</ul>";
    $("#liste2").html("");
    $("#liste2").html(affiche);
}
*/
/*
    trytab(res);
    var affiche = "<ul>";
    var entetePrecedent = "";
   // alert(res);
    for (var i = 0; i < res.length; i++) {
        var lieu = res[i].L.V;
        var entete = lieu.substring(1, 0);
        if (entete !== entetePrecedent) {
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
            affiche += "<ul>";
        }
        affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + res[i].L.ID + "'); return false\">";
        affiche += lieu +  " (" + res[i].L.c + ")<span>" +res[i].L.n + "</span>";
        affiche += "</a> </li>";
    }
    affiche += "</ul>";
    $("#liste2").html("");
    $("#liste2").html(affiche);*/
function supprimeDoublonTableauLieu(a, tab)
 {
    var bool = false;

    for (j = 0; j < tab.length; j++) 
	{
        if (tab[j].ville === a.ville)
		{
            bool = true;
        }
    }
    return bool;
}
/**
 * filtreByName () : permet de recuperer un indiviuds à partir de sa clé
 * @param {type} cle : la cle de l'individu
 * @returns {undefined}
 */
//function filtreByName(cle) {
//   var indiv = new individu();
//   indiv = AllIndividus[cle];
//   AfficheDetailIndividu(indiv);
//}
/**
 * filtreByName () : permet de recuperer un indiviuds à partir de sa clé
 * @param {type} cle : la cle de l'individu
 * @returns {undefined}
 */
function filtreByNameEvenMajeur(cle) 
{
    var indiv = new individu();
    indiv = AllIndividus[cle];
    AfficheDetailIndividuAvecEvMaj(indiv);
}
/**
 *
 * @param {type} indiv : un individu
 * @
 */

/**
 *
 * @param {type} indiv : affiche les details d'un individus ayant un evenement majeur
 * @returns {undefined}
 */
/**
 * trytab(): fonction pour trier un tableau d'objet . trie croissant par nom
 * @param {type} tab : tableau contenant des objets de type individu
 * @returns {undefined}
 */
//function trytab(tab) {
//   tab.sort(function(a, b) {
//       return (a.L.V > b.L.V) ? 1 : -1;
//   });
//
//}


/**
 * tritabDate(): fonction pour trier un tableau de date
 * @param {type} tab : tableau contenant les dates
 * @returns {undefined}
 */
function tritabDate(tab) 
{
    tab.sort(function(a, b) 
	{
        return (a > b) ? 1 : -1;
    });

}
/**
 * lieuPlusRepresente(): fonction pour trier un tableau d'objet . trie croissant par nombre evenements
 * @param {type} tab tableau contenant des objets de type evenement
 * @returns {unresolved}
 */
//function lieuPlusRepresente(tab) {
//   tab.sort(function(a, b) {
//       return (a.nombreEven < b.nombreEven) ? 1 : -1;
//   });
//   return tab;
//}
/**
 * tableaulieu() : retour un tableau de lieux sans doublon et trier par ville
 * @param {type} tab : tableau contenant tous les lieux
 * @returns {Array|nobreEvenement.nombre|tableaulieu.montabVille}
 */

function tableaulieu(tab) 
{

    var i = 0;
    var montabVille = new Array();
    for (var i = 0; i < tab.length; i++) 
	{
        // Ville.push(tab[i]);
        var tt = supprimeDoublonTableauLieu(tab[i].ville, montabVille);
        if (tt === false)
		{
            // tab1[i].NombreEvenements= nbre;
            montabVille.push(tab[i]);

        }
    }
    // montabVille.sort();
    trytab(montabVille);

    montabVille = nobreEvenement(montabVille, tab);
    //alert(montabVille[0].ville);
    return montabVille;
}

/**
 *
 * @param {type} tab  :tableau contenant des objets de type evenement
 * @returns {Array|listeLieuxAvecEvenMajeur.montabVille}
 */
function listeLieuxAvecEvenMajeur(tab)
 {
    var montabVille = new Array();
    for (var i = 0; i < tab.length; i++) 
	{
        if (tab[i].Majeur === 1) 
		{

            montabVille.push(tab[i]);

        }
    }
    return montabVille;
}
/**
 *
 * @param {type} tab : tableau contenant des objets de type evenement
 * @returns {Array|tableaulieuEvenetMajeur.montabVille|nobreEvenement.nombre}
 */
function tableaulieuEvenetMajeur(tab) 
{
    var montabVille = new Array();

    for (var i = 0; i < tab.length; i++) 
	{
        var tt = supprimeDoublonTableauLieu(tab[i].ville, montabVille);
        if (tt === false) 
		{
            // tab1[i].NombreEvenements= nbre;
            montabVille.push(tab[i]);
        }
        // }
    }
    trytab(montabVille);
    montabVille = nobreEvenement(montabVille, tab);
    return montabVille;
}

/**
 * @param {type} a description
 * @param {type} tab description
 */
function supprimeDoublonTableauLieu(a, tab) 
{
    var bool = false;
    var i = 0;
    for (j = 0; j < tab.length; j++)
	{
        if (tab[j].ville === a) 
		{
            bool = true;
        }
    }

    return bool;
}


function supprimeDoublonlatitudeLongitude(a, tab) 
{
    var bool = false;

    for (var j = 0; j < tab.length; j++) 
	{
        if ((tab[j].La === a.La) && (tab[j].Lo === a.Lo))
		{
            bool = true;
        }
    }

    return bool;
}

function supprimeDoublonindiv(a, tab) 
{
    var bool = false;

    for (var j = 0; j < tab.length; j++)
	{
        if (tab[j].I.ID === a)
		{
            bool = true;
        }
    }

    return bool;
}

function supprimeDoublonlieux(a, tab)
 {
    var bool = false;

    //alert(typeof a);
    for (var j = 0; j < tab.length; j++) 
	{
        //     alert(typeof tab[j].L.ID);
        if (tab[j].L.ID === a)
		{
            bool = true;
        }
    }

    return bool;
}

/**
 *  diaporama par periode
 * @param {type} date1 : date debut
 * @param {type} date2 : date fin
 * @returns {undefined}
 */
//var polyline=new L.polyline();
function RepartionParPeriode(date1, date2, tab)
 {
    removeAllMarkers();
    createMarkers();
    //var ltlng=[];
    for (var i = 0; i < tab.length; i++) // parcourir les lieux de chaque evenement pour recuperer la 
    {
        var d1= tab[i].E.A;

        //var lat = tablieux[tab[i].E.IL].L.La;
          //  var long = tablieux[tab[i].E.IL].L.Lo;
           //alert(lat);
           // alert(long);
        if ((d1 >= date1) && (d1 <= date2)) 
		{
            var lat = tablieux[tab[i].E.IL].L.La;
            var longi= tablieux[tab[i].E.IL].L.Lo;
			if((lat!==0.0)&&(longi!==0.0))
			{
            var titre = String(tab[i].E.IL);
            var texte = $hint + "'" + tablieux[tab[i].E.IL].L.V + "'";
			if((lat!==0.0)&&(longi!==0.0))
				var latlng = new L.LatLng(lat, longi);
			  
				//ltlng.push(latlng);
				var marker = new L.Marker(latlng, 
				{
					title: texte,
					icon: myIcon
				}).bindPopup(titre);

			    markers.addLayer(marker);

		    } 
        }
    }
 map.addLayer(markers); 
}
/**
 *
 * @param {type} monTableau : tableau contenant des doublons
 * @returns {unresolved}
 */
function supprimeLesDoublons(monTableau) 
{
    var cache = Array();
    monTableau = monTableau.filter(function(elem, index, array) 
	{
        return cache[elem] ? 0 : cache[elem] = 1;
    });
    return monTableau;
}
/**
 *  RepartionParGeneration() : diaporama par generation
 * @param {type} G1 :  generation debut
 * @param {type} G2 :  generation fin
 * @returns {undefined}
 */
function RepartionParGeneration(G1, G2, tab) 
{
    removeAllMarkers();
    createMarkers();

    for (var i = 0; i < tab.length; i++) // parcourir les lieux de chaque evenement pour recuperer la 
    {
        //alert(G2);
        if ((tabIndividus[tab[i].E.i1[0]].I.G >= G1) && (tabIndividus[tab[i].E.i1[0]].I.G <= G2)) 
		{
            var texte =$hint + "'" + tablieux[tab[i].E.IL].L.V + "'";
            var titre = String(tab[i].E.IL);
            var lat = tablieux[tab[i].E.IL].L.La;
            var longi = tablieux[tab[i].E.IL].L.Lo;
            if((lat!==0.0)&&(longi!==0.0))
            {
				var latlng = new L.LatLng(lat, longi);
				var marker = new L.Marker(latlng,
			{
                title: texte,
                icon: myIcon
            }).bindPopup(titre);;
            markers.addLayer(marker);
		   }
        }
     
    }
   map.addLayer(markers); 
}

/**
 *
 * @param {type} Tab : contenant tous les individus
 * @param {type} Tab2 : contenantles individus sans doublon
 * @returns {Array|AllIndividusAvecAvenMaj.tabIndAvecEven}
 */
function AllIndividusAvecAvenMaj(Tab, Tab2) 
{
    var k = 0;
    var tabIndAvecEven = new Array();
    for (var i = 0; i < Tab2.length; i++) 
	{
        for (var j = 0; j < Tab.length; j++) 
		{
            if (Tab2[i].Cle === Tab[j].idenEven.cleInd)
			{
                k = k + 1;
            }

        }
        if (k !== 0) 
		{
            var ind = new individu();
            ind.Cle = Tab2[i].Cle;
            ind.Nom = Tab2[i].Nom;
            ind.Prenom = Tab2[i].Prenom;
            ind.NombreEvenements = k;
            tabIndAvecEven.push(ind);
            k = 0;
        }
    }

    return tabIndAvecEven;

}

/**
 *
 * @param {type} monTableau
 * @returns {unresolved}
 */
// function supprimeDoublonLatLng(monTableau) {
//     var cache = new Array();
//     monTableau = monTableau.filter(function(elem, index, array) {
//         return cache[elem] ? 0 : cache[elem] = 1;
//     });
//     return monTableau;
// }


/**
 *
 * @param {type} tab
 * @param {type} indiv
 * @returns {undefined}
 */
function affichageParVIlle(tab, indiv) 
{
    var titles = "";

    var entetePrecedent = "";

    titles += "<div class=\"bulles\"><h1>" + indiv.Nom + " " + indiv.Prenom;

    for (var i = 0; i < tab.length; i++) 
	{
        var codelieu = tab[i]["L"].c;
        var entete = tab[i]["L"].V;
        // alert(entete);
        if (entete !== entetePrecedent) 
		{
            entetePrecedent = entete;
            if (codelieu === "") 
			{
                titles += "<h3><a href=\"\"  onClick=\"afficheLieu('" + entete + "'); return false\">" + entete + " " + tab[i]["L"].c + "</a></h3>";
            } 
			else 
			{
                titles += "<h3><a href=\"\"  onClick=\"afficheLieu('" + entete + "'); return false\">" + entete + " (" + tab[i]["L"].c + ")" + "</a> " + "</h3>";

            }

        }

        if ((tab[i].S === undefined)&&(tab[i].D===undefined)) 
		{
            titles += "<div class=\"bulles\"><h2>" + "<span>" + tab[i].T +  "</span></h2></div>";

        }
        if ((tab[i].S === undefined)&&(tab[i].D!==undefined)) 
		{
            titles += "<div class=\"bulles\"><h2>" + "<span>" + tab[i].T + " - " + tab[i].D+ "</span></h2></div>";

        }
         if ((tab[i].S !== undefined)&&(tab[i].D===undefined)) 
		 {
            titles += "<div class=\"bulles\"><h2>" + "<span>" + tab[i].T + " - " + tab[i].S+ "</span></h2></div>";

        }
         if ((tab[i].S !== undefined)&&(tab[i].D!==undefined))
        {
            titles += "<div class=\"bulles\"><h2>" + "<span>" + tab[i].T + " - " + tab[i].D + " - " + tab[i].S + "</span></h2></div>";
        }

    }


$('#side').html(titles);
}



function clearLayer(tab) 
{
    for (var i = 0; i < tab.length; i++)
        map.removeLayer(tab[i]);

};


function getGeneration(tab) 
{
    var t = [];
    for (var i = 0; i < tab.length; i++) 
	{
        t.push(tab[i].Generation);
    }
    t.sort();
    return t;
}

 
//function prints()
//{
//    sidebar.hide();
//    
// //document.location='index.html'.print();
// window.print();
//}
function hideBandeauxLateraux()
{
      $('.leaflet-sidebar').css(
	    {
            opacity: 0
        });
      $('#droite').hide();
      $('#gauche').hide();
}
function showBandeauxLateraux()
{
       $('#droite').show();
       $('#gauche').show();    

}
/**
* impressionCarte: fonction pour l'impression de la carte. printCarte est la valeur passée en parametre à Heredis

 * @returns  */
function impressionCarte()
{
	encodeURI(document.location.href='index.html?Hcommand=printCarte');
}
$("#carte").hover(function() {
    sidebar.hide();
});
$("#carte").on("click",function ()
{    
	encodeURI(document.location.href='index.html?Hcommand=printCarte');
});
 
 /**
 * impression liste eclaire
  * bounds : tableau contenant les cordonnées des markers qui sont visible sur la carte
  * Evenements : tableau des evenements
  * liste: tableau contenant les ID evenement des markers qui sont sur la carte 
  * listeEclaire : tableau contenant  les ID evenement des markers qui sont sur la carte sans doublon
  * listeEclaireString : conversion de la listeEclaire en chaine
  *  encodeURI(document.location.href='index.html?Hcommand=liste'): on rappelle la page en lui passant comme paramettre "liste"
  *   */
 $("#Liste_eclaire").on("click",function ()
 {
    var liste = [];
	var liste2 = [];
	var bounds = map.getBounds();
    var k = 0;
	markers.eachLayer(function(marker) 
	{
		if (bounds.contains(marker.getLatLng())) 
		{
			var titre = marker.getPopup().getContent();
			liste.push(parseInt(titre));
		}
	 
	});
    liste2 = supprimeLesDoublons(liste);      
    listeEclaire =getIdEvent(liste2);
	listeEclaireString = listeEclaire.toString() ;
    encodeURI(document.location.href='index.html?Hcommand=printListe');      
 });


function getIdEvent(tab)
{
    var tab2=[];
    var k=0;
    for(var j=0;j<Evenements.length;j++)
    {
    for(var i=0;i<tab.length;i++)
    {

        if( tab[i] === Evenements[j].E.IL)
		 { 
		  tab2[k]=Evenements[j].E.ID;
		  k=k+1;
		 }
    }
   }
    tab2 = supprimeLesDoublons(tab2);
      return tab2;
}
/**
**  On tri sur le nombre d'evenement majeur puis sur les noms de lieu
*/
function triSurPlusRepEtParNomMAJ(tab) 
{
    tab.sort(function(a, b) 
	{
        if (a.L.nm === b.L.nm)
		{  
		return a.L.V.localeCompare( b.L.V);
		}		
       else
        return (a.L.nm < b.L.nm) ? 1 : -1; 		
    });
    return tab;
}
/**
**  On tri sur le nombre d'evenement puis sur les noms de lieu
*/
function triSurPlusRepEtParNom(tab) 
{
    tab.sort(function(a, b) 
	{
        if (a.L.n === b.L.n)
		{  
		return a.L.V.localeCompare( b.L.V);
		}		
       else
        return (a.L.n < b.L.n) ? 1 : -1; 		
    });
    return tab;
}
/**
* 

 * @param {type} res : tableau contenant les lieux
 * @param {type} liste : le nom de la div ('#liste')
 * @param {type} nomfunction : nom de la fonction afficheEvent(param:ID du lieu)
 * @returns {undefined} */
function affichagelisteLieuxPlusRep(res) 
{
res=triSurPlusRepEtParNom(res);

    var affiche = "<ul>";
    for (var i = 0; i < res.length; i++) 
	{
        var lieu = res[i].L.V;
        affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + res[i].L.ID + "'); return false\">";
          affiche += lieu +  " (" + res[i].L.c + ")<span>" + res[i].L.n + "</span>";
        affiche += "</a> </li>";
    }
    affiche += "</ul>";
    $("#liste2").html("");
    $("#liste2").html(affiche);
}

/*
 * @param {typ@param {type} res : tableau contenant les lieux qui ont un evenement majeur
 * @param {type} liste : le nom de la div ('#liste')
 * @param {type} nomfunction : nom de la fonction afficheEvent(param:ID du lieu)
 * @returns {undefined} */
function affichagelisteLieuxPlusRepMAJ(res) 
{
    res=triSurPlusRepEtParNomMAJ(res);
    var affiche = "<ul>";
    for (var i = 0; i < res.length; i++) 
	{
        var lieu = res[i].L.V;
        affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + res[i].L.ID + "'); return false\">";
          affiche += lieu +  " (" + res[i].L.c + ")<span>" + res[i].L.nm + "</span>";
        affiche += "</a> </li>";
    }
    affiche += "</ul>";
    $("#liste2").html("");
    $("#liste2").html(affiche);
}


/**
* @param {typ@param {type} res :liste des lieu pour laffichage des leiux non places
 */
function affichagelisteLieuxNonPlaces(res)
 {

    var affiche = "";
    if (res.length === 0) 
	{
        affiche = $aucunlieugeolocalise;
    } else {
	   trytab(res);
        affiche += "<ul>";
        var entetePrecedent = "";
        for (var i = 0; i < res.length; i++) 
		{
            var entete = res[i].L.V.substring(1, 0);
            if (entete !== entetePrecedent) 
			{
                entetePrecedent = entete;
                affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
                affiche += "<ul>";
            }
		affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + res[i].L.ID + "'); return false\">";
		affiche += res[i].L.V +  " (" + res[i].L.c + ")<span>" +res[i].L.n + "</span>";
        affiche += "</a> </li>";
        }
        affiche += "</ul>";
    }
    $("#liste2").html("");
    $("#liste2").html(affiche);

}/**
* @param {typ@param {type} res :liste des lieu pour laffichage des leiux avec evt maj non places
 */
function affichagelisteLieuxNonPlacesMAJ(res) 
{
    var affiche = "";
    if (res.length === 0) 
	{
        affiche = $aucunlieugeolocalise;
    }
	else 
	{
	   trytab(res);
        affiche += "<ul>";
        var entetePrecedent = "";
        for (var i = 0; i < res.length; i++)
		{
            var entete = res[i].L.V.substring(1, 0);
            if (entete !== entetePrecedent) 
			{
                entetePrecedent = entete;
                affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
                affiche += "<ul>";
            }
		affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEventMajeur('" + res[i].L.ID + "'); return false\">";
        affiche += res[i].L.V +  " (" + res[i].L.c + ")<span>" +res[i].L.nm + "</span>";
        affiche += "</a> </li>";
        }
        affiche += "</ul>";
    }
    $("#liste2").html("");
    $("#liste2").html(affiche);

}
/*
function affichagelisteLieuxNonPlacesMAJ(res) 
{

    var affiche = "";
    if (res.length === 0) 
	{
        affiche = "Auncun lieu non placés ";
    } 
	else
	{
	   trytab(res);
        affiche += "<ul>";
        var entetePrecedent = "";
        for (var i = 0; i < res.length; i++) 
		{
            var entete = res[i].L.V.substring(1, 0);
            if (entete !== entetePrecedent)
			{
                entetePrecedent = entete;
                affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
                affiche += "<ul>";
            }
		affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEventMajeur('" + res[i].L.ID + "'); return false\">";
        affiche += res[i].L.V +  " (" + res[i].L.c + ")<span>" +res[i].L.nm + "</span>";
        affiche += "</a> </li>";
        }
        affiche += "</ul>";
    }
    $("#liste2").html("");
    $("#liste2").html(affiche);

}*/
/**
* a : lieu
* tab :tableau des lieux
* 
 */
function supprimeDoublonTableauLieu(a, tab) 
{
    var bool = false;

    for (j = 0; j < tab.length; j++) 
	{
        if (tab[j].L.V === a) 
		{
            bool = true;
        }
    }
    return bool;
}

/**
* 

 * @param {type} res: tableau des lieux
 * @param {type} liste : la DIV (#liste ou #liste2)
 * @param {type} nomfunction : nom fonction : 
 * @returns {undefined} */
function affichagelisteLieuxVisibl(res) 
{
    trytab(res);
    var affiche = "<ul>";
    var entetePrecedent = "";
   // alert(res);
    for (var i = 0; i < res.length; i++) 
	{
        var lieu = res[i].L.V;
        var entete = lieu.substring(1, 0);
        if (entete !== entetePrecedent) 
		{
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
            affiche += "<ul>";
        }
        affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEvent('" + res[i].L.ID + "'); return false\">";
        affiche += lieu +  " (" + res[i].L.c + ")<span>" +res[i].L.n + "</span>";
        affiche += "</a> </li>";
    }
    affiche += "</ul>";
    $("#liste2").html("");
    $("#liste2").html(affiche);
   // closeLoader();
}

function affichagelisteLieuxVisiblMAJ(res) 
{
    trytab(res);
    var affiche = "<ul>";
    var entetePrecedent = "";
    //alert(res);
    for (var i = 0; i < res.length; i++) 
	{
        var lieu = res[i].L.V;
        var entete = lieu.substring(1, 0);
        if (entete !== entetePrecedent) 
		{
            entetePrecedent = entete;
            affiche += "<li class=\"lettre\"><h3 align=\"left\">" + entete + "</h3> <span></span></li>";
            affiche += "<ul>";
        }
        affiche += "<li class=\"decal\"><a href=\"#?w=500\" rel=\"popup_name\" class=\"poplight\" onClick=\"afficheEventMajeur('" + res[i].L.ID + "'); return false\">";
         affiche += lieu +  " (" + res[i].L.c + ")<span>"+ res[i].L.nm + "</span>";
        affiche += "</a> </li>";
    }
    affiche += "</ul>";
    $("#liste2").html("");
    $("#liste2").html(affiche);
}
/**
* 

 * @param {type} tab  : liste lieux à trier par ordre nombre evenements
 * @returns {unresolved} */
function lieuPlusRepresente(tab) 
{
    tab.sort(function(a, b) 
	{
        return (a.L.n < b.L.n) ? 1 : -1;
    });
    return tab;
}
/**
* 

 * @param {type} tab : liste lieux avec evenements majeurs à trier par nombre enevements majeurs
 * @returns {unresolved} */
function lieuPlusRepresenteMAJ(tab) 
{
    tab.sort(function(a, b) 
	{
        return ( a.L.nm < b.L.nm ) ? 1 : -1;
    });
    return tab;
}

/**
* affichePOI(): affichage POIs
 */
function affichePOI() 
{
    var tab = [];
    for (var i = 0; i < addressPoints.length; i++)

    {
        var a = addressPoints[i];
        //alert(a);
        var marker;
        var title = a[2];
        var myPOI = L.icon({
            iconUrl: 'images/' + a[3],
            iconSize: [32, 37]
        });
        marker = new L.Marker(new L.LatLng(a[0], a[1]), 
		{
            icon: myPOI,
			iconAnchor : [16,37]
        }).bindPopup(title);
        tab.push(marker);
    }
    return tab;
}
/** clearLayer: suppression markers sur la carte
 *@param {type} tab  tableau markers
 */
function clearLayer(tab) 
{
    for (var i = 0; i < tab.length; i++)
        map.removeLayer(tab[i]);

}
/**
* 

 * @param {type} tab liste lieux à trier par ordre alphabetique
 * @returns {undefined} */

function trytab(tab) 
{
    tab.sort(function(a, b)
	{
        //return (a.L.V > b.L.V) ? 1 : -1;
		return a.L.V.localeCompare(b.L.V);
    });
}

/**
* 

 * @param {type} tab tab liste lieux à trier par date de tri
 * @returns {undefined} */
function sortByDate(tab) 
{
    tab.sort(function(a, b)
	{
      //  alert(b.E.i1);
        return (a.DT > b.DT) ? 1 : -1;
    });
}

/**
* 

 * @param {type} tab  liste individu à trier par ordre alphabetique
 * @returns {undefined} */
function trytabNomPrenom(tab) 
{
    tab.sort(function(a, b)
	{
		if( a.I.N === b.I.N )
		{
			//return a.I.P > b.I.P ? 1 : -1;
			if( a.I.P === undefined )
				return false ;
			return a.I.P.localeCompare( b.I.P);
		}
		else
			//return (a.I.N > b.I.N) ? 1 : -1;
			return a.I.N.localeCompare(b.I.N);
    });
}

/**
* 

 * @param {type} keyIndiv l'identifiant de l'individu cliqué dans la liste des individus
 * @returns {undefined} */
function afficheIndiv(keyIndiv)
 {
	keyIndiv = parseInt( keyIndiv ) ;
    var key;
    var TabkeyEvents = [];
   // var j = 0;
    for (key in tabEvts) 
    {
		for(var i = 0 ; i < tabEvts[key].E.i1.length ; i++)
		{
			if (tabEvts[key].E.i1[i] === keyIndiv || tabEvts[key].E.i2 === keyIndiv )
			{
				var indiv =new DetailIndiv();
				indiv.T=tabEvts[key].E.T;
				indiv.C=tablieux[tabEvts[key].E.IL].L.c;
				indiv.V=tablieux[tabEvts[key].E.IL].L.V;
				indiv.La=tablieux[tabEvts[key].E.IL].L.La;
				indiv.Lo=tablieux[tabEvts[key].E.IL].L.Lo;
				indiv.A=tabEvts[key].E.A;
				indiv.S=tabEvts[key].E.S;
				indiv.df=tabEvts[key].E.df;
				indiv.D=tabEvts[key].E.D;
				indiv.DT=tabEvts[key].E.DT;
				TabkeyEvents.push(indiv);
			}
		}
    }
    AfficheDetailIndividu(TabkeyEvents, keyIndiv);
}
/**
* 

 * @param {type} keyIndiv l'identifiant de l'individu cliqué dans la liste des individus ayant au moins un evenement majeur
 * @returns {undefined} */
function afficheIndivMajeur(keyIndiv) 
{
	keyIndiv = parseInt( keyIndiv ) ;
    var key;
    var TabkeyEvents = [];
    var j = 0;
    for (key in tabEvtsMajeurs) 
	{
        if (tabEvtsMajeurs[key].E.i1[0] === keyIndiv || tabEvtsMajeurs[key].E.i2 === keyIndiv ) 
		{
			var indiv =new DetailIndiv();
			indiv.T=tabEvts[key].E.T;
			indiv.C=tablieux[tabEvts[key].E.IL].L.c;
			indiv.V=tablieux[tabEvts[key].E.IL].L.V;
			indiv.La=tablieux[tabEvts[key].E.IL].L.La;
			indiv.Lo=tablieux[tabEvts[key].E.IL].L.Lo;
			indiv.A=tabEvts[key].E.A;
			indiv.S=tabEvts[key].E.S;
			indiv.df=tabEvts[key].E.df;
			indiv.D=tabEvts[key].E.D;
			indiv.DT=tabEvts[key].E.DT;
			TabkeyEvents.push(indiv);
          
        }

    }
    AfficheDetailIndividu(TabkeyEvents, keyIndiv);

}


/**
* 

 * @param {type} TabkeyEvents : liste objets DetailIndiv()
 * @param {type} key : identifiant individu
 * @returns {undefined} */
function AfficheDetailIndividu(TabkeyEvents, key) 
{
    var titles2="";
    sortByDate(TabkeyEvents);
    var tabLatLong = new Array();
    var entetePrecedent = "";
    var titre = "";
    var nom = tabIndividus[key].I.N;
    var prenom = tabIndividus[key].I.P;
	if(prenom!==undefined)
	{
	 titre += "<div class=\"bulles\"><h1>" + nom + " " + prenom+ "</br>" +"<span>"+tabIndividus[key].I.df+"</span></h1>";       
	}
	else
	{
	 titre += "<div class=\"bulles\"><h1>" + nom + "</br>" +"<span>"+tabIndividus[key].I.df+"</span></h1>";       
	} 
    for (var i = 0; i < TabkeyEvents.length; i++) 
	{
		var lt = TabkeyEvents[i].La ;
		var lg = TabkeyEvents[i].Lo ;
		if( lt !== 0.0 && lg !== 0.0 )
		{
			tabLatLong.push(L.latLng( lt, lg ));
		}
        var codelieu = TabkeyEvents[i].C;
        var ville = TabkeyEvents[i].V;
        if (ville !== entetePrecedent) 
		{
            entetePrecedent = ville;
            if (codelieu === "") 
			{
                titre += "<h3><a href=\"\" onClick=\"afficheLieu('" + ville + "'); return false\">" + ville + " "+"</a></h3>";
            }
			else 
			{
                titre += "<h3><a href=\"\" onClick=\"afficheLieu('" + ville + "'); return false\">" + ville + " (" + codelieu + ")" + "</a> " + "</h3>";
            }
        }
        if((TabkeyEvents[i].D===undefined)&&(TabkeyEvents[i].S===undefined))
        {		
          titles2 += "<div class=\"bulles\"><h2>" + "<span>" + TabkeyEvents[i].T +"</span></h2></div>";   
        }
   
        if((TabkeyEvents[i].D===undefined)&&(TabkeyEvents[i].S !==undefined))
        {
		//   titles2 += "<div class=\"bulles\"><h2>"+TabkeyEvents[i].S+ " "+TabkeyEvents[i].V+"</span></h2></div>";  
		   titles2 +="<div class=\"bulles\"><h2>" + "<span>" + TabkeyEvents[i].T +" : " + TabkeyEvents[i].S +"</span></h2></div>";  
          
        }
         
        if((TabkeyEvents[i].D!==undefined)&&(TabkeyEvents[i].S===undefined))
        {
           titre += "<div class=\"bulles\"><h2>" + "<span>" + TabkeyEvents[i].T +" : " + TabkeyEvents[i].D + "</span></h2></div>";  
        }
        if((TabkeyEvents[i].D!==undefined)&&(TabkeyEvents[i].S!==undefined))
        {
           titre += "<div class=\"bulles\"><h2>" + "<span>" + TabkeyEvents[i].T+ " : " + TabkeyEvents[i].D +" "+TabkeyEvents[i].S+ "</span></h2></div>";  
        }
		titre+=titles2
		titles2="";
    }
	//var titre=titles;
    $('.leaflet-sidebar').css(
	{
        opacity: 1
    });
    sidebar.show();
    $('#side').html("");
    $('#side').html(titre);
	if( tabLatLong.length > 0 )
	{
		map.fitBounds(tabLatLong);
	}
}

/**
* 

 * @param {type} lieu  : lieu cliqué
 * @returns {undefined} */
function afficheLieu(lieu) 
{
    var key;
    var lt = 0.0;
    var lg = 0.0;
    for (key in tablieux) 
	{
        if (lieu === tablieux[key].L.V) 
		{
            lt = tablieux[key].L.La;
            lg = tablieux[key].L.Lo;
            break;
        }
    }
	if((lt!==0.0)&&(lg!==0.0))
	{
		map.setView([lt, lg], 18, 
		{
			animate: true,
			duration: 2.0,
			easeLinearity: 5.0,
			maxZoom: 18
		});
	}
}

/**
* 

 * @param {type} keylieu  : identifiant lieu
 * @returns {undefined} */
function afficheEvent(keylieu) 
{
	keylieu = parseInt( keylieu ) ;
    var key;
    var keyEvents = [];
    var j = 0;
    for (key in tabEvts) 
	{

        if (tabEvts[key].E.IL === keylieu ) 
		{
			var lieu =new DetailLieu();
			lieu.T=tabEvts[key].E.T;
			lieu.i1=tabEvts[key].E.i1;
			lieu.i2=tabEvts[key].E.i2;
			lieu.D=tabEvts[key].E.D;
			lieu.S=tabEvts[key].E.S;
			lieu.DT=tabEvts[key].E.DT;
			keyEvents.push(lieu);
        }

    }
	
    AfficheDetailLieu(keyEvents, keylieu);
}

function afficheEventMajeur(keylieu) 
{
	keylieu = parseInt( keylieu ) ;
    var key;
    var keyEvents = [];
    var j = 0;
    for (key in tabEvtsMajeurs) 
	{
        if (tabEvtsMajeurs[key].E.IL === keylieu ) 
		{
			var lieu =new DetailLieu();
			lieu.T=tabEvts[key].E.T;
			lieu.i1=tabEvts[key].E.i1;
			lieu.i2=tabEvts[key].E.i2;
			lieu.D=tabEvts[key].E.D;
			lieu.S=tabEvts[key].E.S;
			lieu.DT=tabEvts[key].E.DT;
			keyEvents.push(lieu);
        }
    }
    AfficheDetailLieu(keyEvents, keylieu);
}


function goEvtsMajeurs() 
{
    if (markers !== undefined) 
	{
        removeAllMarkers();
    }

       // afficheAllMarkersEvtMAJ(tabLieuxEvtsMajeur);
	
			if ($('#parperiode').is(':checked'))
            {		
				//var val=awesome.slider("values", 1) + awesome.slider("option", "step");
		     filtre= new TFiltreInterval(awesome.slider("values", 0),awesome.slider("values", 1));   
              //RepartionParPeriode(ui.values[0] , ui.values[1],Evenements);       		   
             //markerClick(tabEvts, a,filtre);
			 afficheAllMarkersEvtMAJ(tabEvtsMajeurs,filtre);
		    }
			if ($('#pargeneration').is(':checked'))
            {		
				filtre= new TFiltreInterval(awesome2.slider("values", 0),awesome2.slider("values", 1));  
				// markerClick(tabEvts, a,filtre);
				afficheAllMarkersEvtMAJ(tabEvtsMajeurs,filtre);
		    }
			if ($('#densite').is(':checked'))
			{
			     //markerClick(tabEvts, a,new TFiltreInterval(0,0));
				 afficheAllMarkersEvtMAJ(tabEvtsMajeurs,new TFiltreInterval(0,0));
			}
        var texte = $('#valeurcombo option:selected').val();
	    if (texte === "A") // Tous les lieux
		{
			goLieuxTousClick() ;
			//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flTous');
		}
		// ***********B= lieux plus representés************
		else if (texte === "B") 
		{
			goLieuxPlusRepresenteClick() ;
			//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flPlusRepresente');
		}
		// *********** C =lieux non places************
		else if (texte === "C") 
		{
			goLieuxNonPlaceClick() ;
			//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flNonGeolocalise');
		}
		// *********** D = lieux visibles************
		else if (texte === "D") 
		{     
			goLieuxVisibleClick() ;
			//encodeURI(document.location.href='index.html?Hcommand_FiltreLieux=flVisible');
		}
		if(($('#nom').val()!=="")||($('#prenom').val()!==""))
		{ 
		   traitementListeIndividusAvecChampsRech();
		}
		else
		{
	
	 
		if(tabIndivEvtsMajeur.length===1)
		{
			 $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individu+")");
		}
		else
		{
		 $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individus+")");
		}
		var listeindiv = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
        $('#liste').html('');		
        $('#liste').html(listeindiv);		
		//document.getElementById("liste").innerHTML = listeindiv;
		}
}

// catch resize
/* je ne parviens pas à mettre à jour le slider
$( window ).resize(function() 
{
    if ($('#parperiode').is(':checked'))
	{
		var pas ;
		if ($('#tous').is(':checked')) 
		{
			pas = ComputeSteps(tabDate, Evenements);
		}
		if ($('#evenement_majeurs').is(':checked')) 
		{
			pas = ComputeSteps(tabDateMAJ, evenementsMajeur);
		}
		//awesome.slider("step", pas);
		//awesome.slider.step = pas ;
		awesome.slider("pips", { rest: "label", step : pas }).slider("float");	
	}
});
*/
var kSteps = [20,25,50,75,100,100] ;
var kEcartMin = 50 ;

function ComputeSteps(tab, tavEvt)
{
	var sizeFreese = $("#entete").css("width");
	sizeFreese = sizeFreese.split( "px" ) ;
	
	var ecart = Math.ceil( sizeFreese[0] / kEcartMin) ;
	
	tab.sort(function(a, b){return a-b} );
	var premiere=tab[0];
	var deuxieme=tab[tab.length-1];
	
	var nbPas = ecart ;
	var pasc = (deuxieme-premiere)/nbPas ;
	var i = 0 ;
	for( i = 0 ; i < kSteps.length-1 ; i++ )
	{
		if( kSteps[i] > pasc )
			break ;
	}
	return kSteps[i] ;
}

function periode(tab, tavEvt) 
{
	var pas=0;
	tab.sort(function(a, b){return a-b} );   
	$('#entete2').hide();
	$('#entete').css({
		 height:"6%"
		});
	$('#entete').show();
	$('#map').css({height:"90%"});	
	var premiere=tab[0];
	var deuxieme=tab[tab.length-1];

	var pas = ComputeSteps( tab, tabEvts) ;
	var mini = Math.floor(premiere/pas) * pas ;
	var maxi = Math.ceil(deuxieme/pas) * pas ;

	var valeur = mini;

	RepartionParPeriode(mini , maxi,tavEvt);
	if($( "#awesome2" ).slider( "instance" )!==undefined)
	{
		awesome.slider("refresh");
       
		awesome.slider("values", $( "#awesome2" ).slider("values"));
    }
    awesome = new $("#awesome2").slider(
	{
        min: mini,
        max: maxi,
        range: true,
        values: [mini, maxi],
        step: pas,
	    slide: function(event, ui) 
		{
		$('#awesome2 span#milieu').css({opacity: 0});
		   if ($('#tous').is(':checked')) 
			{
			   RepartionParPeriode(ui.values[0] , ui.values[1],Evenements);
		   }
		   if ($('#evenement_majeurs').is(':checked')) 
		   {
				RepartionParPeriode(ui.values[0] ,ui.values[1],evenementsMajeur);
		   }
                       
	    }
   
    });
    awesome.slider("pips", { rest: "label" }).slider("float");	
	$('.ui-slider').each(function() 
	{
	$('.ui-slider-handle:first', this).addClass('my-slider-handle-left');

	
	$('.ui-slider-handle:last', this).addClass('my-slider-handle-right');    

	});

    if(tab.length <=1)
    {    
    awesome.slider( "destroy" ); 
    $("#awesome2").css(
	{
		'display': 'none'
	});
    $('#start').hide();
    $('#stop').hide();
    $('#messagealertdonnee').html($messagealertdonnee).show();
    }
    else
    {
    $('#messagealertdonnee').hide();   
	$("#awesome2").css(
	{
		'display': 'block'
	});
    }
    $('#start').on("click", function() 
	{
        if (($("#start > .mesimages").attr('title') === $lecture) && ($('#parperiode').attr('checked', true))) 
		{
          if(pausePlay===false)
           {	
			$(".my-slider-handle-right").css({opacity:0}) ;
			$(".my-slider-handle-left").css({opacity:0}) ;

			b_debut=awesome.slider("values", 0);
            b_fin=awesome.slider("values", 1);		   
			awesome.slider("values", 0,mini);
			awesome.slider("values", 1,pas+mini);
            RepartionParPeriode(mini, pas+mini, tavEvt);
			$("#start > .mesimages").attr('src', 'images/pause.png');
            $("#start > .mesimages").attr('title', $pause);
            }
            $("#start > .mesimages").attr('title', $pause);			
            function maboucle() 
			{ // fonction qui permet de deplacer le diaporama

                timer = setTimeout(function() 
				{
				    var progress=awesome.slider("values", 1);
                    if(progress < maxi) 
					{
						$(".my-slider-handle-right").css({opacity:0}) ;
						$(".my-slider-handle-left").css({opacity:0}) ;

                        $("#start > .mesimages").attr('src', 'images/pause.png');
						if ($('#tous').is(':checked')) 
						{
							RepartionParPeriode(awesome.slider("values", 1), awesome.slider("values", 1) + pas,Evenements);
						}
						if ($('#evenement_majeurs').is(':checked')) 
						{
							RepartionParPeriode(awesome.slider("values", 1), awesome.slider("values", 1) + pas,evenementsMajeur);
						}
                       // RepartionParPeriode(awesome.slider("values", 1), awesome.slider("values", 1) + pas, tavEvt);
						var val1=awesome.slider("values", 0);
						var val2=awesome.slider("values", 1);
						awesome.slider("values", 0, val1 + pas);
					    awesome.slider("values", 1, val2 + pas);
                        maboucle();
						pausePlay=false;
                    }
					else
					{
						$(".my-slider-handle-right").css({opacity:1}) ;
						$(".my-slider-handle-left").css({opacity:1}) ;
                        $("#start > .mesimages").attr('src', 'images/play.png');
                        $("#start > .mesimages").addClass('boutonplay');
                        $("#start > .mesimages").attr('title', $lecture);
						$('#awesome2 span#milieu').css({opacity: 0});
						awesome.slider("values", 0, b_debut);
					    awesome.slider("values", 1, b_fin);
						if ($('#tous').is(':checked')) 
						{
							RepartionParPeriode(b_debut, b_fin,Evenements);
						}
					   if ($('#evenement_majeurs').is(':checked')) 
					   {
							RepartionParPeriode(b_debut, b_fin,evenementsMajeur);
					   }
						//RepartionParPeriode(b_debut, b_fin, tavEvt);
                        clearTimeout(timer);
						pausePlay=false;
                    }
                }, 2000);
            }    
        maboucle();
        }
		else 
		{
            if ($("#start > .mesimages").attr('title') === $pause) 
			{
			    pausePlay=true;
                clearTimeout(timer);
               
                $("#start > .mesimages").attr('title', $lecture);
                $("#start > .mesimages").attr('src', 'images/play.png');
            }
        }
    });
    $('#stop').on("click", function() 
	{
		$(".my-slider-handle-right").css({opacity:1}) ;
		$(".my-slider-handle-left").css({opacity:1}) ;
	 	pausePlay=false;
        clearTimeout(timer);
		awesome.slider("values", 0, b_debut);
		awesome.slider("values", 1, b_fin);
	    if ($('#tous').is(':checked')) 
		{
			RepartionParPeriode(b_debut, b_fin,Evenements);
		}
	   if ($('#evenement_majeurs').is(':checked')) 
	   {
			RepartionParPeriode(b_debut, b_fin,evenementsMajeur);
	   }
        $("#start > .mesimages").attr('src', 'images/play.png');
		$("#start > .mesimages").attr('title', $lecture);	
    });
}


function generation(tabGeneration, tab) 
{
	tabGeneration = supprimeLesDoublons(tabGeneration);
	tabGeneration.sort(compare);
	//clearTimeout(timer);
	var mini = tabGeneration[0];
	var maxi = tabGeneration[tabGeneration.length - 1];
	$('#entete').hide();
	$('#entete2').css({height:"6%" });
	$('#entete2').show();
	//$('#map').css({height:"87%"});
	$('#map').css({height:"90%"});
	$(".ui-slider-pips").css({
	'dysplay': 'none'
	});
	if($( "#awesome22" ).slider( "instance" )!==undefined)
	{
	awesome2.slider("refresh");
	 awesome2.slider("values", $( "#awesome22" ).slider("values"));
	}   
     awesome2 = new $("#awesome22").slider(
    {
        min: mini,
        max: maxi,
		range:true,
        values: [mini, maxi],
        step: 1,
	    slide: function(event, ui) 
			{	
			  if ($('#tous').is(':checked')) 
				{
				   RepartionParGeneration(ui.values[ 0 ] , ui.values[ 1 ],Evenements);		   
			   }
		
		   if ($('#evenement_majeurs').is(':checked')) 
		   {
				  RepartionParGeneration(ui.values[ 0 ] , ui.values[ 1 ],evenementsMajeur);
		   }
	        }	
		
    });
    
    if(tabGeneration.length <=1)
    {    
		awesome2.slider( "destroy" ); 
		$("#awesome22").css(
		{
			'display': 'none'
		});
		$('#start2').hide();
		$('#stop2').hide();
		$('#messagealertdonneegene').html($messagealertdonnee).show();
    }
    else
    {
		$('#messagealertdonnee').hide();   
	    $("#awesome22").css(
		{
			'display': 'block'
		});
    } 
    awesome2.slider("pips", {rest: "label"}).slider("float");
    RepartionParGeneration(mini, maxi, tab);
	$('#awesome22 .ui-slider-handle:eq(1)').attr('id', 'milieu2');
    $('#start2').on("click", function() 
	{
        if (($("#start2 > .mesimages").attr('title') === $lecture) && ($('#pargeneration').attr('checked', true))) 
		{
		    if(pausePlay2===false)
            {	
			   b_debutgeneration=awesome2.slider("values", 0);
			   b_fingeneration=awesome2.slider("values", 1);		   
			   $("#awesome22").slider("values", 0,mini);
			   $("#awesome22").slider("values", 1,mini);
			   RepartionParGeneration(mini,mini, tab);
			   $("#start2 > .mesimages").attr('src', 'images/pause.png');
		       $("#start2 > .mesimages").attr('title', $pause);
            }		 
			 $("#start2 > .mesimages").attr('title', $pause);
				function maboucle2() 
				{ // fonction qui permet de deplacer le diaporama
					timer = setTimeout(function() 
					{				
                    if (awesome2.slider("values", 0) < maxi) 
					{
                        $("#start2 > .mesimages").attr('src', 'images/pause.png');
						awesome2.slider("values", 0,awesome2.slider("values", 0)+1 );
						awesome2.slider("values", 1, awesome2.slider("values", 1)+1);
						if ($('#tous').is(':checked')) 
						{
							RepartionParGeneration(awesome2.slider("values", 0), awesome2.slider("values", 0),Evenements);
						}
					    if ($('#evenement_majeurs').is(':checked')) 
					    {
						   RepartionParGeneration(awesome2.slider("values", 0), awesome2.slider("values", 0),evenementsMajeur);
					    }
                        maboucle2();
						pausePlay2=false;
                    } 
					else 
					{
                       //  $('.ui-slider-handle:eq(1)', '.ui-slider').hide();
                        $("#start2 > .mesimages").attr('src', 'images/play.png');
                        $("#start2 > .mesimages").addClass('boutonplay');
                        $("#start2 > .mesimages").attr('title', $lecture);
                        awesome2.slider("values", 0, b_debutgeneration);
						awesome2.slider("values", 1, b_fingeneration);
						//RepartionParGeneration(b_debutgeneration, b_fingeneration, tab);
						if ($('#tous').is(':checked')) 
						{
			            RepartionParGeneration(b_debutgeneration, b_fingeneration,Evenements);
						}
					   if ($('#evenement_majeurs').is(':checked')) 
					   {
						   RepartionParGeneration(b_debutgeneration, b_fingeneration,evenementsMajeur);
					   }
							pausePlay2=false;
							clearTimeout(timer);
                    }
                }, 2000);

            }
            maboucle2();
        } 
		else 
		{
             pausePlay2=true;
            if ($("#start2 > .mesimages").attr('title') === $pause) 
			{
                clearTimeout(timer);
                $("#start2 > .mesimages").attr('src', 'images/play.png');
            
                $("#start2 > .mesimages").attr('title', $lecture);				
            }
        }
    });

    $('#stop2').on("click", function() 
	{
	    pausePlay2=false;
        clearTimeout(timer);
 	    awesome2.slider("values", 0, b_debutgeneration);
		awesome2.slider("values", 1, b_fingeneration);
		//RepartionParGeneration(b_debutgeneration, b_fingeneration, tab);
		if ($('#tous').is(':checked')) 
		{
			RepartionParGeneration(b_debutgeneration, b_fingeneration,Evenements);
		}
	   if ($('#evenement_majeurs').is(':checked')) 
	   {
		   RepartionParGeneration(b_debutgeneration, b_fingeneration,evenementsMajeur);
	   }
        $("#start2 > .mesimages").attr('src', 'images/play.png');
		$("#start2 > .mesimages").attr('title', $lecture);	
    });

}

function markerClick(tab, a, filtre) 
{
    var text = "";
    var v = a.layer;
    var key;
    v.closePopup();
    var titre = v.getPopup().getContent();
    titre = parseInt(titre);
    for (key in tab) 
	{
	   if( filtre.Filtre( tab[key].E ) )
	   {
        if (tab[key].E.IL === titre) 
		{
            var evenement = tab[key].E;

            var codelieu = tablieux[evenement.IL].L.c;

            if (codelieu !== "") 
			{
                text = "<div class=\'bulles\'><h1>" + tablieux[evenement.IL].L.V + " (" + codelieu + ")</h1></div>";
            } 
			else 
			{
                text = "<div class=\"bulles\"><h1>" + tablieux[evenement.IL].L.V + "</h1></div>";

            }    
            var entete=evenement.i2;
			for(var i = 0 ; i < evenement.i1.length ; i++)
			{
				if(entete !== undefined) 
				{
  
				  if((tabIndividus[evenement.i1[i]].I.N !==undefined)&&(tabIndividus[evenement.i1[i]].I.P!==undefined))
				   {
					 text += "<h3>" + tabIndividus[evenement.i1[i]].I.N + " " + tabIndividus[evenement.i1[i]].I.P;
				   }  
				   if((tabIndividus[evenement.i1[i]].I.N !==undefined)&&(tabIndividus[evenement.i1[i]].I.P===undefined))
				   {
					 text += "<h3>" + tabIndividus[evenement.i1[i]].I.N ;
				   }   
				   if((tabIndividus[evenement.i1[i]].I.N ===undefined)&&(tabIndividus[evenement.i1[i]].I.P!==undefined))
				   {
					 text += "<h3>" + tabIndividus[evenement.i1[i]].I.P ;
				   }
					  
					  text += " & ";  
				   if((tabIndividus[ evenement.i2].I.N !==undefined)&&(tabIndividus[evenement.i2].I.P!==undefined))
				   {
					text += tabIndividus[evenement.i2].I.N + " " + tabIndividus[evenement.i2].I.P;
				   } 
				   if((tabIndividus[ evenement.i2].I.N !==undefined)&&(tabIndividus[evenement.i2].I.P===undefined))
				   {
					text += tabIndividus[evenement.i2].I.N ;
				   }   
				   if((tabIndividus[ evenement.i2].I.N ===undefined)&&(tabIndividus[evenement.i2].I.P!==undefined))
				   {
					text += tabIndividus[evenement.i2].I.P ;
				   }
				   text += "</h3>";	
				}
				else
				{
					if(( tabIndividus[evenement.i1[i]].I.N !==undefined)&&( tabIndividus[evenement.i1[i]].I.P !==undefined))
					{
					 text += "<h3>" + tabIndividus[evenement.i1[i]].I.N + " " + tabIndividus[evenement.i1[i]].I.P + "</h3>";
					}	
					if(( tabIndividus[evenement.i1[i]].I.N !==undefined)&&( tabIndividus[evenement.i1[i]].I.P ===undefined))
					{
					 text += "<h3>" + tabIndividus[evenement.i1[i]].I.N + "</h3>";
					}
					if(( tabIndividus[evenement.i1[i]].I.N ===undefined)&&( tabIndividus[evenement.i1[i]].I.P !==undefined))
					{
					 text += "<h3>"+ tabIndividus[evenement.i1[i]].I.P + "</h3>";
					}
				
					  
				}
							
			}
        if((evenement.D===undefined)&&(evenement.S===undefined))
        {
          text += "<h5><span>"+ evenement.T + "</span></h5>";
        }
   
        if((evenement.D===undefined)&&(evenement.S !==undefined))
        {
            text += "<h5><span>"+ evenement.T +" : "+evenement.S    + "</span></h5>";
        }
         
        if((evenement.D!==undefined)&&(evenement.S===undefined))
        {
          text += "<h5><span>" + evenement.T +" : " + evenement.D +      "</span></h5>";
        }
        if((evenement.D!==undefined)&&(evenement.S!==undefined))
        {
          text += "<h5><span>" + evenement.T+ " : " + evenement.D +" "+evenement.S+ "</span></h5>";
        }    
        }
    }
    }

    $('.leaflet-sidebar').css(
	{
        opacity: 1
    });
    sidebar.show();
    $('#side').html("");
    $('#side').html(text);
    map.panTo(v.getLatLng(), 14, 
	{
        animate: true,
        duration: 2.0,
       easeLinearity: 5.0,
	    //maxZoom: 14
  });
}


function markerClusterClick(a, t,filtre ) 
{
    var tab2 = [];
     var keylieu;
    var keyEvents=[];
    var v = a.layer.getAllChildMarkers();
    tab2 = tabLatitudedLongitude(v);
    if (tab2.length === 1)
	{
        markers.options.spiderfyOnMaxZoom = false;
		  markers.options.zoomToBoundsOnClick = false;
		//var z=map.getZoom();
        //map.options.zoom = z;
        var tab = [];
        var k = 0;
        var key;
        for (var i = 0; i < tab2.length; i++) 
		{
            //$.each(tablieux, function(key, val) {
            Object.keys(t).forEach(function(key) 
			{
                // for ( key in  tablieux ) {
                if ((tablieux[t[key].E.IL].L.La === tab2[i].La) && (tablieux[t[key].E.IL].L.Lo === tab2[i].Lo)) 
				{
				     if( filtre.Filtre( t[key].E ) )
					 {
				    var lieu =new DetailLieu();
				    lieu.T=t[key].E.T;
				    lieu.i1=t[key].E.i1;
				    lieu.i2=t[key].E.i2;
				    lieu.D=t[key].E.D;
					lieu.S=t[key].E.S;
				    lieu.DT=t[key].E.DT;
				    keyEvents.push(lieu);
					keylieu=t[key].E.IL;
                }
                }
            });
        }
        // }
        $('.leaflet-sidebar').css(
		{
            opacity: 1
        });
        AfficheDetailLieu(keyEvents,keylieu);
    } 
	else 
	{
        map.options.maxZoom = 18;
		  markers.options.zoomToBoundsOnClick = true;
    }

}


function openLoader()
{
    $('#popup_name').fadeIn().css({'width': Number(200)}).html('<img src="images/spinner-gif-red.GIF"><div>'+$chargementdonnees+'</div>'); 
    var winH = $(document).height();
    var winW = $(window).width();
    $('#popup_name').css('top', winH/2 -  $('#popup_name').height()/2);
    $('#popup_name').css('left', winW/2 -  $('#popup_name').width()/2);
    $('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
	//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
	$('#fade').css({'filter' : 'alpha(opacity=10)'}).fadeIn();
}
function closeLoader()
{
     //e.preventDefault();
    $('#fade , .popup_block').fadeOut(function() 
	{       
	//	$('#fade, a.close').remove();  //...ils disparaissent ensemble
	});
}


function setCookiesLieu()
{
    document.cookie="lieu="+cookibtneLieu;
    
}
function setCookiesEvts()
{
    document.cookie="evtMaj="+cookibtnEvtMj;
}

function getCookie() 
{
if (navigator.cookieEnabled) 
{
        // Cookies acceptés
} 
else 
{

  alert("Activez vos cookies !");
}
}
$('#cookie').click(function() 
{
    var cookContent = document.cookie.split(';');
    var li=  cookContent[0].split('=')[1];
    alert(li);
});

$('#touslesindividus').click(function() 
{
	FiltreZoom=map.getZoom();
    encodeURI(document.location.href='index.html?Hcommand_FiltreIndividu=tous');
	$('#touslesindividus').attr('checked', true);
    return false;
});
$('#Legende').on("click",function() 
{
if($('#Legende').is(':checked'))
 $('div.info.legend.leaflet-control').show();
 else
  $('div.info.legend.leaflet-control').hide();
});
$('#POI').on("click",function() 
{ 

if($('#POI').is(':checked'))
{
		encodeURI(document.location.href='index.html?Hcommand_ShowPOI=true');
    if (map.getZoom() >= MaxZoomPOI) 
		{
	         $('#POI').attr('checked', true);
            var bounds=map.getBounds();
            poishow.eachLayer(function(marker) 
			{
			if (bounds.contains(marker.getLatLng())) 
			{
			 marker.addTo(map);
			}
			else
			{
			map.removeLayer(marker)
			}
			});
		}
}
else
{
		encodeURI(document.location.href='index.html?Hcommand_ShowPOI=false');
 $('#POI').attr('checked', false);
	clearLayer(mespoi)
	}
});
//
$('#ascendant').click(function() 
{
    FiltreZoom=map.getZoom();
    encodeURI(document.location='index.html?Hcommand_FiltreIndividu=ascendants');
    $('#ascendant').attr('checked', true);
    $('.repartion:eq(8)').show();
    return false;
});
//
$('#descendant').click(function() 
{
    FiltreZoom=map.getZoom();
    encodeURI(document.location='index.html?Hcommand_FiltreIndividu=descendants'); 
  
	$('#descendant').attr('checked', true);
    $('.repartion:eq(8)').show();
	return false;
});
//
$('#individusmarque').click(function() 
{
    FiltreZoom=map.getZoom();
    encodeURI(document.location='index.html?Hcommand_FiltreIndividu=marques');  
    $('#individusmarque').attr('checked', true);
    return false;
});

function compare(x, y) 
{
    return x - y;
}


/**
* openPopupPourImpression(): fonction qui ouvre une fenetre modeale avec le contenu de la div
* my_window : fenetre window
* zone : contenu de la zone à imprimer
*  my_window.innerWidth : longueur de la fenetre
*   my_window.innerHeight:  largeur de la fenetre
* 
* 
 * @returns {undefined} */
 function openPopupPourImpression() 
 {
    var zone =$('#contenuMap').html();   
    //alert(window.innerWidth);
    
   var   my_window = window.open("", "mywindow","height="+$(window).innerHeight,"width="+$(window).height()+",status=1,resizable=yes,toolbar=0, menubar=0, scrollbars=1,resizable=1, location=0, left=10, top=10");
      my_window.document.write('<html><head><title>impression carte</title> <link href="css/leaflet.css" rel="stylesheet" type="text/css" media="screen" /><link href="css/MarkerCluster.Default.css" rel="stylesheet" type="text/css" media="screen,print"  />   <script src="js/leaflet.js" type="text/javascript" ></script><script src="js/leaflet-src.js" type="text/javascript"></script><script src="js/leaflet.markercluster.js" type="text/javascript"></script><script src="js/leaflet.markercluster-src.js" type="text/javascript"></script><script src="js/print.js" type="text/javascript"></script></head>');
      my_window.document.write(zone);
      my_window.document.write('</body></html>');  
      $(my_window).load(encodeURI(document.location.href='index.html?Hcommand=printCarte')); 
        $(my_window).focus();

  }
  
  
  function tabLieuxNonPlacesMAJ(tab)
  {
    var nbre=[];
  for(var i=0;i<tab.length;i++)
  {
  if((tab[i].L.La === 0.0)&&(tab[i].L.Lo === 0.0))
  {
  nbre.push(tab[i]);
  }
  }
  return nbre;
  }
  
  
  
  
  function nombrEvenementParLieu(lieu)
  {
  var nbre=0;
  for(var i=0;i<Lieux.length;i++)
  {
  if(Lieux[i].L.V===lieux)
  {
  nbre += Lieux[i].L.n;
  }
  }
  return nbre;
  }
  
//	check à l'ouverture des filtres  
    var currentLocation = document.location.href;
	
    var url = currentLocation.split('=');
	
	//console.log( QueryString ) ;
	
// mode d'ouverture par défaut
    if( QueryString["Hcommand_PremiereOuverture"] != '' ) 
	{	
		defautOpenMode = QueryString["Hcommand_PremiereOuverture"];
    }
    $('.repartion:eq(8)').hide(); // cacher repartition par generation (afficher seulement lorsqu'on cocher descendant )
    if( QueryString["Hcommand_FiltreIndividu"] === mliTouslesIndis ) 
	{
        $('#touslesindividus').attr('checked', true);
    }
    else if( QueryString["Hcommand_FiltreIndividu"] === mliAscendance ) 
	{
        $('#ascendant').attr('checked', true);
        $('.repartion:eq(8)').show();  // montrer repartition par generation (afficher seulement lorsqu'on cocher descendant )
    }
    else if( QueryString["Hcommand_FiltreIndividu"] === mliDescendance ) 
	{
        $('#descendant').attr('checked', true);
        $('.repartion:eq(8)').show();
    }
    else if( QueryString["Hcommand_FiltreIndividu"] === mliIndisMarques ) 
	{
        $('#individusmarque').attr('checked', true);
    }

    if( QueryString["Hcommand_FiltreEvts"] === feTousEvts ) 
	{
        $('#tous').attr('checked', true);
		goTousEvenementClick() ;
		
    }
    else if( QueryString["Hcommand_FiltreEvts"] === feMajeur ) 
	{
        $('#evenement_majeurs').attr('checked', true);
		goEvenementMajeurClick() ;
    }

    if( QueryString["Hcommand_FitreModeRep"] === mrDensite ) 
	{
        $('#densite').attr('checked', true);
		goDensiteClick() ;
    }
    else if( QueryString["Hcommand_FitreModeRep"] === mrPeriode ) 
	{
        $('#parperiode').attr('checked', true);
		goPerdiodeClick() ;
    }
    else if( QueryString["Hcommand_FitreModeRep"] === mrGeneration ) 
	{
	  if( (QueryString["Hcommand_FiltreIndividu"] === mliTouslesIndis ) || ( QueryString["Hcommand_FiltreIndividu"] === mliIndisMarques ) )
	   {
	     $('#densite').attr('checked', true);
		 goDensiteClick();
	   }
	    else
		{
        $('#pargeneration').attr('checked', true);
		 goGenerationClick() ;
		}
    }

    if( QueryString["Hcommand_Onglet"] === ocIndividu ) 
	{
		goIndividuClick() ;
    }
    else if( QueryString["Hcommand_Onglet"] === ocLieux ) 
	{
		goLieuxClick() ;
    }
    if( QueryString["Hcommand_ShowPOI"] === "false" ) 
	{
		$('#POI').attr('checked', false);
		clearLayer(mespoi);
    }
	
// filtre sur les lieux

//console.log(QueryString["Hcommand_FiltreLieux"]);
    if( QueryString["Hcommand_FiltreLieux"] === flTous ) 
	{
		$("#valeurcombo")[0].selectedIndex = 0;
		goLieuxTousClick() ;
    }
    else if( QueryString["Hcommand_FiltreLieux"] === flPlusRepresente ) 
	{
		$("#valeurcombo")[0].selectedIndex = 1;
		goLieuxPlusRepresenteClick() ;
    }
    else if( QueryString["Hcommand_FiltreLieux"] === flNonGeolocalise ) 
	{
		$("#valeurcombo")[0].selectedIndex = 2;
		goLieuxNonPlaceClick() ;
    }
    else if( QueryString["Hcommand_FiltreLieux"] === flVisible ) 
	{
		$("#valeurcombo")[0].selectedIndex = 3;
		goLieuxVisibleClick() ;
    }
// Zoom
/*    if( QueryString["Hcommand_Zoom"] != '' ) 
	{	
		map.fitBounds(QueryString["Hcommand_Zoom"]);
    }*/

	
function rechercheSurPrenom()
{
	
	$('#prenom').keyup(function()
 	{
        var liste = "";
        var $field = $(this);
        var tab = [];
        $('#liste').html(''); // on vide les resultats
        if ($('#nom').val() !== "") 
		{
		  if ($('#tous').is(':checked')) 
		  {
            // alert(resultatFiltreNom.length);
            var tab2 = [];
            for (var i = 0; i < resultatFiltreNom.length; i++)
			    {
					//alert(resultatFiltreNom.length);
					//alert(resultatFiltreNom[i].I.P);
					if(resultatFiltreNom[i].I.P!==undefined)
					{
					if (CaracteresAccentues(resultatFiltreNom[i].I.P).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1)
					{
						tab2.push(resultatFiltreNom[i]);
						//alert(tab2);
						}
					}
                }
			
                if (tab2.length > 1) 
			    {
					liste = affichagelisteIndividus(tab2);
					//alert(liste);
					$('#liste').html("");
					$('#liste').html(liste);
					$('#nombrerecherche2').val("(" + tab2.length +"/"+Individus.length+ " "+$individus+")");
                }
			     else
                 if (tab2.length === 1) 
			    {
					liste = affichagelisteIndividus(tab2);
					$('#liste').html("");
					$('#liste').html(liste);
					if(Individus.length===1)
					{
					$('#nombrerecherche2').val("(" + tab2.length +"/"+Individus.length+ " "+$individu+")");
					}
					else
					{
					$('#nombrerecherche2').val("(" + tab2.length +"/"+Individus.length+ " "+$individus+")");
					}
                } 
			     else 
			    {
					liste = affichagelisteIndividus(tab2);
					$('#liste').html("");
					$('#liste').html(liste);
					$('#nombrerecherche2').val($aucunIndividu);
                }
		   }
		   else
		   {
		           var tab2 = [];
            for (var i = 0; i < resultatFiltreNom.length; i++)
			{
                if (CaracteresAccentues(resultatFiltreNom[i].I.P).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
				{
                    tab2.push(resultatFiltreNom[i]);
                }
            }
            if (tab2.length > 1) 
			    {
					liste = affichagelisteIndividus(tab2);
					$('#liste').html("");
					$('#liste').html(liste);
					$('#nombrerecherche2').val("(" + tab2.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
                }
			   else
                 if (tab2.length === 1) 
			    {
					liste = affichagelisteIndividus(tab2);
					$('#liste').html("");
					$('#liste').html(liste);
					if(tabIndivEvtsMajeur.length===1)
					{
					$('#nombrerecherche2').val("(" + tab2.length +"/"+tabIndivEvtsMajeur.length+ " "+$individu+")");
					}
					else
					{
					$('#nombrerecherche2').val("(" + tab2.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
					}
                } 
			     else 
			    {
					liste = affichagelisteIndividus(tab2);
					$('#liste').html("");
					$('#liste').html(liste);
					$('#nombrerecherche2').val($aucunIndividu);
                }
		    }
        } 
		else 
		{
            if ($('#tous').is(':checked')) 
			{
                tab = [];
                if ($field.val().length > 0) 
				{
                    for (var i = 0; i < Individus.length; i++)
					{
					   if(Individus[i].I.P!==undefined)
					  {
                        if (CaracteresAccentues(Individus[i].I.P).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
						{
                            tab.push(Individus[i]);
                        }
                        }
                    }
                    if (tab.length > 1)
					{
                        liste = affichagelisteIndividus(tab);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individus+")");
                    } 
					else
                    if (tab.length === 1) 
					{
                        liste = affichagelisteIndividus(tab);
                        $('#liste').html("");
                        $('#liste').html(liste);
			if(Individus.length===1)
			{
			  $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individu+")");
			}
			else
			{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individus+")");
			}
                    } else 
					{
                        liste = affichagelisteIndividus(tab);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val($aucunIndividu);
                    }

                } else 
				{
                    //                 affichageliste(AllIndividus, '#liste', "filtreByName");

                    if (Individus.length > 1) 
					{
                        liste = affichagelisteIndividus(Individus);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val("(" + Individus.length + " "+$individus+")");
                    } else
                    if (Individus.length === 1) 
					{
                        liste = affichagelisteIndividus(Individus);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val("(" + Individus.length + " "+$individu+")");
                    } else
					{
                        liste = affichagelisteIndividus(Individus);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val($aucunIndividu);
                    }


                }
            }

            if ($('#evenement_majeurs').is(':checked')) 
			{

                tab = [];
                // on commence à  traiter a  partir du 1er caractere saisie
                if ($field.val().length > 0)
				{

                    for (var i = 0; i < tabIndivEvtsMajeur.length; i++)
					{
					  if(tabIndivEvtsMajeur[i].I.P!==undefined)
					  {
                        if (CaracteresAccentues(tabIndivEvtsMajeur[i].I.P).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
						{
                            tab.push(tabIndivEvtsMajeur[i]);
                        }
                        }
                    }
                    //                 affichageliste(tab, '#liste', "filtreByNameEvenMajeur");

                    if (tab.length > 1) 
					{
                        liste = affichagelisteIndividusEvtMAJ(tab);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
                    } else
                    if (tab.length === 1) 
					{
                        liste = affichagelisteIndividusEvtMAJ(tab);
                        $('#liste').html("");
                        $('#liste').html(liste);
						if(tabIndivEvtsMajeur.length===1)
						{
						$('#nombrerecherche2').val("(" + tab.length + "/"+tabIndivEvtsMajeur.length+" "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length + "/"+tabIndivEvtsMajeur.length+" "+$individus+")");
						}
                    } 
					else 
					{
                        liste = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                    }

                } 
				else 
				{
                    //                 affichageliste(tableauIndvAvecEvenMajeur, '#liste', "filtreByNameEvenMajeur");
                    if (tabIndivEvtsMajeur.length > 1) 
					{
                        liste = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individus+")");
                    } 
					else
                    if (tabIndivEvtsMajeur.length === 1) 
					{
                        liste = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individu+")");
                    } 
					else
					{
                        liste = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
                        $('#liste').html("");
                        $('#liste').html(liste);
                        $('#nombrerecherche2').val($aucunIndividu);
                    }
                }

            }
            resultatFiltrePrenom = tab;
            //alert(resultatFiltrePrenom.length);
        }
        //resulta.length=0;
    });
}



function rechercheSurNom()
{   
   $('#nom').keyup(function() 
	{
        var tab = [];
        var listeIndiv = "";
        var $field = $(this);
        $('#liste').html(''); // on vide les resultats
        if ($('#prenom').val() !== "") 
		{
            var tab2 = [];
            for (var i = 0; i < resultatFiltrePrenom.length; i++)
			{
			  if(resultatFiltrePrenom[i].I.N!==undefined)
			  {
                if (CaracteresAccentues(resultatFiltrePrenom[i].I.N).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
				{
                    tab2.push(resultatFiltrePrenom[i]);
                }
                }
            }
            if (tab2.length > 1) 
			{
                listeIndiv = affichagelisteIndividus(tab2);
                $('#nombrerecherche2').val("(" + tab2.length +"/"+resultatFiltrePrenom.length+ " "+$individus+")");
                $('#liste').html("");
                $('#liste').html(listeIndiv);

            } else
            if (tab2.length === 1) 
			{
                listeIndiv = affichagelisteIndividus(tab2);
		         if(resultatFiltrePrenom.length===1)
				 {
				  $('#nombrerecherche2').val("(" + tab2.length +"/"+resultatFiltrePrenom.length+ " "+$individu+")");
				 }
				 else
				 {
                $('#nombrerecherche2').val("(" + tab2.length +"/"+resultatFiltrePrenom.length+ " "+$individus+")");
				 }
                $('#liste').html("");
                $('#liste').html(listeIndiv);
            } else 
			{
                listeIndiv = affichagelisteIndividus(tab2);
                $('#nombrerecherche2').val($aucunIndividu);
                $('#liste').html("");
                $('#liste').html(listeIndiv);
            }
        } else 
		{

            if ($('#tous').is(':checked'))
			{
                tab = [];
                if ($field.val().length > 0) 
				{

                    for (var i = 0; i < Individus.length; i++) 
					{    if(Individus[i].I.N!==undefined)
					{
                        if (CaracteresAccentues(Individus[i].I.N).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
						{
                            tab.push(Individus[i]);
							}
                        }
                    }
                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
						if(Individus.length===1)
						{
						 $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+  " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }

                } else 
				{
                    if (Individus.length > 1) 
					{
                        listeIndiv = affichagelisteIndividus(Individus);
                        $('#nombrerecherche2').val("(" + Individus.length + " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (Individus.length === 1) 
					{
                        listeIndiv = affichagelisteIndividus(Individus);
                        $('#nombrerecherche2').val("(" + Individus.length + " "+$individu+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else {
                        listeIndiv = affichagelisteIndividus(Individus, '#liste', "afficheIndiv");
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }
                }
            }

            if ($('#evenement_majeurs').is(':checked')) 
			{
                tab = [];
                if ($field.val().length > 0) 
				{

                    for (var i = 0; i < tabIndivEvtsMajeur.length; i++) 
					{
					      if(tabIndivEvtsMajeur[i].I.N!==undefined)
					      {
                        if (CaracteresAccentues(tabIndivEvtsMajeur[i].I.N).toUpperCase().indexOf(CaracteresAccentues($field.val()).toUpperCase()) !== -1) 
						{
                            tab.push(tabIndivEvtsMajeur[i]);
							}
                        }
                    }

                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
						if(tabIndivEvtsMajeur.length===1)
						{
						 $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+  " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }

                } else 
				{
                    if (tabIndivEvtsMajeur.length > 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                        $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individus+")");
                    } else
                    if (tabIndivEvtsMajeur.length === 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                        $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individu+")");
                    } else 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                        $('#nombrerecherche2').val($aucunIndividu);
                    }

                }

            }
            resultatFiltreNom = tab;
        }
    });
}


function traitementListeTousLesIndividus()
{
var listeindiv;
	   if ($('#tous').is(':checked')) 
		{
		
		 if(Individus.length===1)
		   {
		   $('#nombrerecherche2').val("(" + Individus.length + " "+$individu+")");
		   }
		   else
		   {
		   $('#nombrerecherche2').val("(" + Individus.length +" "+$individus+")");
		   }
		     listeindiv = affichagelisteIndividus(Individus);
		}
		if ($('#evenement_majeurs').is(':checked')) 
		{
		
		  if(tabIndivEvtsMajeur.length===1)
		   {
		   $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individu+")");
		   }
		   else
		   {
		   $('#nombrerecherche2').val("(" + tabIndivEvtsMajeur.length + " "+$individus+")");
		   }
		    listeindiv = affichagelisteIndividusEvtMAJ(tabIndivEvtsMajeur);
		}
		//document.getElementById("liste").innerHTML = listeindiv;
		$("#liste").html(listeindiv);
}




function traitementListeIndividusAvecChampsRech()
{
var listeIndiv="";
var tab=[];
  if (($('#nom').val() !== "") &&($('#prenom').val() !== ""))
		{  
			if ($('#tous').is(':checked')) 
			{
				  for (var i = 0; i < Individus.length; i++) 
					{
					 if((Individus[i].I.N!==undefined)&&(Individus[i].I.P!==undefined))
					 {
                        if ((CaracteresAccentues(Individus[i].I.N).toUpperCase().indexOf(CaracteresAccentues($('#nom').val()).toUpperCase()) !== -1) &&(CaracteresAccentues(Individus[i].I.P).toUpperCase().indexOf(CaracteresAccentues($('#prenom').val()).toUpperCase()) !== -1))
						{
                            tab.push(Individus[i]);
                        }
                        }
                    }
                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
						if(Individus.length===1)
						{
						  $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }
			 
			}
			if ($('#evenement_majeurs').is(':checked')) 
			{
				    for (var i = 0; i < tabIndivEvtsMajeur.length; i++) 
					{
					     if((tabIndivEvtsMajeur[i].I.N!==undefined)&&(tabIndivEvtsMajeur[i].I.P!==undefined))
                          {   
                             if ((CaracteresAccentues(tabIndivEvtsMajeur[i].I.N).toUpperCase().indexOf(CaracteresAccentues($('#nom').val()).toUpperCase()) !== -1) &&(CaracteresAccentues(tabIndivEvtsMajeur[i].I.P).toUpperCase().indexOf(CaracteresAccentues($('#prenom').val()).toUpperCase()) !== -1)) 
						{
                            tab.push(tabIndivEvtsMajeur[i]);
							}
                        }
                    }

                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
						if(tabIndivEvtsMajeur.length===1)
						{
						 $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+ " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }	
			}
		
		}  
	
		if (($('#nom').val() !== "") &&($('#prenom').val() === ""))
		{
			if ($('#tous').is(':checked')) 
			{ 
				  for (var i = 0; i < Individus.length; i++) 
					{
						if(Individus[i].I.N!==undefined)
						{
                        if (CaracteresAccentues(Individus[i].I.N).toUpperCase().indexOf(CaracteresAccentues($('#nom').val()).toUpperCase()) !== -1) 
						{
                            tab.push(Individus[i]);
							}
                        }
                    }
                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
							if(Individus.length===1)
						{
						 $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individu+")");
						}
						else
						{						
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }
			}
			if ($('#evenement_majeurs').is(':checked')) 
			{
				      for (var i = 0; i < tabIndivEvtsMajeur.length; i++) 
					{
                        if(tabIndivEvtsMajeur[i].I.N!==undefined)
						{
                        if (CaracteresAccentues(tabIndivEvtsMajeur[i].I.N).toUpperCase().indexOf(CaracteresAccentues($('#nom').val()).toUpperCase()) !== -1) 
						{
                            tab.push(tabIndivEvtsMajeur[i]);
							}
                        }
                    }

                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
						if(tabIndivEvtsMajeur.length===1)
						{
						 $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+  " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+ " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }
			}
		}
		
		if (($('#nom').val() == "") &&($('#prenom').val() !== ""))
		{
			if ($('#tous').is(':checked')) 
			{
			   for (var i = 0; i < Individus.length; i++) 
					{
					   if(Individus[i].I.P!==undefined)
					  {
                        if (CaracteresAccentues(Individus[i].I.P).toUpperCase().indexOf(CaracteresAccentues($('#prenom').val()).toUpperCase()) !== -1) 
						{
                            tab.push(Individus[i]);
							}
                        }
                    }
                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+ " "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividus(tab);
						if(Individus.length===1)
						{
						$('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+  " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+Individus.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividus(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }
			}
			if ($('#evenement_majeurs').is(':checked')) 
			{
				        for (var i = 0; i < tabIndivEvtsMajeur.length; i++) 
					{
					  if(tabIndivEvtsMajeur[i].I.P!==undefined)
					  {
                        if (CaracteresAccentues(tabIndivEvtsMajeur[i].I.P).toUpperCase().indexOf(CaracteresAccentues($('#prenom').val()).toUpperCase()) !== -1) 
						{
                            tab.push(tabIndivEvtsMajeur[i]);
                        }
                        }
                    }

                    if (tab.length > 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+" "+$individus+")");
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else
                    if (tab.length === 1) 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
						if(tabIndivEvtsMajeur.length===1)
						{
						 $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+  " "+$individu+")");
						}
						else
						{
                        $('#nombrerecherche2').val("(" + tab.length +"/"+tabIndivEvtsMajeur.length+  " "+$individus+")");
						}
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    } else 
					{
                        listeIndiv = affichagelisteIndividusEvtMAJ(tab);
                        $('#nombrerecherche2').val($aucunIndividu);
                        $('#liste').html("");
                        $('#liste').html(listeIndiv);
                    }
			}
		}
     

}


function calculDateFrise(tab)
{
var t=[];
for(var i=0;i<tab.length;i++)
 {
	
	  t.push( Math.floor((tab[i])/100)*100);
	  }
 
 return t;
}
/**
 **/
function TFiltreInterval( debut, fin )
{
	this.m_debut=debut;
	this.m_fin=fin;
	this.Filtre= function( valeur )
	{
		if($('#parperiode').is(':checked'))
		{
			return ((valeur.A >= this.m_debut)&&(valeur.A <=this.m_fin));
		}
		if($('#pargeneration').is(':checked'))
		{
		    if($('#tous').is(':checked'))
		    {
			return ((parseInt(tabIndividus[valeur.i1[0]].I.G) >= this.m_debut)&&(parseInt(tabIndividus[valeur.i1[0]].I.G) <=this.m_fin));
			}
		    if($('#evenement_majeurs').is(':checked'))
		    {
			return ((parseInt(tabIndividus[valeur.i1[0]].I.G) >= this.m_debut)&&(parseInt(tabIndividus[valeur.i1[0]].I.G) <=this.m_fin));
			}
		}
		return true ;
	}
}
function CaracteresAccentues(s)
{
	var accents = "ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÈÉÊËèéêëÙÚÛÜùúûüũÌÍÎÏíìîïÑñýỳŷÿỹÒÓÔÕÖóòôöõÇç"; 
		for(var i=s.length -1 ; i>=0; i--) 
		{
			var index = accents.indexOf(s.charAt(i));
			if (index>0) 
			{
				if('ÀÁÂÃÄÅàáâãäå'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[ÀÁÂÃÄÅàáâãäå]/gi,'A');
				}
				if('ÈÉÊËèéêë'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[ÈÉÊËèéêë]/gi,'E');
				}
			     if('ÙÚÛÜùúûüũ'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[ÙÚÛÜùúûüũ]/gi,'U');
				}
			    if('ÌÍÎÏíìîï'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[ÌÍÎÏíìîï]/gi,'I');
				}		
				if('Ññ'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[Ññ]/gi,'N');
				}
				if('ýỳŷÿỹ'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[ýỳŷÿỹ]/gi,'Y');
				}
				if('ÒÓÔÕÖóòôöõ'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[ÒÓÔÕÖóòôöõ]/gi,'O');
				}
				if('Çç'.indexOf(s.charAt(i)) !==-1)
				{
				s=s.replace(/[Çç]/gi,'C');
				}
			}
		}
		 return s;
}
function messagealerte(message)
{
	 $('#popup_name').fadeIn().css({'width': Number(600)}).html(message).prepend('<a href="#" class="close"><img src="images/close_pop.png" class="btn_close" title="Fermer" alt="Fermer" /></a>');
			var popMargTop = ($('#popup_name').height() + 80) / 2;
			var popMargLeft = ($('#popup_name').width() + 80) / 2;
			//On affecte le margin
			$('#popup_name').css(
			{
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
			});
			$('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
			//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
			$('#fade').css({'filter' : 'alpha(opacity=10)'}).fadeIn();
			$('a.close, #fade').on('click', function() 
			{ //Au clic sur le bouton ou sur le calque...
				$('#fade , .popup_block').fadeOut(function() 
				{
				$('#fade, .close').remove();  //...ils disparaissent ensemble
				encodeURI(document.location.href='index.html?Hcommand_FiltreIndividu='+defautOpenMode);
				});
			});
}
	