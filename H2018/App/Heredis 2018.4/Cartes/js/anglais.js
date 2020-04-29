/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('div#chargement').html('loading.... ');
$('.trigger:eq(0)').html('Filter persons');
$('.trigger:eq(1)').html('Filter events');
$('.trigger:eq(2)').html('Display modes');
$('.trigger:eq(3)').html('display options');
$('.trigger:eq(4)').html('print');
$('div#Filtrerlesindividus').html('Filter persons ');
$('label[for=touslesindividus]').html('All persons ');
$('label[for=ascendant]').html(' ascestors ');
$('label[for=descendant]').html(' descendents ');
$('label[for=individusmarque]').html('Marked persons ');
$('div#Filtrerlesevenements').html('Filter events ');
$('label[for=tous]').html('All events');
$('label[for=evenement_majeurs]').html('Major events ');
$('div#Modesdereprésentation').html('Display modes ');
$('label[for=densite]').html('Density ');
$('label[for=parperiode]').html('By period ');
$("label[for=pargeneration]").html('By generation');
$('a#boutonindividus').html('Persons ');
$('a#boutonlieu').html('Place ');
$('option[value=A]').html('All Places');
$('option[value=B]').html('Places most shown');
$('option[value=C]').html('Places not geolocated');
$('option[value=D]').html('Visible places');
$("#nom").attr("placeholder", "Surname");
$("#prenom").attr("placeholder", "Given name");
$("#lieu").attr("placeholder", "Place");
$('#carte').attr('value','Map');
$('#Liste_eclaire').attr('value','Tiny Tafel');
$('label[for=POI]').html('Points Of Interest ');
$('label[for=Legende]').html('Legend ');
$('label[for=nombrerecherche]').html('search');
$("div#boutonplaypause #start .mesimages").attr("title", "Play");
$("div#boutonplaypause2 #start2 .mesimages").attr("title", "Play");
$("div#boutonplaypause #stop .mesimages").attr("title", "Stop");
$("div#boutonplaypause2 #stop2 .mesimages").attr("title", "Stop");
$(document).attr("title", "Geographical distribution");
//textTraduit='clik to see  even for ';